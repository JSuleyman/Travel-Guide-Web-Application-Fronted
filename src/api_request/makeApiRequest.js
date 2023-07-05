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
        console.error('API Request Error:', error);
        throw error;
    }
};

export default makeApiRequest;
