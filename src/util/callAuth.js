import axios from "axios"
const URL = "http://localhost:3000/auth/";

const callAuth = () => {
    const token = JSON.parse(localStorage.getItem('user'));
    return axios({
        method: "GET",
        url: URL,
        headers: {"Authorization" : `Bearer ${token? token.accessToken: "null"}`}
    });

}

export default callAuth;