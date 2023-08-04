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
import Test from "./RepeadVerified";

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

const VerifyComponent = ({ setAuth }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const { email } = location.state || {};

    const SignupSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Verification code required")
    });

    const onSubmit = (values) => {
        console.log("submitting...");
        axios
            .post(`https://travel-guide-backend-7e73c60545d8.herokuapp.com/verify?email=${email}&verificationCode=${values.firstName}`)
            .then((response) => {
                navigate("/");
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
                            label="Doğrulama kodu"
                            {...getFieldProps("firstName")}
                            error={Boolean(touched.firstName && errors.firstName)}
                            helperText={touched.firstName && errors.firstName}
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
                            DOĞRULA
                        </LoadingButton>
                    </Box>

                    <Test email={email}/>
                </Stack>
            </Form>
            <div>
                <ToastContainer />
            </div>
        </FormikProvider>
    );
};

export default VerifyComponent;