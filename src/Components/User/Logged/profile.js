import Typography from "@material-ui/core/Typography";
import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import {IconButton} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Link} from "react-router-dom";
import MyAppBar from "../../App/header";
import callAPI from "../../../util/callAPI";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import Collapse from "@material-ui/core/Collapse";
import {updateProfile} from "../service/updateService";

const useStyles = makeStyles((theme) => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
            marginTop: theme.spacing(3),
            marginLeft: theme.spacing(1),
        }

}));


export default function Profile()
{
    const [loginState, setLoginState] = useState({isLogin: false, user: null});
    const [status, setStatus] = useState({type: "error", content:""});
    const [alert, setAlert] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        const fetchData = async () =>
        {
            const res = await callAPI("GET", "users/profile",null);
            if(res.data.err)
            {
                setLoginState({isLogin: false, user: null})
            }
            else if(res.data.user)
            {
                setLoginState({isLogin: true, user: res.data.user})
            }
        }
        fetchData();

    }, [])

    const handleSaveProfile = async () =>
    {
        if(loginState.user.firstName.length <= 0 || loginState.user.lastName.length <=0 || loginState.user.email.length <=0 )
        {
            setAlert(true);
            setStatus({type: "error", content: "Please fill all fields"});
        }
        else
        {
            const res = await updateProfile(loginState.user.firstName, loginState.user.lastName, loginState.user.email);
            if(res.data.err)
            {
                setAlert(true);
                setStatus({type: "error", content: res.data.err});
            }
            else
            {
                setAlert(true);
                setStatus({type: "success", content: "Success!"});
            }

        }
    }

    if(loginState.isLogin)
    {
        return (
            <React.Fragment>
                <MyAppBar/>
                <div className={classes.layout}>
                    <Paper className={classes.paper}>

                        <Grid container style={{marginBottom: 15}}>
                            <Grid item xs = {1}>
                                <Link to="/dashboard" style={{ textDecoration: 'none', color: "inherit" }}>
                                    <IconButton >
                                        <ArrowBackIcon/>
                                    </IconButton>
                                </Link>

                            </Grid>
                            <Grid container item xs={11} justify={"center"}>
                                <Typography component="h1" variant="h4" align="center">
                                    Your profile
                                </Typography>
                            </Grid>
                        </Grid>
                        <Collapse in={alert}>
                            <Alert severity={status.type}
                                   action={
                                       <IconButton
                                           aria-label="close"
                                           color="inherit"
                                           size="small"
                                           onClick={() => {
                                               setAlert(false);
                                           }}
                                       >
                                           <CloseIcon fontSize="inherit" />
                                       </IconButton>
                                   }>
                                {status.content}
                            </Alert>
                        </Collapse>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="firstName"
                                    name="firstName"
                                    label="First name"
                                    fullWidth
                                    defaultValue={loginState.user.firstName}
                                    onChange={(e) => setLoginState({...loginState,
                                        user: {...loginState.user,firstName: e.target.value}})}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="lastName"
                                    name="lastName"
                                    label="Last name"
                                    fullWidth
                                    defaultValue={loginState.user.lastName}
                                    onChange={(e) => setLoginState({...loginState,
                                        user: {...loginState.user,lastName: e.target.value}})}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="address1"
                                    name="address1"
                                    label="Username"
                                    fullWidth
                                    disabled
                                    defaultValue={loginState.user.username}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="address2"
                                    name="address2"
                                    label="Email"
                                    fullWidth
                                    defaultValue={loginState.user.email}
                                    onChange={(e) => setLoginState({...loginState,
                                        user: {...loginState.user, email: e.target.value}})}
                                />
                            </Grid>
                            <Grid container item justify={"space-between"} alignContent={"flex-end"}>
                                <Link to="/users/changePassword" style={{ textDecoration: 'none', color: "inherit" }}>
                                    <Button className={classes.button} size="large" variant="contained" color="primary">
                                        Change password
                                    </Button>
                                </Link>
                                <Button className={classes.button} size="large" variant="contained" color="primary"
                                        onClick={handleSaveProfile}>
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            </React.Fragment>
        );
    }
    else
    {
        return(<React.Fragment/>);
    }

}