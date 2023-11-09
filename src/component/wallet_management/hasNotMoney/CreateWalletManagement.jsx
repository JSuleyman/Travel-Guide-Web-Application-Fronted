import React, { useState } from 'react';
import './Modul.css';
import makeApiRequest from '../../../api/makeApiRequest';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

function CreateWalletManagement({ onSubmission }) {
    const [totalMoney, setTotalMoney] = useState("");
    const navigate = useNavigate();

    const handleTotalMoneyChange = (event) => {
        setTotalMoney(event.target.value);
    };

    const sendTotalMoney = () => {
        if (totalMoney.length === 0) {
            toast.info("Toplam məbləğ daxil edilməyib!");
            return;
        }

        makeApiRequest('https://travel-guide-main-de97df9e068d.herokuapp.com/wallet_management/total_money', 'POST', { totalMoney })
            .then(response => {
                setTotalMoney('');
                navigate("/wallet_management");
                // Submit işlemi tamamlandığında onSubmission işlevini çağırın
                onSubmission();
            })
            .catch(error => {
                console.log(error.response.data.errorMessage)
                setTotalMoney('');
            });
    };

    return (
        <div className="wallet-management">
            <h2>Pul Kisənizi İdarə Edin</h2>
            <div className="input-container">
                <label htmlFor="totalMoney">Toplam Məbləğ:</label>
                <input
                    type="number"
                    id="totalMoney"
                    name="totalMoney"
                    value={totalMoney}
                    onChange={handleTotalMoneyChange}
                />
            </div>
            <div className="button-container">
                <button type='submit' onClick={sendTotalMoney}>Göndər</button>
            </div>

            <div>
                <ToastContainer />
            </div>
        </div>
    );
}

export default CreateWalletManagement;
