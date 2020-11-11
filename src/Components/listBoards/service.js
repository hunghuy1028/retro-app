import callAPI from "../../util/callAPI";

export const deleteBoardService = async (id) =>
{
    const pathURL = "users/deleteBoard"
    const res = await callAPI("POST", pathURL, {
        id: id
    })

    return res === 1;
}