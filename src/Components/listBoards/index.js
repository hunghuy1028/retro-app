import React, {useEffect, useState} from "react";
import {Typography, Divider, Button, CardContent, CardActionArea, Card, Snackbar} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {makeStyles} from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import Grid from "@material-ui/core/Grid";
import {Redirect, Link} from "react-router-dom";
import NewBoard from "./newBoard";
import callAPI from "../../util/callAPI";
import MyConfirmDialog from "./MyConfirmDialog";
import {deleteBoardService} from "./service";
import MyAppBar from "../App/header";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: "20px",
    },
    icon:{
        fontSize: "50px",
    }


}));


function ListBoard()
{
    const [isNewBoardOpen, setIsNewBoardOpen] = useState(false);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(
        {isOpen: false, index: -1});
    const [listBoards, setListBoards] = useState([{
        _id: null, nameBoard: "", wentWell: [], toImprove: [], actionItems : [],
    }]);
    const [isOpenSnackBar, setIsOpenSnackBar] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const classes = useStyles();

    useEffect(() => {
        const fetchData = async () =>
        {
            const res = await callAPI('GET', "users/board", null);
            if(res.data.err)
            {
                setIsLogin(false);
            }
            else
            {
                setListBoards(res.data);
                setIsLogin(true);
            }
        }
        fetchData();
    }, [])
    if(!isLogin) return (
        <Redirect to={{pathname: '/login', err: "Un-Authorization"}}/>
    );


    const countTask = (index) =>
    {
        return listBoards[index].actionItems.length + listBoards[index].wentWell.length + listBoards[index].toImprove.length;
    }

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
        const newObj = [{_id: link, nameBoard: nameBoard, wentWell: [], toImprove: [], actionItems : [],}]
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

    const handleCloseSnackBar = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsOpenSnackBar(false);
    };

    return(
        <React.Fragment>
            <MyAppBar/>
            <div className={classes.root}>
                <div>
                    <Typography variant="h4" display="inline" >
                        My boards {'\u00A0'}
                    </Typography>
                    <Typography display="inline"
                                style={{fontSize: 16, color: "#b6b6b6", }}
                    >
                        collaborate by sharing URL with other people
                    </Typography>
                </div>
                <NewBoard open = {isNewBoardOpen} handleAddBoard = {handleAddBoard} handleClose = {handleClose}/>
                <Grid container spacing={2} style={{marginTop: "20px"}}>
                    <Grid item xs={4} sm={2}>
                        <Card onClick={createNewBoard} elevation={4} >
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
                    </Grid>
                    {
                        listBoards.map((item, index) => {
                            const navigateLink = "/boards?id=" + item._id;
                            return(
                                <Grid item xs={4} sm={2} key = {index}>
                                    <Card elevation={3}>
                                        <Link to = {navigateLink}
                                              style={{ textDecoration: 'none', color: "inherit" }}>
                                            <CardActionArea>
                                                <CardContent>
                                                    <Typography variant="h6">
                                                        {item.nameBoard}
                                                    </Typography>
                                                    <Typography display="inline"
                                                                style={{fontSize: 14, color: "#b6b6b6"}}>
                                                        {countTask(index) > 0 ? countTask(index) + " cards" : ""}
                                                    </Typography>

                                                </CardContent>
                                            </CardActionArea>
                                        </Link>
                                        <Divider/>
                                        <Grid container item justify="center" alignItems={"center"}>
                                            <Grid item xs={6}>
                                                <CopyToClipboard text = {navigateLink}
                                                                 onCopy = {() => setIsOpenSnackBar(true)}>
                                                    <Button fullWidth size={"small"}>
                                                        <FileCopyIcon fontSize={"inherit"} style={{fontSize: "24px"}}/>
                                                        URL
                                                    </Button>
                                                </CopyToClipboard>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Button fullWidth size={"small"} onClick={() => handleDeleteBoardOpen(index)}>
                                                    <DeleteIcon fontSize={"inherit"} style={{fontSize: "24px"}}/>
                                                    Delete
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>
                            )
                        })
                    }
                </Grid>
                <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                          open={isOpenSnackBar}
                          autoHideDuration={4000}
                          onClose={handleCloseSnackBar}
                          message="Copy URL success!"
                />
                <MyConfirmDialog open={isDeleteConfirmOpen.isOpen}
                                 close = {handleDeleteBoardClose}
                                 confirm = {deleteBoard} />
            </div>

        </React.Fragment>
    )
}

export default ListBoard;