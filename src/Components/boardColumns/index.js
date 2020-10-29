import Grid from "@material-ui/core/Grid";
import BoardItems from "../boardItems";
import React from "react";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: "20px",
    },
    paper: {
            padding: "4px",
            paddingLeft: "20px",
            backgroundColor: "#cccccc"
    },
}));

function BoardColumns({name, tasks, color})
{
    const classes = useStyles();

    return(
        <Grid container xs = {12} sm={4} item direction={"column"}>
            <Grid container spacing={1} >
                <Grid item xs ={12}>
                    <Paper elevation={3} className={classes.paper}>
                        <Grid container justify="space-between" alignItems="center">
                            <Grid item>
                                <Box fontWeight="fontWeightBold">
                                    {name}
                                </Box>
                            </Grid>
                            <Grid item>
                                <IconButton size={"small"}>
                                    <AddIcon/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Paper>

                </Grid>
                <BoardItems tasks = {tasks} color = {color}/>
            </Grid>
        </Grid>
    )
}

export default BoardColumns;