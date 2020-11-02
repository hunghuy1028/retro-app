import axios from "axios"

const callAPI = (method, pathUrl, body) => {
    return axios({
        method: method,
        url: "http://localhost:3000/"+ pathUrl,
        data: body
    }).catch(err => {
        console.log(err);
    });

}

export default callAPI;