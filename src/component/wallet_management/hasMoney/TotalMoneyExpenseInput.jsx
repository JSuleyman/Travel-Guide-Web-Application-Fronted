import React, { useState } from 'react';
import makeApiRequest from '../../../api/makeApiRequest';
import './TotalMoneyExpenseInput.css';
import { ToastContainer, toast } from 'react-toastify';

function TotalMoneyExpenseInput({ initialTotalMoney, onMoneyLeftChange }) {
    const [totalMoney, setTotalMoney] = useState(initialTotalMoney);
    const [newTotalMoney, setNewTotalMoney] = useState(totalMoney);
    const [isEditing, setIsEditing] = useState(false);

    const handleInputChange = (event) => {
        setNewTotalMoney(event.target.value);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setNewTotalMoney(totalMoney);
        setIsEditing(false);
    };

    const handleSaveClick = () => {
        const confirmation = window.confirm(`Should the total money be determined as: ${newTotalMoney} ₼?`);
        if (confirmation) {
            makeApiRequest('https://travel-guide-backend-7e73c60545d8.herokuapp.com/wallet_management/change_total_money', 'PUT', { totalMoney: newTotalMoney })
                .then(response => {
                    onMoneyLeftChange(response.data.moneyLeft, response.data.totalMoney);
                    setIsEditing(false);
                    setTotalMoney(newTotalMoney);
                })
                .catch(error => {
                    toast.error(error.response.data.errorMessage);
                    //errorda toaster ile cixart ve degerleride oldugu kimi sagxla
                });
        }
    };



    return (
        <div className="total-money-expense-input">
            <p>
                <strong>Toplam məbləğ:</strong>{" "}
                {isEditing ? (
                    <input
                        type="number"
                        value={newTotalMoney}
                        onChange={handleInputChange}
                        className="money-input"
                    />
                ) : (
                    <span className="money-amount">{totalMoney} ₼</span>
                )}
            </p>
            {isEditing ? (
                <div>
                    <button className="save-button" onClick={handleSaveClick}>Kaydet</button>
                    <button className="cancel-button" onClick={handleCancelClick}>İptal</button>
                </div>
            ) : (
                <button className="edit-button" onClick={handleEditClick}>Düzenle</button>
            )}
            <div>
                <ToastContainer />
            </div>
        </div>
    );



    // return (
    //     <div>
    //         <p>
    //             Toplam məbləğ:{" "}
    //             {isEditing ? (
    //                 <input
    //                     type="number"
    //                     value={newTotalMoney}
    //                     onChange={handleInputChange}
    //                 />
    //             ) : (
    //                 <span>{totalMoney} ₼</span>
    //             )}
    //         </p>
    //         {isEditing ? (
    //             <div>
    //                 <button onClick={handleSaveClick}>Kaydet</button>
    //                 <button onClick={handleCancelClick}>İptal</button>
    //             </div>
    //         ) : (
    //             <button onClick={handleEditClick}>Düzenle</button>
    //         )}
    //     </div>
    // );
}

export default TotalMoneyExpenseInput;
