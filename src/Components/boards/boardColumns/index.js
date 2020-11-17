import Grid from "@material-ui/core/Grid";
import BoardItems from "../boardItems";
import React, {useEffect, useState} from "react";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import IconButton from "@material-ui/core/IconButton";
import StopIcon from '@material-ui/icons/Stop';
import Box from "@material-ui/core/Box";
import AddingItem from "../boardItems/addItems";
import {editItemBoardService} from "./service";

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

function BoardColumns({tasks, color, onAddingNewItem, onRemoveItem, onEditItem})
{
    const [isHiddenAddingNewItems, setIsHiddenAddingNewItems] = useState(true);
    const [isEditValue, setIsEditValue] = useState(Array(tasks.task.length).fill(false));
    const [newValue, setNewValue] = useState("");

    useEffect(()=>
    {
        setIsEditValue(Array(tasks.task.length).fill(false))
    },[tasks.task.length])

    const classes = useStyles();

    const handleNewItem = () => {
        if(isHiddenAddingNewItems)
            setIsHiddenAddingNewItems(false);
    }
    const handleCloseNewItem = () =>{
        if(!isHiddenAddingNewItems)
            setIsHiddenAddingNewItems(true);
    }

    const handleOpenEditValue = (index, task) =>
    {
        if(!isEditValue[index])
        {
            setIsEditValue(isEditValue.map((_, i) => i === index));
            setNewValue(task);
        }
    }

    const handleCloseEditValue = async (value, index) =>
    {
        setIsEditValue(Array(tasks.task.length).fill(false));
        if(newValue.length <= 0)
        {
            setNewValue(value);
        }
        onEditItem(tasks.name, index, newValue);
        await editItemBoardService(tasks.id, tasks.name,index, newValue);
    }

    const changeValue = (newVal) =>
    {
        setNewValue(newVal);
    }

    const newItem = isHiddenAddingNewItems ? <React.Fragment/> :
        <AddingItem onclickClose= {handleCloseNewItem} onClickAdd = {onAddingNewItem} task = {tasks} color={color}/>;

    return(
        <Grid item container xs = {12} sm={4} direction={"column"}>
            <Grid container spacing={1} >
                <Grid item xs ={12}>
                    <Paper elevation={2} className={classes.paper}>
                        <Grid container justify="space-between" alignItems="center">
                            <Grid item>
                                <Grid container spacing={1} style={{paddingTop: 2}}>
                                    <StopIcon style={{color: color}}/>
                                    <Box fontWeight="fontWeightBold" style={{marginLeft: 10}}>
                                        {tasks.name}
                                    </Box>
                                </Grid>
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
                <BoardItems onRemoveItem = {onRemoveItem}
                            tasks = {tasks}
                            color = {color}
                            editValue = {isEditValue}
                            onEditValue = {handleOpenEditValue}
                            onCloseValue = {handleCloseEditValue}
                            onChangeValue = {changeValue}/>
            </Grid>
        </Grid>
    )
}

export default BoardColumns;