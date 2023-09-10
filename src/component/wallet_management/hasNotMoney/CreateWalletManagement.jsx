import React, { useState } from 'react';
import './Modul.css';
import makeApiRequest from '../../../api/makeApiRequest';
import { useNavigate } from "react-router-dom";

function CreateWalletManagement({ onSubmission }) {
    const [totalMoney, setTotalMoney] = useState("");
    const navigate = useNavigate();

    const handleTotalMoneyChange = (event) => {
        setTotalMoney(event.target.value);
    };

    const sendTotalMoney = () => {
        makeApiRequest('https://travel-guide-backend-7e73c60545d8.herokuapp.com/wallet_management/total_money', 'POST', { totalMoney })
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
            <h2>Pulunuzu İdare Edin</h2>
            <div className="input-container">
                <label htmlFor="totalMoney">Total Money:</label>
                <input
                    type="number"
                    id="totalMoney"
                    name="totalMoney"
                    value={totalMoney}
                    onChange={handleTotalMoneyChange}
                />
            </div>
            <div className="button-container">
                <button type='submit' onClick={sendTotalMoney}>Submit</button>
            </div>
        </div>
    );
}

export default CreateWalletManagement;
