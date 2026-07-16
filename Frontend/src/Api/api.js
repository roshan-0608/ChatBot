import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/api/v1",
    withCredentials: true,  // normally, brower don't send cookies, but when credentials = true , axios tells Whenever talking to my backend, also send the cookies
});

export default api;