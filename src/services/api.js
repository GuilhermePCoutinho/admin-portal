import axios from "axios";

const api = axios.create({
    baseURL: "http://admin-portal-over.herokuapp.com",
})

export default api;