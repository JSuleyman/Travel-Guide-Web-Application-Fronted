import React, { useState } from 'react';
import './ChangeFullName.css';
import { ToastContainer, toast } from 'react-toastify';
import makeApiRequest from '../../../api/makeApiRequest';

const ChangeFullName = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        makeApiRequest(
            "https://travel-guide-main-de97df9e068d.herokuapp.com/user_profile/full_name",
            'PUT',
            {
                firstName,
                lastName
            }
        )
            .then(response => {
                toast.success(response.data)
                setFirstName('');
                setLastName('');
                localStorage.setItem('firstName', response.data.firstName);
                localStorage.setItem('lastName', response.data.lastName);
                window.location.reload();
            })
            .catch((error) => {
                if (error.response.data.errorMessage) {
                    toast.error(error.response.data.errorMessage);
                }
                console.error('Parola değiştirme hatası:', error);
            });
    };

    return (
        <div className="user_profile_fullname-container">
            <h2>Adı və Soyadı Dəyişdir</h2>
            <form className="user_profile_fullname-form" onSubmit={handleSubmit}>
                <div className="user_profile_fullname-form-group">
                    <label>Ad:</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="user_profile_fullname-form-group">
                    <label>Soyad:</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>

                <button type="submit" className="user_profile_fullname-submit-button">Dəyişdir</button>
            </form>

            <div>
                <ToastContainer />
            </div>
        </div>
    );
};

export default ChangeFullName;