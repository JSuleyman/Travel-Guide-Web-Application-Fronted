import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Typography, Link, Box, Divider } from "@mui/material";
import styled from "@emotion/styled";

import SocialAuth from "../component/login_register/SocialAuth";
import Logo from "../component/login_register/Logo";
import RegisterComponent from "../component/login_register/RegisterComponent";
import { motion } from "framer-motion";
import VerifyComponent from "../component/login_register/VerifyComponent";

const RootStyle = styled("div")({
    background: "rgb(249, 250, 251)",
    height: "100vh",
    display: "grid",
    placeItems: "center",
});

const HeadingStyle = styled(Box)({
    textAlign: "center",
});

const ContentStyle = styled(Box)({
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
        y: 40,
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

const Verify = ({ setAuth }) => {
    return (
        <RootStyle>
            <Container maxWidth="sm">
                <ContentStyle>

                    <VerifyComponent setAuth={setAuth} />

                </ContentStyle>
            </Container>
        </RootStyle>
    );
};

export default Verify;