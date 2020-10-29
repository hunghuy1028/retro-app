import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {IconButton} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
    paper:{
        padding: "7px",
        paddingLeft: "20px"
    },
    icon: {
            color: "#ffffff"
    }
}));

function boardItems({tasks, color}) {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const classes = useStyles();

    return (
        <React.Fragment>
            {
                tasks.map(task =>
                {
                    return(
                        <Grid item xs={12} key = {task.id} spacing={2}>
                            <Paper style={{backgroundColor: color}} className={classes.paper}>
                                <Grid container justify="space-between"
                                      alignItems="center">
                                    <Grid item>
                                        <Box fontWeight="fontWeightMedium"
                                             color={"white"}>
                                            {task.content}
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <IconButton size={"small"}>
                                            <EditIcon className={classes.icon}/>
                                        </IconButton>
                                        <IconButton size={"small"}>
                                            <DeleteIcon className={classes.icon}/>
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