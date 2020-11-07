import callAPI from "../../../util/callAPI";

export const saveNameBoard = async (id, newName) =>
{
    const res = await callAPI("POST", "boards/saveNewName",{
        id: id,
        newName: newName
    })

    return res.data === 1;
}
