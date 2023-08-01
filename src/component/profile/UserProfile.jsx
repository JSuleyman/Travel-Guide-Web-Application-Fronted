import React, { useState } from 'react';
import './UserProfile.css';
import { useNavigate } from "react-router-dom";


const UserProfile = () => {
    const navigate = useNavigate();

    const handleName = () => {
        navigate("/change_full_name")
    };

    const handlePassword = () => {
        navigate("/change_password")
    };

    return (
        <div className="profile-container">
            <header className="profile-header">
                <h1>Profil</h1>
            </header>
            <div className="profile-change-buttons">
                <button
                    className="profile-change-button"
                    onClick={() => handleName()}
                >
                    Adı və Soyadı dəyiş
                </button>
                <button
                    className="profile-change-button"
                    onClick={() => handlePassword()}
                >
                    Parolu dəyiş
                </button>
            </div>

        </div>
    );
};

export default UserProfile;
