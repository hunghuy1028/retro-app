import React, {useState} from 'react'
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {FormControl} from "@material-ui/core";

function AddingItem({onclickClose, onClickAdd, name})
{

    const [textContent, setTextContent] = useState("");

    const addingNewItem = () =>
    {
        onClickAdd(name, textContent);
        onclickClose();
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