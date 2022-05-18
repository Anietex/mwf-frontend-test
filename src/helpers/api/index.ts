import _axios from 'axios';
import {API_BASE_URL} from "../../constants";


export const Api = _axios.create({
    baseURL: `${API_BASE_URL}/`,
    headers: {
        'Content-Type': 'application/json'
    }
});

