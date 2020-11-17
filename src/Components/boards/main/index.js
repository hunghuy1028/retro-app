import React, {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ClipLoader from "react-spinners/ClipLoader";
import BoardColumns from "../boardColumns";
import NameBoard from "./nameBoard";
import callAPI from "../../../util/callAPI";
import MyAppBar from "../../App/header";
import NotFoundPage from "../../App/notFoundPage";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: "20px",
    },
    nameBoard: {
        marginTop: "20px",
        marginBottom: "20px"
    },
    grid: {
        backgroundColor: "#f3f3f3"
    }
}));
function Board({match})
{
    const [isLoaded, setIsLoaded] = useState(false);
    const [board, setBoard] = useState({
        _id: null,
        nameBoard: "",
        wentWell: [],
        toImprove: [],
        actionItems: []
    });
    const [isExistBoard, setIsExistBoard] = useState(false)
    const classes = useStyles();

    const navigatorLink = "boards/board" + match.location.search;
    useEffect(() => {
        const fetchData = async () =>
        {
            const res = await callAPI('GET', navigatorLink, null);
            const result = res.data;
            if(result)
            {
                setBoard(result);
                setIsExistBoard(true)
            }
            else {
                setIsExistBoard(false);
            }
            setIsLoaded(true);
        }
        fetchData();
    }, [isExistBoard, navigatorLink])

    const wentWell = {
        id: board._id,
        task: board.wentWell,
        name: "Went Well"};
    const toImprove = {
        id: board._id,
        task: board.toImprove,
        name: "To Improve"};
    const actionItems = {
        id: board._id,
        task: board.actionItems,
        name: "Action Items"};

    const onAddingNewItem = (nameColumn, newValue) =>
    {
        if(nameColumn === "Went Well")
            setBoard({...board, wentWell: (wentWell.task.concat(newValue))})
        else if (nameColumn === "To Improve")
            setBoard({...board, toImprove: (toImprove.task.concat(newValue))})
        else if (nameColumn === "Action Items")
            setBoard({...board, actionItems: (actionItems.task.concat(newValue))})
    }

    const onRemoveItem = (nameColumn, index) => {
        if(nameColumn === "Went Well")
            setBoard({...board, wentWell: (wentWell.task.filter((_,i) => i !== index))})
        else if (nameColumn === "To Improve")
            setBoard({...board, toImprove: (toImprove.task.filter((_,i) => i !== index))})
        else if (nameColumn === "Action Items")
            setBoard({...board, actionItems: (actionItems.task.filter((_,i) => i !== index))})
    }


    const onEditItem = (nameColumn, index, newValue) =>
    {
        if(nameColumn === "Went Well")
        {
            setBoard({...board, wentWell: (wentWell.task.map((value, i) => i !== index? value : newValue))})
        }
        else if (nameColumn === "To Improve")
        {
            setBoard({...board, toImprove: (toImprove.task.map((value, i) => i !== index? value : newValue))})
        }
        else if (nameColumn === "Action Items")
        {
            setBoard({...board, actionItems: (actionItems.task.map((value, i) => i !== index? value : newValue))})
        }
    }

    const handleRenameBoard = async (newName) =>
    {
        setBoard({...board, nameBoard: newName});
    }

    if (!isLoaded) {
        return (
            <React.Fragment>
                <MyAppBar/>
                <div className="sweet-loading">
                    <ClipLoader
                        size={50}
                        loading={!isLoaded}
                    />
                </div>
            </React.Fragment>
        )
    } else if(isExistBoard){
        return (
            <React.Fragment>
                <MyAppBar/>
                <div className={classes.root}>
                <NameBoard nameBoard={board.nameBoard}
                           id={board._id}
                           handleRenameBoard={handleRenameBoard}/>
                   <Grid container spacing={2} >
                       <BoardColumns tasks={wentWell} color="#009688"
                                     onAddingNewItem={onAddingNewItem}
                                     onRemoveItem = {onRemoveItem}
                                     onEditItem = {onEditItem}/>
                       <BoardColumns tasks={toImprove} color="#e91e63"
                                     onAddingNewItem={onAddingNewItem}
                                     onRemoveItem = {onRemoveItem}
                                     onEditItem = {onEditItem}/>
                       <BoardColumns tasks={actionItems} color="#9c27b0"
                                     onAddingNewItem={onAddingNewItem}
                                     onRemoveItem = {onRemoveItem}
                                     onEditItem = {onEditItem}/>
                   </Grid>
                </div>
            </React.Fragment>
        );
    }else
    {
        return(<NotFoundPage/>)
    }
}

export default Board;