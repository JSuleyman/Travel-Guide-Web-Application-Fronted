import React, { useEffect, useState } from 'react';
import './Modul.css';
import makeApiRequest from '../../../api/makeApiRequest';
import { formatDateTime } from '../../../utils/formatDateTime';
import ExpenseSummary from './ExpenseSummary';
import TotalMoneyExpenseInput from './TotalMoneyExpenseInput';
import { ToastContainer, toast } from 'react-toastify';
import ImageGallery from '../../../img/ImageGallery';
import axios from 'axios';
import { addSeperateNumber } from '../../../utils/addSeperateNumber';
// import DateRangeFilter from './DateRangeFilter';


function WelcomeWalletManagement({ data }) {
    const [expenseDescription, setExpenseDescription] = useState(""); // Gider açıklamasını tutmak için bir state
    const [expenseAmount, setExpenseAmount] = useState(""); // Gider miktarını tutmak için bir state
    const [expenses, setExpenses] = useState([]); // Eklenen giderleri tutmak için bir nesne dizisi
    const [costList, setCostList] = useState([]);
    const [moneyLeft, setMoneyLeft] = useState(data.moneyLeft);
    const [totalMoney, settotalMoney] = useState(data.totalMoney);
    const [shouldResetImages, setShouldResetImages] = useState(false);
    const [selectedImage, setSelectedImage] = useState([]);
    // const [filteredDates, setFilteredDates] = useState({ startDate: null, endDate: null });

    // const [currencies, setCurrencies] = useState([]);
    // const [selectedCurrency, setSelectedCurrency] = useState("");



    const handleExpenseDescriptionChange = (event) => {
        setExpenseDescription(event.target.value);
    };

    const handleExpenseAmountChange = (event) => {
        setExpenseAmount(event.target.value);
    };

    const addExpense = () => {
        if (expenseDescription.trim() === "" || expenseAmount.trim() === "") {
            return; // Boş gider eklemesini engelle
        }

        // Yeni gider nesnesini oluşturun ve mevcut giderler dizisini güncelleyin
        const newExpense = {
            costDescription: expenseDescription,
            cost: parseFloat(expenseAmount),
            // currencyId: selectedCurrency  // Gider miktarını sayıya dönüştürün
        };

        setExpenses([...expenses, newExpense]);

        console.log("asdad" + newExpense)
        makeApiRequest("https://travel-guide-main-de97df9e068d.herokuapp.com/wallet_management/cost", "POST", newExpense)
            .then(response => {
                setExpenseDescription("");
                setExpenseAmount("");
                setMoneyLeft(response.data.moneyLeft)
                makeApiRequest('https://travel-guide-main-de97df9e068d.herokuapp.com/wallet_management/cost_list', 'GET')
                    .then(response => {
                        setCostList(response.data);
                    })
                    .catch(error => {

                    });

                // asdasdknjaklsd

                console.log(response);
                const expenseId = response.data.expenseId;

                const formData = new FormData();
                console.log("bilmirem: " + selectedImage);
                selectedImage.forEach((image) => {
                    formData.append("image", image);
                });

                const token = localStorage.getItem('token');

                axios.post(`https://travel-guide-main-de97df9e068d.herokuapp.com/sales_receipt/${expenseId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .catch(error => {
                        // makeApiRequest(`https://travel-guide-main-de97df9e068d.herokuapp.com/travel_destination/delete/${expenseId}`, 'DELETE')
                    });
                setSelectedImage([]);
                setShouldResetImages(true);
            })
            .catch(error => {
                toast.error(error.response.data.errorMessage);
            })

        // Gider açıklaması ve miktarını sıfırlayın
        // setSelectedCurrency("");
    };

    useEffect(() => {
        makeApiRequest('https://travel-guide-main-de97df9e068d.herokuapp.com/wallet_management/cost_list', 'GET')
            .then(response => {
                setCostList(response.data);
                console.log(response);
            })
            .catch(error => {
            });
    }, []);

    const handleDeleteExpense = (id) => {
        // İlgili gideri listeden kaldırın

        makeApiRequest(`https://travel-guide-main-de97df9e068d.herokuapp.com/wallet_management/delete_cost?id=${id}`, "POST")
            .then(response => {
                setMoneyLeft(response.data.moneyLeft);
                makeApiRequest('https://travel-guide-main-de97df9e068d.herokuapp.com/wallet_management/cost_list', 'GET')
                    .then(response => {
                        setCostList(response.data);
                    })
                    .catch(error => {
                        // Hata durumunu ele alabilirsiniz
                    });
            })
            .catch(error => {

            })

        console.log("id: " + id)
    };

    const resetUserWalletWithConfirmation = () => {
        const confirmation = window.confirm("Cüzdanı sıfırlamak istediğinizden emin misiniz?");
        if (confirmation) {
            makeApiRequest("https://travel-guide-main-de97df9e068d.herokuapp.com/wallet_management/reset_wallet", "DELETE")
                .then(response => {
                    window.location.reload();
                })
                .catch(error => {
                    // Hata durumunu ele alabilirsiniz
                });
        }
    }

    // useEffect(() => {
    //     // Valyuta bilgilerini getiren API isteği
    //     makeApiRequest('https://travel-guide-main-de97df9e068d.herokuapp.com/wallet_management/currencies', 'GET')
    //         .then(response => {
    //             // API'den gelen valyuta bilgilerini state'e kaydedin
    //             setCurrencies(response.data);
    //         })
    //         .catch(error => {
    //             // Hata durumunu ele alabilirsiniz
    //         });
    // }, []);

    const handleMoneyLeftChange = (newMoneyLeft, totalMoney) => {
        // moneyLeft değerini güncelle
        setMoneyLeft(newMoneyLeft);
        settotalMoney(totalMoney)
        // API çağrısı yapabilirsiniz (isteğe bağlı)
    };

    // const handleDateFilter = (startDate, endDate) => {
    //     // Filtreleme işlemlerini burada gerçekleştirin.
    //     // Örnek olarak, startDate ve endDate'i kullanarak verileri filtreleyebilirsiniz.
    //     setFilteredDates({ startDate, endDate });

    //     makeApiRequest("https://travel-guide-main-de97df9e068d.herokuapp.com/wallet_management/date_filter", "GET", { filteredDates })
    //         .then(response => {
    //             setCostList(response.data);
    //             console.log("Date Filter: " + response.data);
    //         })
    // };

    const handleImageSelect = (image) => {
        setSelectedImage([...selectedImage, image]);
    };

    const handleImageDelete = (deletedImage) => {
        const updatedSelectedImages = selectedImage.filter(image => image !== deletedImage);
        setSelectedImage(updatedSelectedImages);
    };

    const handleViewImage = (expenseId) => {
        // Yeni bir pencere aç
        const popupWindow = window.open('', 'ImagePopup', 'width=600,height=400');

        // Pencerenin içeriğini oluştur
        const popupContent = `
            <html>
                <head>
                    <title>Resim</title>
                </head>
                <body style="text-align:center;">
                    <img 
                    src="https://travel-guide-main-de97df9e068d.herokuapp.com/sales_receipt/${expenseId}" 
                    alt="Resim" style="max-width:100%; max-height:100%;" />
                </body>
            </html>
        `;

        // Pencerenin içeriğini ayarla
        popupWindow.document.open();
        popupWindow.document.write(popupContent);
        popupWindow.document.close();

        // Pencereyi odakla (isteğe bağlı)
        popupWindow.focus();
    }



    return (
        <div className="wallet-management-welcome">
            <div className="money-info">
                <TotalMoneyExpenseInput initialTotalMoney={totalMoney} onMoneyLeftChange={handleMoneyLeftChange} />
                <p>Xərclənən məbləğ: {addSeperateNumber(totalMoney - moneyLeft)} ₼</p>
                <p>Qalan məbləğ: {addSeperateNumber(moneyLeft)} ₼</p>
                <button className="reset_button" onClick={resetUserWalletWithConfirmation}>Sıfırla</button>
            </div>
            <div className="expense-form">
                <input
                    type="text"
                    placeholder="Xərc açıqlaması"
                    value={expenseDescription}
                    onChange={handleExpenseDescriptionChange}
                />
                <input
                    type="number"
                    placeholder="Xərc açıqlaması"
                    value={expenseAmount}
                    onChange={handleExpenseAmountChange}
                />

                <ImageGallery
                    onImageSelect={handleImageSelect}
                    onDeleteImage={handleImageDelete}
                    shouldResetImages={shouldResetImages}
                />
                {/* <select
                    name="currency"
                    id="currency"
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                >
                    <option value="">Valyuta seçin</option>
                    {currencies.map((currency) => (
                        <option key={currency.id} value={currency.id}>
                            {currency.currency}
                        </option>
                    ))}
                </select> */}
                {/* <br /> */}
                <button className='welcome-wallet-button' onClick={addExpense}>Əlavə et</button>
            </div>

            <br />

            {/* <DateRangeFilter onDateFilter={handleDateFilter} /> */}

            <h3>Xərclər siyahısı</h3>
            <ul className="expense-list">
                {costList.map((expense, index) => (
                    <li className="expense-item" key={index}>
                        <span className="expense-description">
                            {expense.costDescription}: {expense.cost} {expense.currency} ₼ ({formatDateTime(expense.localDateTime)})
                        </span>
                        {expense.haveImage ?
                            <button className="view-image-button" onClick={() => handleViewImage(expense.id)}>Şəkilə bax</button>
                            : ''
                        }
                        <button className="delete-button" onClick={() => handleDeleteExpense(expense.id)}>Sil</button>
                    </li>
                ))}
                {console.log("Dataaaa :" + costList)}
                <ExpenseSummary data={costList} />
            </ul>
            <div>
                <ToastContainer />
            </div>
        </div>
    );
}

export default WelcomeWalletManagement;

