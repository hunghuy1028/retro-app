import axios from "axios"
const URL = "https://retro-api-1712472.herokuapp.com/";

const callAPI = (method, pathUrl, body) => {
    const token = JSON.parse(localStorage.getItem('user'));
    return axios({
        method: method,
        url: URL + pathUrl,
        data: body,
        headers: {"Authorization" : `Bearer ${token? token.accessToken: "null"}`}
    });

}

export default callAPI;