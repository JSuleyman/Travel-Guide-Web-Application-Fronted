import React, { useState } from 'react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';


const RegisterComponent2 = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        // Send the data to the backend
        fetch('https://travel-guide-main-de97df9e068d.herokuapp.com/api/v1/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstname: name,
                lastname: surname,
                email: email,
                password: password,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                localStorage.setItem('token', data.token);
                toastr.success('Register successful!');
                setTimeout(function () {
                    // window.location.href = 'login.html';
                }, 300);
            })
            .catch((error) => {
                if (error.message === 'This email is already') {
                    toastr.error('This email is already!');
                } else {
                    toastr.error('Bir hata oluştu: ' + error.message);
                }
            });
    };

    return (
        <div className="container">
            <div className="col-md-4">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Register Form</h3>
                    </div>
                    <div className="panel-body">
                        <form role="form" onSubmit={handleSubmit} className="d-flex flex-column">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    placeholder="Enter name"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="surname">Surname</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="surname"
                                    name="surname"
                                    placeholder="Enter surname"
                                    value={surname}
                                    onChange={(event) => setSurname(event.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-success">Register</button>
                        </form>
                    </div>
                    <div className="panel-footer">
                        <p>Do you have an account? <a href="login.html">Login here</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterComponent2;
