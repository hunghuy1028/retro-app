import axios from "axios"
const URL = "http://localhost:3000/";

const callAPI = (method, pathUrl, body) => {
    return axios({
        method: method,
        url: URL + pathUrl,
        data: body
    }).catch(err => {
        console.log(err);
    });

}

export default callAPI;