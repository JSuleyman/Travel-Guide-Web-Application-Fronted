import React, { useState } from 'react';
import makeApiRequest from '../../api/makeApiRequest';
import './UserProfile.css'; // CSS dosyasını ekleyin veya inline olarak stil kodlarını ekleyebilirsiniz
import { ToastContainer, toast } from 'react-toastify';

const UserProfile = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== repeatPassword) {
            toast.info("Parollar eyni deyil")
            return;
        }
        makeApiRequest(
            "https://heroku-deneme-backend-5f73e229a56a.herokuapp.com/api/v1/auth/change_password",
            'PUT',
            {
                oldPassword,
                newPassword,
                repeatPassword
            }
        )
            .then(response => {
                console.log("test" + response.data);
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
        <div className="user_profile-container">
            <h2>Parola Değiştirme</h2>
            <form className="user_profile-form" onSubmit={handleSubmit}>
                <div className="user_profile-form-group">
                    <label>Eski Parola:</label>
                    <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                </div>
                <div className="user_profile-form-group">
                    <label>Yeni Parola:</label>
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <div className="user_profile-form-group">
                    <label>Yeni Parolayı Tekrar Girin:</label>
                    <input type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
                </div>
                <button type="submit" className="user_profile-submit-button">Parolayı Değiştir</button>
            </form>

            <div>
                <ToastContainer />
            </div>
        </div>
    );
};

export default UserProfile;
