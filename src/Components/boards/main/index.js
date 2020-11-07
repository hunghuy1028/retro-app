import React, {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ClipLoader from "react-spinners/ClipLoader";
import BoardColumns from "../boardColumns";
import NameBoard from "./nameBoard";
import callAPI from "../../../util/callAPI";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: "20px",
    },
    nameBoard: {
        marginTop: "20px",
        marginBottom: "20px"
    }
}));

const override = `
  display: block;
  margin: 0 auto;
  border-color: red;
`;

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
    const classes = useStyles();

    const navigatorLink = "boards/board" + match.location.search;
    useEffect(() => {
        const fetchData = async () =>
        {
            const res = await callAPI('POST', navigatorLink, null);
            const result = res.data;
            setBoard(result);
            setIsLoaded(true);
        }
        fetchData();
    }, [navigatorLink])

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
        {
            setBoard({...board, wentWell: (wentWell.task.filter((_,i) => i !== index))})
        }
        else if (nameColumn === "To Improve")
        {
            setBoard({...board, toImprove: (toImprove.task.filter((_,i) => i !== index))})
        }
        else if (nameColumn === "Action Items")
        {
            setBoard({...board, actionItems: (actionItems.task.filter((_,i) => i !== index))})
        }

    }

    const handleRenameBoard = async (newName) =>
    {
        setBoard({...board, nameBoard: newName});
    }



    // if (error) {
    //     return <div>Error: {error.message}</div>;
    if (!isLoaded) {
        return (
            <div className="sweet-loading">
                <ClipLoader
                    override = {override}
                    size={50}
                    loading={!isLoaded}
                />
            </div>
        )
    } else {

        return (
            <div className={classes.root}>
                {/*<h1>{items.nameBoard}</h1>*/}
                <NameBoard nameBoard={board.nameBoard}
                           id={board._id}
                           handleRenameBoard={handleRenameBoard}/>
                <Grid container spacing={2}>
                    <BoardColumns tasks={wentWell} color="#009688"
                                  onAddingNewItem={onAddingNewItem} onRemoveItem = {onRemoveItem}/>
                    <BoardColumns tasks={toImprove} color="#e91e63"
                                  onAddingNewItem={onAddingNewItem} onRemoveItem = {onRemoveItem}/>
                    <BoardColumns tasks={actionItems} color="#9c27b0"
                                  onAddingNewItem={onAddingNewItem} onRemoveItem = {onRemoveItem}/>
                </Grid>
            </div>
        );
    }

}

export default Board;