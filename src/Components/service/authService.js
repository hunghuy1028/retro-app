import axios from "axios";
import callAPI from "../../util/callAPI";

class AuthService
{
    loginService(username, password)
    {
        return callAPI("POST", "users/login", {
            username: username,
            password: password
        }).then(res => {
            if (res.data.key)
            {
                localStorage.setItem("user", JSON.stringify(res.data));
            }
            return res.data;
        })
    }

    logoutService(){
        localStorage.removeItem("user");
    }

    getCurrentUser()
    {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();