import callAPI from "../../../util/callAPI";

export const updateProfile = async (firstName, lastName, email) =>
{
    const res = await callAPI("POST", "users/profile", {
        firstName: firstName,
        lastName: lastName,
        email: email
    });
    return res;
}

export const changePassword = async (oldPassword, newPassword) =>
{
    const res = await callAPI("POST", "users/changePassword", {
        oldPassword: oldPassword,
        newPassword: newPassword,
    })

    return res;
}