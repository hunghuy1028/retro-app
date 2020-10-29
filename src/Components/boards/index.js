import React, {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ClipLoader from "react-spinners/ClipLoader";
import BoardColumns from "../boardColumns";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: "20px",
    },
}));

const override = `
  display: block;
  margin: 0 auto;
  border-color: "36D7B8";
`;

function Board()
{
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState({
        wentWell: [],
        toImprove: [],
        actionItems: []
    });
    const classes = useStyles();

    useEffect(() => {
        fetch("https://retro-api-1712472.herokuapp.com/boards")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    const wentWell = items.wentWell;
    const toImprove = items.toImprove;
    const actionItems = items.actionItems;

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return (
            <div className="sweet-loading">
                <ClipLoader
                    css={override}
                    size={50}
                    loading={!isLoaded}
                />
            </div>
        )
    } else {
        return (
            <div className={classes.root}>
                <h1>{items.nameBoard}</h1>
                <Grid xs={12} container spacing={2}>
                    <BoardColumns name = "Went Well" tasks = {wentWell} color = "#009688"/>
                    <BoardColumns name = "To Improve" tasks = {toImprove} color = "#e91e63"/>
                    <BoardColumns name = "Action Items" tasks = {actionItems} color = "#9c27b0"/>
                </Grid>
            </div>
        );
    }
}

export default Board;