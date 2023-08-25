import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // Eğer React Router kullanıyorsanız

function ForgetPasswordPage() {
    // const { token } = useParams();

    const urlSearchParams = new URLSearchParams(window.location.search);
    const token = urlSearchParams.get('token');

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [resetSuccess, setResetSuccess] = useState(false);


    console.log(token + "ytokeeee");

    const handleResetPassword = async () => {
        if (newPassword === confirmPassword) {
            try {
                const response = await fetch('/api/reset-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token, newPassword }),
                });

                if (response.ok) {
                    setResetSuccess(true);
                } else {
                    // Hata durumunu ele al
                }
            } catch (error) {
                // Hata durumunu ele al
            }
        } else {
            // Şifreler eşleşmiyorsa bir hata mesajı göster
        }
    };

    return (
        <div>
            {resetSuccess ? (
                <div>
                    <p>Şifre sıfırlama işlemi başarılı. Yeni şifrenizle giriş yapabilirsiniz.</p>
                </div>
            ) : (
                <div>
                    <h2>Şifre Sıfırlama</h2>
                    <input
                        type="password"
                        placeholder="Yeni Şifre"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Şifreyi Onayla"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button onClick={handleResetPassword}>Şifreyi Sıfırla</button>
                </div>
            )}
        </div>
    );
}

export default ForgetPasswordPage;
