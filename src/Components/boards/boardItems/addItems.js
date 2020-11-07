import React, {useState} from 'react'
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {FormControl} from "@material-ui/core";
import callAPI from "../../../util/callAPI";

function AddingItem({onclickClose, onClickAdd, task})
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
            <Paper style ={{padding: "10px"}}>
                <Grid container justify="space-between" alignItems="center">
                    <Grid item>
                        <FormControl>
                            <TextField onChange={
                                (e) => {setTextContent(e.target.value)}
                            }  multiline label="New Task" fullWidth />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Button onClick={addingNewItem}>Add</Button>
                        <Button onClick={onclickClose}>Close</Button>
                    </Grid>
                </Grid>

            </Paper>
        </Grid>
    )
}

export default AddingItem;