import axios from "axios";

const axiosInstace = axios.create({
    baseURL: 'https://api-v2.pandavideo.com.br',
    headers: {
        "Content-Type": 'application/json'
    }
})

export default axiosInstace;