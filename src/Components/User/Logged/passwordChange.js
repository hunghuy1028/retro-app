import Typography from "@material-ui/core/Typography";
import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import {IconButton} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Redirect, Link} from "react-router-dom";
import MyAppBar from "../../App/header";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import Collapse from "@material-ui/core/Collapse";
import {changePassword} from "../service/updateService";
import {logoutService} from "../service/authService";

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
        marginRight: theme.spacing(2),
        backgroundColor: "#2CB895",
        color:"#fff",
        "&:hover": {
            backgroundColor: "#239478",
            color: "#ffffff",
        }
    }

}));


export default function PasswordChange()
{
    const classes = useStyles();
    const [newData, setNewData] = useState({oldPassword: "", newPassword: "", confirmPassword: ""});
    const [status, setStatus] = useState({type: "error", content:""});
    const [alert, setAlert] = useState(false);
    const [isLogin, setLogin] = useState(true);

    const handleSavePassword = async () =>
    {
        const p1 = newData.oldPassword, p2 = newData.newPassword, p3 = newData.confirmPassword;
        if(p1.length < 6 || p2.length < 6 || p3.length < 6)
        {
            setStatus({type: "error", content: "Password must at least 6 characters"});
            setAlert(true);
        }
        else if(p2 !== p3)
        {
            setStatus({type: "error", content: "Password and confirm password not match"});
            setAlert(true);
        }
        else if(p1 === p2)
        {
            setStatus({type: "error", content: "Current password and new password need to different"});
            setAlert(true);
        }
        else
        {
            const res = await changePassword(p1, p2);
            if(res.data.err)
            {
                setStatus({type: "error", content: res.data.err});
                setAlert(true);
            }
            else
            {
                logoutService();
                setLogin(false);
            }
        }
    }

    if(!isLogin) return (<Redirect to={{pathname: "/login", success: "Change password success, please login again!"}}/>)

    return (
        <React.Fragment>
            <MyAppBar/>
            <div className={classes.layout}>
                <Paper className={classes.paper}>
                    <Grid container style={{marginBottom: 15}}>
                        <Grid item xs = {1}>
                            <Link to="/users/profile" style={{ textDecoration: 'none', color: "inherit" }}>
                                <IconButton>
                                    <ArrowBackIcon/>
                                </IconButton>
                            </Link>

                        </Grid>
                        <Grid container item xs={11} justify={"center"}>
                            <Typography component="h1" variant="h4" align="center">
                                Change Password
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
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="currentPassword"
                                name="currentPassword"
                                label="Current Password"
                                fullWidth
                                type={"password"}
                                onChange={(e) => setNewData({...newData, oldPassword: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="newPassword"
                                name="newPassword"
                                label="New Password"
                                fullWidth
                                type={"password"}
                                onChange={(e) => setNewData({...newData, newPassword: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="confirmPassword"
                                name="confirmPassword"
                                label="Confirm Password"
                                fullWidth
                                type={"password"}
                                onChange={(e) => setNewData({...newData, confirmPassword: e.target.value})}
                            />
                        </Grid>
                        <Grid container justify={"flex-end"} >
                            <Button className={classes.button} size="large" variant="contained" color="primary"
                                    onClick={handleSavePassword}>
                                Save
                            </Button>
                        </Grid>

                    </Grid>

                </Paper>
            </div>
        </React.Fragment>

    );
}