import axios from "axios";

const axiosInstace = axios.create({
    baseURL: 'https://membry.onrender.com',
    headers: {
        "Content-Type": 'application/json'
    }
})

export default axiosInstace;