import React from "react";
import Grid from "@material-ui/core/Grid";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {IconButton} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import callAPI from "../../../util/callAPI";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";


export default function boardItems({onRemoveItem, tasks, color, editValue, onEditValue, onCloseValue, onChangeValue}) {
    const handleRemove = async (index) => {
        await callAPI("POST", "boards/deleteTask",  {
            id: tasks.id,
            name: tasks.name,
            index: index
        })
        onRemoveItem(tasks.name, index);
    }

    const handleClickEdit = (index, task) =>
    {
        onEditValue(index, task)
    }

    const handleCloseEdit = (value, index) =>
    {
        onCloseValue(value, index)
    }

    const handleChangeValue = (e, task) =>
    {
        onChangeValue(e.target.value)
    }

    const renderEdit = (task, index) =>
    {
        if(editValue[index])
        {
            return (
                <Grid item xs>
                    <InputBase defaultValue={task}
                               onChange={(e) => handleChangeValue(e)}
                               fullWidth
                               multiline
                               style={{backgroundColor: "#ffffff"}}
                               inputProps={{
                                   style:{
                                       marginLeft: 3,
                                       marginRight: 3
                                   }
                               }}
                    />
                    <Grid container item justify="space-between"
                          alignItems="flex-end"
                          style={{backgroundColor: "#fff", padding: 4}}>
                        <Button onClick={() => handleCloseEdit(task, index)}
                                style={{backgroundColor: "#00c853", color: "#ffffff", fontSize: 10}}>Done</Button>
                        <IconButton style = {{marginLeft: 10}}
                                    onClick={() => handleRemove(index)} size={"small"}>
                            <DeleteIcon fontSize={"inherit"}
                                        style={{fontSize: "16px"}}/>
                        </IconButton>
                    </Grid>
                </Grid>
            )
        }
        else {
            return(
                <Grid item xs>
                    <InputBase defaultValue={task}
                               fullWidth
                               multiline
                               readOnly
                               style={{color: "#ffffff"}}
                    />
                    <Grid container item justify="flex-end" alignItems="flex-end">
                        <IconButton style={{display: editValue[index] ? "none":"block"}}
                                    size={"small"} onClick={() => handleClickEdit(index, task)}>
                            <EditIcon fontSize={"inherit"} style={{color: "#ffffff",
                                fontSize: "16px"}}/>
                        </IconButton>
                        <IconButton style = {{marginLeft: 10}}
                                    onClick={() => handleRemove(index)} size={"small"}>
                            <DeleteIcon fontSize={"inherit"}
                                        style={{color: "#ffffff", fontSize: "16px"}}/>
                        </IconButton>
                    </Grid>
                </Grid>
            )
        }
    }

    return (
        <React.Fragment>
            {
                tasks.task.map((task, index) =>
                {
                    return(
                        <Grid item xs={12} key = {index}>
                            <Paper style={{backgroundColor: color, padding: "7px", paddingLeft: "10px"}}>
                                <Grid container justify="space-between" alignItems="center">
                                    {renderEdit(task, index)}
                                </Grid>
                            </Paper>
                        </Grid>
                    )
                })
            }
        </React.Fragment>
    );
}