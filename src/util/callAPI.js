import axios from "axios"
const URL = "http://localhost:3000/";

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