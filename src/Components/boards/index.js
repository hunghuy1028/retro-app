import React, {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ClipLoader from "react-spinners/ClipLoader";
import BoardColumns from "../boardColumns";
import axios from "axios"
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
        wentWell: [{id: null, content: ""}],
        toImprove: [{id: null, content: ""}],
        actionItems: [{id: null, content: ""}]
    });
    const classes = useStyles();


    useEffect(() => {
        callAPI('POST', ("board" + match.location.search), null)
            .then(res =>
            {
                const result = res.data;
                setItems(result);
                setIsLoaded(true);
            })
    }, [])

    const wentWell = items.wentWell;
    const toImprove = items.toImprove;
    const actionItems = items.actionItems;

    const onAddingNewItem = (nameColumn, newValue) =>
    {
        if(nameColumn === "Went Well")
            setItems({...items, wentWell: (wentWell.concat([
                {id: wentWell.length, content: newValue}]))})
        else if (nameColumn === "To Improve")
            setItems({...items, toImprove: (toImprove.concat([
                    {id: toImprove.length, content: newValue}]))})
        else if (nameColumn === "Action Items")
            setItems({...items, actionItems: (actionItems.concat([
                    {id: actionItems.length, content: newValue}]))})
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
                    <BoardColumns name="Went Well" tasks={wentWell} color="#009688"
                                  onAddingNewItem={onAddingNewItem}/>
                    <BoardColumns name="To Improve" tasks={toImprove} color="#e91e63"
                                  onAddingNewItem={onAddingNewItem}/>
                    <BoardColumns name="Action Items" tasks={actionItems} color="#9c27b0"
                                  onAddingNewItem={onAddingNewItem}/>
                </Grid>
            </div>
        );
    }

}

export default Board;