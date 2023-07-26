import axios from 'axios';

const makeApiRequest = async (url, method, body) => {
    try {
        const token = localStorage.getItem('token');

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const requestData = {
            method,
            url,
            headers
        };

        if (body) {
            requestData.data = body;
        }

        const response = await axios(requestData);

        return response;
    } catch (error) {
        debugger
        if(error.response.status === 403){
            console.log("asoidjaujd")
        }
        if(error.response.status === "503"){
            console.log("asasas")
        }
        console.error('API Request Error:', error);
        throw error;
    }
};

export default makeApiRequest;
