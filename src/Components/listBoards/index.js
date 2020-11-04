import React, {useEffect, useState} from "react";
import {Typography} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import {makeStyles} from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";
import NewBoard from "./newBoard";
import callAPI from "../../util/callAPI";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: "20px",
    },
    card:{
        maxWidth: "150px"
    },
    icon:{
        fontSize: "50px",
    },
    cardItem:{
        height: "100px"
    }

}));


function ListBoard()
{
    const [isNewBoardOpen, setIsNewBoardOpen] = useState(false);
    const [listBoards, setListBoards] = useState([{
        _id: null, nameBoard: "",
    }]);
    const classes = useStyles();

    useEffect(() => {
        callAPI('GET', "board", null)
            .then(res=>{
                setListBoards(res.data);
            })
    }, [])

    const createNewBoard = () => {
        if(!isNewBoardOpen)
            setIsNewBoardOpen(true)
    }

    const handleClose = () => {
        if(isNewBoardOpen)
            setIsNewBoardOpen(false)
    }

    const handleAddBoard = (nameBoard, link) =>
    {
        const newObj = [{_id: link, nameBoard: nameBoard}]
        setListBoards(listBoards.concat(newObj));
    }


    return(
        <div className={classes.root}>
            <Card className={classes.card} onClick={createNewBoard} elevation={4} >
                <CardActionArea>
                    <CardContent>
                        <Grid container alignItems={"center"} justify={"center"}>
                            <AddIcon className={classes.icon}/>
                            <Typography>
                                Add board
                            </Typography>
                        </Grid>
                    </CardContent>
                </CardActionArea>
            </Card>
            <NewBoard open = {isNewBoardOpen} handleAddBoard = {handleAddBoard} handleClose = {handleClose}/>
            <Grid container spacing={2} style={{marginTop: "20px"}}>
            {
                listBoards.map((item, index) => {
                    const navigateLink = "/board?id=" + item._id;
                    return(
                        <Grid item xs={4} sm={2} key = {index}>
                            <Link to = {navigateLink}>
                                <Card elevation={4}>
                                    <CardActionArea>
                                        <CardContent className={classes.cardItem}>
                                            <Grid container alignItems={"center"} justify={"center"}>
                                                <Typography>
                                                    {item.nameBoard}
                                                </Typography>
                                            </Grid>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Link>
                        </Grid>
                    )
                })
            }
            </Grid>
        </div>
    )
}

export default ListBoard;