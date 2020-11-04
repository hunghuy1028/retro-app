import React, {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ClipLoader from "react-spinners/ClipLoader";
import BoardColumns from "./boardColumns";
import callAPI from "../../util/callAPI";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: "20px",
    },
}));

const override = `
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Board({match})
{
    const [isLoaded, setIsLoaded] = useState(false);
    //const [isReset, setIsReset] = useState(false);
    const [items, setItems] = useState({
        _id: null,
        wentWell: [],
        toImprove: [],
        actionItems: []
    });
    const classes = useStyles();

    const navigatorLink = "board" + match.location.search;
    useEffect(() => {
        callAPI('POST', navigatorLink, null)
            .then(res =>
            {
                const result = res.data;
                setItems(result);
                setIsLoaded(true);
            })
    }, [navigatorLink])

    const wentWell = {
        id: items._id,
        task: items.wentWell,
        name: "Went Well"};
    const toImprove = {
        id: items._id,
        task: items.toImprove,
        name: "To Improve"};
    const actionItems = {
        id: items._id,
        task: items.actionItems,
        name: "Action Items"};

    const onAddingNewItem = (nameColumn, newValue) =>
    {
        if(nameColumn === "Went Well")
            setItems({...items, wentWell: (wentWell.task.concat(newValue))})
        else if (nameColumn === "To Improve")
            setItems({...items, toImprove: (toImprove.task.concat(newValue))})
        else if (nameColumn === "Action Items")
            setItems({...items, actionItems: (actionItems.task.concat(newValue))})
    }

    const onRemoveItem = (nameColumn, index) => {
        if(nameColumn === "Went Well")
        {
            setItems({...items, wentWell: (wentWell.task.filter((_,i) => i !== index))})
        }
        else if (nameColumn === "To Improve")
        {
            setItems({...items, toImprove: (toImprove.task.filter((_,i) => i !== index))})
        }
        else if (nameColumn === "Action Items")
        {
            setItems({...items, actionItems: (actionItems.task.filter((_,i) => i !== index))})
        }

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
                <h1>{items.nameBoard}</h1>
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