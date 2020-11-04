import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {IconButton} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import callAPI from "../../../util/callAPI";

const useStyles = makeStyles((theme) => ({
    paper:{
        padding: "7px",
        paddingLeft: "10px"
    },
    icon: {
        color: "#ffffff",
        fontSize: "16px"
    }
}));

function boardItems({onRemoveItem, tasks, color}) {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const classes = useStyles();

    const handleRemove = index => {
        callAPI("POST", "deleteTaskInBoard",  {
            id: tasks.id,
            name: tasks.name,
            index: index
        }).then(res => {
            onRemoveItem(tasks.name, index);
        })

    }

    return (
        <React.Fragment>
            {
                tasks.task.map((task, index) =>
                {
                    return(
                        <Grid item xs={12} key = {index}>
                            <Paper style={{backgroundColor: color}} className={classes.paper}>
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
                                            <EditIcon fontSize={"inherit"} className={classes.icon}/>
                                        </IconButton>
                                        <IconButton onClick={() => handleRemove(index)} size={"small"}>
                                            <DeleteIcon fontSize={"inherit"} className={classes.icon}/>
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