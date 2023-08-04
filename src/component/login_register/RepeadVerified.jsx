import { useState, useEffect } from "react";
import axios from "axios";

const Test = ({ email }) => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [remainingTime, setRemainingTime] = useState(60);

    useEffect(() => {
        // Enable the button after 1 minute (60 seconds)
        const initialCountdownTimeout = setTimeout(() => {
            setIsButtonDisabled(false);
        }, 60000);

        // Update remaining time every second if the button is disabled
        if (isButtonDisabled) {
            const interval = setInterval(() => {
                setRemainingTime((prevTime) => Math.max(prevTime - 1, 0));
            }, 1000);

            // Clear the interval when the component unmounts or the button becomes enabled again
            return () => clearInterval(interval);
        }

        // Clear the initial countdown timeout when the component unmounts
        return () => clearTimeout(initialCountdownTimeout);
    }, [isButtonDisabled]);

    const handleButtonClick = () => {
        setIsButtonDisabled(true);
        setRemainingTime(60);
        debugger
        axios
            .post(`https://travel-guide-backend-7e73c60545d8.herokuapp.com/verify/send_repeat_verification_code?email=${email}`)
            .then(() => {
            })
            .catch((error) => {
                console.log("An error occurred while requesting verification code:", error.message);
                setIsButtonDisabled(false);
            });

        // Disable the button for 1 minute (60 seconds)
        setTimeout(() => {
            setIsButtonDisabled(false);
        }, 60000);
    };

    return (
        <button onClick={handleButtonClick} disabled={isButtonDisabled}>
            {isButtonDisabled
                ? `Disabled for ${remainingTime} seconds`
                : "Click me"}
        </button>
    );
};

export default Test;
