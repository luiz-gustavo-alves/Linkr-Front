import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_API_URL}`;
const API = axios.create({
    baseURL: BASE_URL
});

export const createConfig = (token) => {
    return {headers: {Authorization: `Bearer ${token}`}};
}

export default API;
