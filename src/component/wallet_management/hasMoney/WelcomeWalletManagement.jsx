import React, { useEffect, useState } from 'react';
import './Modul.css';
import makeApiRequest from '../../../api/makeApiRequest';


function WelcomeWalletManagement({ data }) {
    const [expenseDescription, setExpenseDescription] = useState(""); // Gider açıklamasını tutmak için bir state
    const [expenseAmount, setExpenseAmount] = useState(""); // Gider miktarını tutmak için bir state
    const [expenses, setExpenses] = useState([]); // Eklenen giderleri tutmak için bir nesne dizisi
    const [costList, setCostList] = useState([]);
    const [moneyLeft, setMoneyLeft] = useState(data.moneyLeft);
    const [totalMoney, settotalMoney] = useState(data.totalMoney);

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
            cost: parseFloat(expenseAmount), // Gider miktarını sayıya dönüştürün
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

    return (
        <div className="wallet-management-welcome">
            <h2>Xos geldin</h2>
            <div>
                <p>Total money: {totalMoney}</p>
                <p>Left money: {moneyLeft}</p>
            </div>
            <div>
                <h3>Giderler</h3>
                <ul>
                    {costList.map((expense, index) => (
                        <li key={index}>
                            {expense.costDescription}: {expense.cost} AZN
                        </li>
                    ))}
                </ul>
                <input
                    type="text"
                    placeholder="Gider açıklaması"
                    value={expenseDescription}
                    onChange={handleExpenseDescriptionChange}
                />
                <input
                    type="number"
                    placeholder="Gider miktarı"
                    value={expenseAmount}
                    onChange={handleExpenseAmountChange}
                />
                <button onClick={addExpense}>Ekle</button>
            </div>
        </div>
    );
}

export default WelcomeWalletManagement;

