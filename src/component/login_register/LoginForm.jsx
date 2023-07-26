import React, { useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import {
    Box,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';

let easing = [0.6, -0.05, 0.01, 0.99];
const animate = {
    opacity: 1,
    y: 0,
    transition: {
        duration: 0.6,
        ease: easing,
        delay: 0.16,
    },
};

const LoginForm = ({ onLogin }) => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    //  useEffect(()=>{},[formik])
    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email("Provide a valid email address")
            .required("Email is required"),
        password: Yup.string().required("Password is required"),
    });

    const onSubmit = (values) => {
        console.log("submitting...");
        axios
            .post("https://travel-guide-backend-7e73c60545d8.herokuapp.com/api/v1/auth/authenticate", {
                email: values.email,
                password: values.password,
            })
            .then((response) => {
                // İşlem başarılı olduğunda
                localStorage.setItem("token", response.data.token);
                localStorage.setItem('firstName', response.data.firstName);
                localStorage.setItem('lastName', response.data.lastName);
                onLogin(response.data.firstName, response.data.lastName);
                toast.success("Login successful!");
                navigate("/search");
            })
            .catch((error) => {
                // Hata durumunda
                if (error.response && error.response.data && error.response.data.message) {
                    const errorMessage = error.response.data.message;
                    console.log(errorMessage);
                    toast.error(errorMessage);
                } else {
                    console.log("An error occurred:", error.message);
                    toast.error("An error occurred");
                }
                formik.setSubmitting(false); // isSubmitting değerini false olarak ayarla
            });
    };

    const formik = useFormik({
        initialValues: {
            email: "" || null,
            password: "" || null,
            remember: true,
        },
        validationSchema: LoginSchema,
        onSubmit: onSubmit,
    });

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
        formik;

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Box
                    component={motion.div}
                    animate={{
                        transition: {
                            staggerChildren: 0.55,
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                        }}
                        component={motion.div}
                        initial={{ opacity: 0, y: 40 }}
                        animate={animate}
                    >
                        <TextField
                            sx={{ fontSize: "20px" }}
                            fullWidth
                            className="my-class"
                            autoComplete="username"
                            type="email"
                            label="Email Address"
                            {...getFieldProps("email")}
                            error={Boolean(touched.email && errors.email)}
                            helperText={touched.email && errors.email}
                        />

                        <TextField
                            fullWidth
                            className="my-class"
                            autoComplete="current-password"
                            type={showPassword ? "text" : "password"}
                            label="Password"
                            {...getFieldProps("password")}
                            error={Boolean(touched.password && errors.password)}
                            helperText={touched.password && errors.password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword((prev) => !prev)}
                                        >
                                            {showPassword ? (
                                                <Icon icon="eva:eye-fill" />
                                            ) : (
                                                <Icon icon="eva:eye-off-fill" />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

                    <Box
                        component={motion.div}
                        initial={{ opacity: 0, y: 20 }}
                        animate={animate}
                    >
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ my: 2 }}
                        >
                            {/* <FormControlLabel
                                control={
                                    <Checkbox
                                        {...getFieldProps("remember")}
                                        checked={values.remember}
                                    />
                                }
                                label="Remember me"
                            />

                            <Link
                                component={RouterLink}
                                variant="subtitle2"
                                to="#"
                                underline="hover"
                            >
                                Forgot password?
                            </Link> */}
                        </Stack>

                        <LoadingButton
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            loading={isSubmitting}
                        >
                            {isSubmitting ? "loading..." : "Login"}
                        </LoadingButton>
                    </Box>
                </Box>
            </Form>
            <div>
                <ToastContainer />
            </div>
        </FormikProvider>
    );
};

export default LoginForm;
// import React, { useState } from "react";
// import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
// import { Form, FormikProvider, useFormik } from "formik";
// import * as Yup from "yup";
// import axios from "axios";

// import {
//     Box,
//     Checkbox,
//     FormControlLabel,
//     IconButton,
//     InputAdornment,
//     Link,
//     Stack,
//     TextField,
// } from "@mui/material";
// import LoadingButton from "@mui/lab/LoadingButton";
// import { Icon } from "@iconify/react";
// import { motion } from "framer-motion";
// import { ToastContainer, toast } from 'react-toastify';

// let easing = [0.6, -0.05, 0.01, 0.99];
// const animate = {
//     opacity: 1,
//     y: 0,
//     transition: {
//         duration: 0.6,
//         ease: easing,
//         delay: 0.16,
//     },
// };

// const LoginForm = ({ onLogin }) => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const from = location.state?.from?.pathname || "/";

//     const [showPassword, setShowPassword] = useState(false);

//     const LoginSchema = Yup.object().shape({
//         email: Yup.string()
//             .email("Provide a valid email address")
//             .required("Email is required"),
//         password: Yup.string().required("Password is required"),
//     });

//     const formik = useFormik({
//         initialValues: {
//             email: "",
//             password: "",
//             remember: true,
//         },
//         validationSchema: LoginSchema,
//         onSubmit: (values) => {
//             console.log("submitting...");
//             axios
//                 .post("https://travel-guide-backend-7e73c60545d8.herokuapp.com/api/v1/auth/authenticate", {
//                     email: values.email,
//                     password: values.password,
//                 })
//                 .then((response) => {
//                     localStorage.setItem("token", response.data.token);
//                     toast.success("Login successful!");
//                     localStorage.setItem('firstName', response.data.firstName);
//                     localStorage.setItem('lastName', response.data.lastName);
//                     onLogin(response.data.firstName, response.data.lastName);
//                     navigate("/search");
//                 })
//                 .catch((error) => {
//                     debugger
//                     if (error.response || error.response.data || error.response.data.message) {
//                         const errorMessage = error.response.data.message;
//                         console.log(errorMessage);
//                         toast.error(errorMessage);
//                         // Hata iletisini kullanıcıya göster
//                     } else {
//                         // Genel hata durumu
//                         // Hata iletisini kullanıcıya göster
//                     }
//                     // if (error.response && error.response.data.message === "Wrong password") {
//                     //     toastr.error("Wrong password!");
//                     // } else if (
//                     //     error.response &&
//                     //     error.response.data.message === "No such e-mail address was found"
//                     // ) {
//                     //     toastr.error("No such e-mail address was found");
//                     // } else {
//                     //     toastr.error("An error occurred: " + error.message);
//                     // }
//                 });
//         },
//     });

//     const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
//         formik;

//     return (
//         <FormikProvider value={formik}>
//             <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
//                 <Box
//                     component={motion.div}
//                     animate={{
//                         transition: {
//                             staggerChildren: 0.55,
//                         },
//                     }}
//                 >
//                     <Box
//                         sx={{
//                             display: "flex",
//                             flexDirection: "column",
//                             gap: 3,
//                         }}
//                         component={motion.div}
//                         initial={{ opacity: 0, y: 40 }}
//                         animate={animate}
//                     >
//                         <TextField
//                             sx={{fontSize:"20px"}}
//                             fullWidth
//                             autoComplete="username"
//                             type="email"
//                             label="Email Address"
//                             {...getFieldProps("email")}
//                             error={Boolean(touched.email && errors.email)}
//                             helperText={touched.email && errors.email}
//                         />

//                         <TextField
//                             fullWidth
//                             autoComplete="current-password"
//                             type={showPassword ? "text" : "password"}
//                             label="Password"
//                             {...getFieldProps("password")}
//                             error={Boolean(touched.password && errors.password)}
//                             helperText={touched.password && errors.password}
//                             InputProps={{
//                                 endAdornment: (
//                                     <InputAdornment position="end">
//                                         <IconButton
//                                             onClick={() => setShowPassword((prev) => !prev)}
//                                         >
//                                             {showPassword ? (
//                                                 <Icon icon="eva:eye-fill" />
//                                             ) : (
//                                                 <Icon icon="eva:eye-off-fill" />
//                                             )}
//                                         </IconButton>
//                                     </InputAdornment>
//                                 ),
//                             }}
//                         />
//                     </Box>

//                     <Box
//                         component={motion.div}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={animate}
//                     >
//                         <Stack
//                             direction="row"
//                             alignItems="center"
//                             justifyContent="space-between"
//                             sx={{ my: 2 }}
//                         >
//                             <FormControlLabel
//                                 control={
//                                     <Checkbox
//                                         {...getFieldProps("remember")}
//                                         checked={values.remember}
//                                     />
//                                 }
//                                 label="Remember me"
//                             />

//                             <Link
//                                 component={RouterLink}
//                                 variant="subtitle2"
//                                 to="#"
//                                 underline="hover"
//                             >
//                                 Forgot password?
//                             </Link>
//                         </Stack>

//                         <LoadingButton
//                             fullWidth
//                             size="large"
//                             type="submit"
//                             variant="contained"
//                             loading={isSubmitting}
//                         >
//                             {isSubmitting ? "loading..." : "Login"}
//                         </LoadingButton>
//                     </Box>
//                 </Box>
//             </Form>
//             <div>
//                 <ToastContainer />
//             </div>
//         </FormikProvider>
//     );
// };

// export default LoginForm;