import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Typography , Link, Box, Divider } from "@mui/material";
import styled from "@emotion/styled";
import LoginForm from "../component/login_register/LoginForm";
import SocialAuth from "../component/login_register/SocialAuth";
import Logo from "../component/login_register/Logo";
import { motion } from "framer-motion";

//////////////////////////////////
const RootStyle = styled("div")({
    background: "rgb(249, 250, 251)",
    height: "100vh",
    display: "grid",
    placeItems: "center",
});

const HeadingStyle = styled(Box)({
    textAlign: "center",
});

const fontSize = styled(Typography )({
    fontSize: "20px",
});

const ContentStyle = styled("div")({
    maxWidth: 480,
    padding: 25,
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    background: "#fff",
});

let easing = [0.6, -0.05, 0.01, 0.99];
const fadeInUp = {
    initial: {
        y: 60,
        opacity: 0,
        transition: { duration: 0.6, ease: easing },
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: easing,
        },
    },
};

const Login = ({ onLogin }) => {
    return (
        <RootStyle>
            <Container maxWidth="sm">
                <ContentStyle>
                    <HeadingStyle component={motion.div} {...fadeInUp}>
                        <Logo />
                        <fontSize  sx={{ color: "text.secondary", mb: 5,fontSize:"20px" }}>
                            Login to your account
                        </fontSize >
                    </HeadingStyle>

                    <Box component={motion.div} {...fadeInUp}>
                        <SocialAuth />
                    </Box>

                    <Divider sx={{ my: 3 }} component={motion.div} {...fadeInUp}>
                        <fontSize  variant="body2" sx={{ color: "text.secondary" }}>
                            OR
                        </fontSize >
                    </Divider>

                    <LoginForm onLogin={onLogin} />

                    <fontSize 
                        component={motion.p}
                        {...fadeInUp}
                        variant="body2"
                        align="center"
                        sx={{ mt: 10.5 }}
                    >
                        Don’t have an account?{" "}
                        <Link variant="subtitle2" component={RouterLink} to="/signup">
                            Register
                        </Link>
                    </fontSize >
                </ContentStyle>
            </Container>
        </RootStyle>
    );
};

export default Login;

// import React, { useState } from 'react';
// import toastr from 'toastr';
// import 'toastr/build/toastr.min.css';
// import $ from 'jquery';
// import '../styles/LoginComponent.css';
// import { Link } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";

// const LoginComponent = ({ onLogin }) => {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const handleSubmit = (event) => {
//         event.preventDefault();

//         // Send the data to the backend
        // $.ajax({
        //     type: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     url: 'https://heroku-deneme-backend-5f73e229a56a.herokuapp.com/api/v1/auth/authenticate',
        //     data: JSON.stringify({
        //         email: email,
        //         password: password
        //     }),
        //     processData: false,
        //     contentType: false,
        //     success: function (response) {
        //         localStorage.setItem('token', response.token);
        //         toastr.success('Login successful!');
        //         onLogin(response.firstName, response.lastName);
        //         navigate("/search");
        //     },
        //     error: function (error) {
        //         if (error.responseJSON && error.responseJSON.message === 'Wrong password') {
        //             toastr.error('Wrong password!');
        //         } else if (error.responseJSON && error.responseJSON.message === 'No such e-mail address was found') {
        //             toastr.error('No such e-mail address was found');
        //         } else {
        //             toastr.error('Bir hata oluştu: ' + error.message);
        //         }
        //     },
        // });
//     };

//     return (
//         <div className="login-container">
//             <div className="col-md-4">
//                 <div className="panel panel-default">
//                     <div className="panel-heading">
//                         {/* <Link to="/search"> */}
//                         <h3 className="panel-title">Login Form</h3>
//                         {/* </Link> */}
//                     </div>
//                     <div className="panel-body">
//                         <form role="form" onSubmit={handleSubmit} className="d-flex flex-column">
//                             <div className="form-group">
//                                 <label htmlFor="email">Email address</label>
//                                 <input
//                                     type="email"
//                                     className="form-control"
//                                     id="email"
//                                     name="email"
//                                     placeholder="Enter email"
//                                     value={email}
//                                     onChange={(event) => setEmail(event.target.value)}
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor="password">Password</label>
//                                 <input
//                                     type="password"
//                                     className="form-control"
//                                     id="password"
//                                     name="password"
//                                     placeholder="Password"
//                                     value={password}
//                                     onChange={(event) => setPassword(event.target.value)}
//                                 />
//                             </div>
//                             <button type="submit" className="btn btn-success">
//                                 Login
//                             </button>
//                         </form>
//                     </div>
//                     <div className="panel-footer">
//                         <p>
//                             Don't have an account? <a href="index.html">Register here</a>
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LoginComponent;
