import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {IconButton} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import callAPI from "../../../util/callAPI";


function boardItems({onRemoveItem, tasks, color}) {

    const handleRemove = async (index) => {
        await callAPI("POST", "boards/deleteTask",  {
            id: tasks.id,
            name: tasks.name,
            index: index
        })
        onRemoveItem(tasks.name, index);
    }

    return (
        <React.Fragment>
            {
                tasks.task.map((task, index) =>
                {
                    return(
                        <Grid item xs={12} key = {index}>
                            <Paper style={{backgroundColor: color, padding: "7px",
                                paddingLeft: "10px"}}>
                                <Grid container justify="space-between"
                                      alignItems="center">
                                    <Grid item xs>
                                        <Box fontWeight="fontWeightMedium"
                                             color={"white"} >
                                                {task}
                                        </Box>
                                    </Grid>
                                    <Grid container item justify="flex-end" alignItems={"flex-end"}>
                                        <IconButton size={"small"}>
                                            <EditIcon fontSize={"inherit"} style={{color: "#ffffff",
                                                fontSize: "16px"}}/>
                                        </IconButton>
                                        <IconButton onClick={() => handleRemove(index)} size={"small"}>
                                            <DeleteIcon fontSize={"inherit"} style={{color: "#ffffff",
                                                fontSize: "16px"}}/>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Paper>

                        </Grid>
                    )
                })
            }
        </React.Fragment>
    );
}

export default boardItems;