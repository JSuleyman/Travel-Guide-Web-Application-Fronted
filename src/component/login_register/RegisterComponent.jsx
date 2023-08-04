import * as Yup from "yup";
import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import {
    Stack,
    Box,
    TextField,
    IconButton,
    InputAdornment,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import axios from "axios";
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

const RegisterComponent = ({ setAuth }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [showPassword, setShowPassword] = useState(false);

    const SignupSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("First name required"),
        lastName: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Last name required"),
        email: Yup.string()
            .email("Email must be a valid email address")
            .required("Email is required"),
        password: Yup.string().required("Password is required"),
    });

    const onSubmit = (values) => {
        console.log("submitting...");
        axios
            .post("https://travel-guide-backend-7e73c60545d8.herokuapp.com/api/v1/auth/register", {
                firstname: values.firstName,
                lastname: values.lastName,
                email: values.email,
                password: values.password,
            })
            .then((response) => {
                const state = {
                    email: null
                };
                debugger
                if (location.state && location.state.values.email) {
                    state.email = location.state.values.email;
                } else {
                    state.email = values.email;
                }
                // toastr.success('Register sucscessful!');
                navigate("/verify", { state }); //burdan email i gonderessen i fso
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
    }

    const formik = useFormik({
        initialValues: {
            email: "" || null,
            password: "" || null,
            remember: true,
        },
        validationSchema: SignupSchema,
        onSubmit: onSubmit,
    });

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
        formik;

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <Stack
                        component={motion.div}
                        initial={{ opacity: 0, y: 60 }}
                        animate={animate}
                        direction={{ xs: "column", sm: "row" }}
                        spacing={2}
                    >
                        <TextField
                            fullWidth
                            label="Ad"
                            {...getFieldProps("firstName")}
                            error={Boolean(touched.firstName && errors.firstName)}
                            helperText={touched.firstName && errors.firstName}
                        />

                        <TextField
                            fullWidth
                            label="Soyad"
                            {...getFieldProps("lastName")}
                            error={Boolean(touched.lastName && errors.lastName)}
                            helperText={touched.lastName && errors.lastName}
                        />
                    </Stack>

                    <Stack
                        spacing={3}
                        component={motion.div}
                        initial={{ opacity: 0, y: 40 }}
                        animate={animate}
                    >
                        <TextField
                            fullWidth
                            autoComplete="username"
                            type="email"
                            label="Email address"
                            {...getFieldProps("email")}
                            error={Boolean(touched.email && errors.email)}
                            helperText={touched.email && errors.email}
                        />

                        <TextField
                            fullWidth
                            autoComplete="current-password"
                            type={showPassword ? "text" : "password"}
                            label="Password"
                            {...getFieldProps("password")}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            edge="end"
                                            onClick={() => setShowPassword((prev) => !prev)}
                                        >
                                            <Icon
                                                icon={
                                                    showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                                                }
                                            />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            error={Boolean(touched.password && errors.password)}
                            helperText={touched.password && errors.password}
                        />
                    </Stack>

                    <Box
                        component={motion.div}
                        initial={{ opacity: 0, y: 20 }}
                        animate={animate}
                    >
                        <LoadingButton
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            loading={isSubmitting}
                        >
                            QEYDİYYATDAN KEÇİN
                        </LoadingButton>
                    </Box>
                </Stack>
            </Form>
            <div>
                <ToastContainer />
            </div>
        </FormikProvider>
    );
};

export default RegisterComponent;