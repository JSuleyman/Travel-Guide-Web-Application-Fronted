import React, { useEffect, useState } from 'react';
import './Modul.css';
import makeApiRequest from '../../../api/makeApiRequest';
import { formatDateTime } from '../../../utils/formatDateTime';
import ExpenseSummary from './ExpenseSummary';
import TotalMoneyExpenseInput from './TotalMoneyExpenseInput';


function WelcomeWalletManagement({ data }) {
    const [expenseDescription, setExpenseDescription] = useState(""); // Gider açıklamasını tutmak için bir state
    const [expenseAmount, setExpenseAmount] = useState(""); // Gider miktarını tutmak için bir state
    const [expenses, setExpenses] = useState([]); // Eklenen giderleri tutmak için bir nesne dizisi
    const [costList, setCostList] = useState([]);
    const [moneyLeft, setMoneyLeft] = useState(data.moneyLeft);
    const [totalMoney, settotalMoney] = useState(data.totalMoney);

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
        makeApiRequest("https://travel-guide-backend-7e73c60545d8.herokuapp.com/wallet_management/cost", "POST", newExpense)
            .then(response => {
                setMoneyLeft(response.data.moneyLeft)
                makeApiRequest('https://travel-guide-backend-7e73c60545d8.herokuapp.com/wallet_management/cost_list', 'GET')
                    .then(response => {
                        setCostList(response.data);
                    })
                    .catch(error => {
                        // Hata durumunu ele alabilirsiniz
                    });
            })
            .catch(error => {

            })

        // Gider açıklaması ve miktarını sıfırlayın
        setExpenseDescription("");
        setExpenseAmount("");
        // setSelectedCurrency("");
    };

    useEffect(() => {
        makeApiRequest('https://travel-guide-backend-7e73c60545d8.herokuapp.com/wallet_management/cost_list', 'GET')
            .then(response => {
                setCostList(response.data);
                console.log(response);
            })
            .catch(error => {
            });
    }, []);

    const handleDeleteExpense = (id) => {
        // İlgili gideri listeden kaldırın

        makeApiRequest(`https://travel-guide-backend-7e73c60545d8.herokuapp.com/wallet_management/delete_cost?id=${id}`, "POST")
            .then(response => {
                setMoneyLeft(response.data.moneyLeft);
                makeApiRequest('https://travel-guide-backend-7e73c60545d8.herokuapp.com/wallet_management/cost_list', 'GET')
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
            makeApiRequest("https://travel-guide-backend-7e73c60545d8.herokuapp.com/wallet_management/reset_wallet", "DELETE")
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
    //     makeApiRequest('https://travel-guide-backend-7e73c60545d8.herokuapp.com/wallet_management/currencies', 'GET')
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

    return (
        <div className="wallet-management-welcome">
            <div className="money-info">
                <TotalMoneyExpenseInput initialTotalMoney={totalMoney} onMoneyLeftChange={handleMoneyLeftChange} />
                <p>Xərclənən məbləğ: {(totalMoney - moneyLeft).toFixed(2)} ₼</p>
                <p>Qalan məbləğ: {moneyLeft} ₼</p>
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

            <h3>Xərclər siyahısı</h3>
            <ul className="expense-list">
                {costList.map((expense, index) => (
                    <li className="expense-item" key={index}>
                        <span className="expense-description">
                            {expense.costDescription}: {expense.cost} {expense.currency} ₼ ({formatDateTime(expense.localDateTime)})
                        </span>
                        <button className="delete-button" onClick={() => handleDeleteExpense(expense.id)}>Sil</button>
                    </li>
                ))}
                {console.log("Dataaaa :" + costList)}
                <ExpenseSummary data={costList} />
            </ul>
        </div>
    );
}

export default WelcomeWalletManagement;

