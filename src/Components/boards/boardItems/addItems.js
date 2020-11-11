import React, {useState} from 'react'
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import callAPI from "../../../util/callAPI";
import InputBase from "@material-ui/core/InputBase";

function AddingItem({onclickClose, onClickAdd, task, color})
{

    const [textContent, setTextContent] = useState("");

    const addingNewItem = async () =>
    {
        if(textContent !== "")
        {
            onClickAdd(task.name, textContent);
            onclickClose();
            await callAPI("POST", "boards/newTask", {
                id: task.id,
                name: task.name,
                content: textContent,
            });
        }
        else
        {
            onclickClose();
        }
    }

    return(
        <Grid item xs={12}>
            <Paper style ={{padding: "10px", backgroundColor: color}}>
                <Grid container justify="space-between" alignItems="center">
                    <Grid item xs>
                        <InputBase onChange={(e) => {setTextContent(e.target.value)}}
                                   fullWidth
                                   multiline
                                   style={{backgroundColor: "#ffffff"}}
                                   inputProps={{
                                       style:{
                                           marginLeft: 3,
                                           marginRight: 3
                                       }
                                   }}
                                   rows={2}
                        />
                        <Grid container item justify="space-between"
                              alignItems="flex-end"
                              style={{backgroundColor: "#fff", padding: 4}}>
                            <Button onClick={addingNewItem}
                                    style={{backgroundColor: "#00c853", color: "#ffffff", fontSize: 10}}>Add</Button>
                            <Button onClick={onclickClose}
                                    style={{backgroundColor: "#00c853", color: "#ffffff", fontSize: 10}}>Close</Button>
                        </Grid>
                    </Grid>
                </Grid>

            </Paper>
        </Grid>
    )
}

export default AddingItem;