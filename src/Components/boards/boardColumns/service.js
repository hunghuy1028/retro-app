import callAPI from "../../../util/callAPI";

export const editItemBoardService = async (id, name, index, value) =>
{
    const pathURL = "boards/editTask"
    const res =  await callAPI("POST", pathURL, {
        id: id,
        name: name,
        index: index,
        newValue: value
    })
    return res === 1;
}