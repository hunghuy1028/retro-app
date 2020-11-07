import React, {useEffect, useState} from "react";
import {IconButton, Typography} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import {makeStyles} from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";
import NewBoard from "./newBoard";
import callAPI from "../../util/callAPI";
import MyConfirmDialog from "./MyConfirmDialog";
import {deleteBoardService} from "./listBoardsService";

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

}));


function ListBoard()
{
    const [isNewBoardOpen, setIsNewBoardOpen] = useState(false);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(
        {isOpen: false, index: -1});
    const [listBoards, setListBoards] = useState([{
        _id: null, nameBoard: "",
    }]);
    const classes = useStyles();

    useEffect(() => {
        const fetchData = async () =>
        {
            const res = await callAPI('GET', "users/board", null);
            if(res.data.err)
            {
                console.log(res.data);
            }
            else setListBoards(res.data);
        }
        fetchData();
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

    const handleDeleteBoardOpen = (index) =>
    {
        if(!isDeleteConfirmOpen.isOpen)
            setIsDeleteConfirmOpen({isOpen: true, index: index});
    }
    const handleDeleteBoardClose = () =>
    {
        if(isDeleteConfirmOpen)
            setIsDeleteConfirmOpen({isOpen: false});
    }
    const deleteBoard = async () =>
    {
        if(isDeleteConfirmOpen.index >= 0)
        {
            setListBoards(listBoards.filter((_, i) => i!== isDeleteConfirmOpen.index))
            setIsDeleteConfirmOpen({isOpen: false, index: -1});
            await deleteBoardService(listBoards[isDeleteConfirmOpen.index]._id);
        }
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
                    const navigateLink = "/boards?id=" + item._id;
                    return(
                        <Grid item xs={4} sm={2} key = {index}>
                            <Card elevation={4}>
                                <Link to = {navigateLink} style={{ textDecoration: 'none', color: "inherit" }}>
                                    <CardActionArea>
                                        <CardContent>
                                            <Grid container alignItems={"center"} justify={"center"}>
                                                <Typography>
                                                    {item.nameBoard}
                                                </Typography>
                                            </Grid>
                                        </CardContent>
                                    </CardActionArea>
                                </Link>
                                <Grid container item justify="flex-end" alignItems={"flex-end"}>
                                    <IconButton size={"small"} onClick={() => handleDeleteBoardOpen(index)}>
                                        <DeleteIcon fontSize={"inherit"} style={{fontSize: "24px"}}/>
                                    </IconButton>
                                </Grid>
                            </Card>
                        </Grid>
                    )
                })
            }
            <MyConfirmDialog open={isDeleteConfirmOpen.isOpen}
                             close = {handleDeleteBoardClose}
                             confirm = {deleteBoard} />
            </Grid>
        </div>
    )
}

export default ListBoard;