import callAPI from "../../util/callAPI";

export const deleteBoardService = async (id) =>
{
    const res = await callAPI("POST", "users/deleteBoard", {
        id: id
    })

    return res === 1;
}