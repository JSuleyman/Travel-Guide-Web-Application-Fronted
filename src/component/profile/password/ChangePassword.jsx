import React, { useState } from 'react';
import './ChangePassword.css';
import { ToastContainer, toast } from 'react-toastify';
import makeApiRequest from '../../../api/makeApiRequest';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== repeatPassword) {
            toast.info("Yeni şifrə və təkrar şifrə uyğun gəlmir!")
            return;
        }
        makeApiRequest(
            "https://travel-guide-backend-7e73c60545d8.herokuapp.com/api/v1/auth/change_password",
            'PUT',
            {
                oldPassword,
                newPassword,
                repeatPassword
            }
        )
            .then(response => {
                toast.success(response.data)
                setOldPassword('');
                setNewPassword('');
                setRepeatPassword('');
            })
            .catch((error) => {
                if (error.response.data.errorMessage) {
                    toast.error(error.response.data.errorMessage);
                }
                console.error('Parola değiştirme hatası:', error);
            });
    };

    return (
        <div className="user_profile_password-container">
            <h2>Şifrəni Dəyişdir</h2>
            <form className="user_profile_password-form" onSubmit={handleSubmit}>
                <div className="user_profile_password-form-group">
                    <label>Köhnə Şifrə:</label>
                    <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                </div>
                <div className="user_profile_password-form-group">
                    <label>Yeni Şifrə:</label>
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <div className="user_profile_password-form-group">
                    <label>Yeni Şifrəni Təkrar Daxil Edin:</label>
                    <input type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
                </div>
                <button type="submit" className="user_profile_password-submit-button">Şifrəni Dəyişdir</button>
            </form>

            <div>
                <ToastContainer />
            </div>
        </div>
    );
};

export default ChangePassword;