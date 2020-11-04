import Grid from "@material-ui/core/Grid";
import BoardItems from "../boardItems";
import React, {useState} from "react";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import AddingItem from "../boardItems/addItems";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: "20px",
    },
    paper: {
            padding: "4px",
            paddingLeft: "20px",
            backgroundColor: "#fff"
    },
    button:{
        backgroundColor: "#cccccc",
    }
}));

function BoardColumns({tasks, color, onAddingNewItem, onRemoveItem})
{
    const [isHiddenAddingNewItems, setIsHiddenAddingNewItems] = useState(true);

    const classes = useStyles();

    const handleNewItem = () => {
        if(isHiddenAddingNewItems)
            setIsHiddenAddingNewItems(false);
    }
    const handleCloseNewItem = () =>{
        if(!isHiddenAddingNewItems)
            setIsHiddenAddingNewItems(true);
    }


    const newItem = isHiddenAddingNewItems ? <React.Fragment/> :
        <AddingItem onclickClose= {handleCloseNewItem} onClickAdd = {onAddingNewItem} task = {tasks}/>;

    return(
        <Grid item container xs = {12} sm={4} direction={"column"}>
            <Grid container spacing={1} >
                <Grid item xs ={12}>
                    <Paper elevation={3} className={classes.paper}>
                        <Grid container justify="space-between" alignItems="center">
                            <Grid item>
                                <Box fontWeight="fontWeightBold">
                                    {tasks.name}
                                </Box>
                            </Grid>
                            <Grid item>
                                <IconButton size={"small"} onClick={() => handleNewItem()}>
                                    <AddIcon/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                {newItem}
                <BoardItems onRemoveItem = {onRemoveItem} tasks = {tasks} color = {color}/>
            </Grid>
        </Grid>
    )
}

export default BoardColumns;