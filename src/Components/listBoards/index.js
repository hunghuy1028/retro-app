import React, {useEffect, useState} from "react";
import {Typography, Divider, Button, CardContent, CardActionArea, Card, Snackbar} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {makeStyles} from "@material-ui/core/styles";
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import Grid from "@material-ui/core/Grid";
import {Redirect, Link} from "react-router-dom";
import NewBoard from "./newBoard";
import callAPI from "../../util/callAPI";
import MyConfirmDialog from "./MyConfirmDialog";
import {deleteBoardService} from "./service";
import MyAppBar from "../App/header";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import InputBase from "@material-ui/core/InputBase";

const host = window.location.protocol + "//" + window.location.hostname +
    (window.location.port? ":"+window.location.port:"");

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: "20px",
    },
    icon:{
        fontSize: "60px",
        color: "#239478"
    },
    button:{
        fontSize: 14,
        textTransform: 'none',
        color: "#239478"
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
        return listBoards[index].actionItems.length +
            listBoards[index].wentWell.length +
            listBoards[index].toImprove.length;
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
                    <Typography variant="h4" display="inline" style={{color: "#239478"}}>
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
                    <Grid item xs={6} sm={2}>
                        <Card onClick={createNewBoard} elevation={4} >
                            <CardActionArea>
                                <CardContent>
                                    <Grid container>
                                        <Grid container item xs={12} alignContent={"center"} justify={"center"}>
                                            <AddRoundedIcon className={classes.icon}  />
                                        </Grid>
                                        <Grid container item xs={12} alignContent={"center"} justify={"center"}>
                                            <Typography>
                                                ADD BOARD
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    {
                        listBoards.map((item, index) => {
                            const navigateLink = "/boards?id=" + item._id;
                            return(
                                <Grid item xs={6} sm={2} key = {index}>
                                    <Card elevation={3}>
                                        <Link to = {navigateLink}
                                              style={{ textDecoration: 'none', color: "inherit" }}>
                                            <CardActionArea>
                                                <CardContent>
                                                    <InputBase defaultValue={item.nameBoard}
                                                               multiline
                                                               disabled
                                                               inputProps={{
                                                                   style:{
                                                                       fontSize: 20,
                                                                       color: "#239478",
                                                                   }
                                                               }}
                                                    />
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
                                                <CopyToClipboard text = {host+navigateLink}
                                                                 onCopy = {() => setIsOpenSnackBar(true)}>
                                                    <Button fullWidth size={"small"}
                                                            className={classes.button}>
                                                        <FileCopyIcon fontSize={"inherit"} style={{fontSize: "20px"}}/>
                                                        URL
                                                    </Button>
                                                </CopyToClipboard>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Button fullWidth className={classes.button}
                                                        size={"small"} onClick={() => handleDeleteBoardOpen(index)}>
                                                    <DeleteIcon fontSize={"inherit"} style={{fontSize: "20px"}}/>
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