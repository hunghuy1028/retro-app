import axios from "axios"
const URL = "https://retro-api-1712472.herokuapp.com/";

const callAuth = () => {
    const token = JSON.parse(localStorage.getItem('user'));
    return axios({
        method: "GET",
        url: URL,
        headers: {"Authorization" : `Bearer ${token? token.accessToken: "null"}`}
    });

}

export default callAuth;