import React, { useEffect, useState } from 'react';
import makeApiRequest from '../api/makeApiRequest';

const NotificationTest = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            makeApiRequest('https://heroku-deneme-backend-5f73e229a56a.herokuapp.com/notification', 'GET')
                .then(response => {
                    console.log('API isteği tamamlandı:', response.data);
                    setNotifications(response.data);
                })
                .catch(error => {
                    console.error('Favoriler alınırken bir hata oluştu:', error);
                });
        };

        const interval = setInterval(fetchNotifications, 5000); // Her 5 saniyede bir bildirimleri kontrol et

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div>
            <h1>Bildirimler</h1>
            <ul>
                {notifications.map((notification) => (
                    <li>{notification.destinationName} {notification.comment}</li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationTest;
