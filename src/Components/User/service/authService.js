import callAPI from "../../../util/callAPI";
import callAuth from "../../../util/callAuth";

export async function loginService(username, password){
    try
    {
        const res = await callAPI("POST", "auth/login", {
            username: username,
            password: password
        })
        console.log(res);
        if (res.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(res.data));
        }
        return res.data;
    }catch (e) {
        console.log(e);
    }

}


export const signUpService = (fullName, username, password, email) =>
{
    return callAPI("POST", "auth/signup", {
        username: username,
        fullName: fullName,
        password: password,
        email: email,
    })
};

export const checkLoginService = async () => {
    const res = await callAuth();
    return res.data === 1;
}

export const logoutService = () => {
    localStorage.removeItem("user");
};

export const getCurrentUser = () =>
{
    return JSON.parse(localStorage.getItem('user'));
};
