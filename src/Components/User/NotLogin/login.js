import React, {useEffect, useState} from 'react';
import {Avatar, Button, Container, IconButton,
    Collapse, CssBaseline, TextField, Grid, Typography}  from '@material-ui/core';
import { makeStyles, createMuiTheme, ThemeProvider  } from '@material-ui/core/styles';
import {Redirect, Link} from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import MyAppBar from "../../App/header";
import Alert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CloseIcon from '@material-ui/icons/Close';
import FacebookIcon from '@material-ui/icons/Facebook';
import {checkLoginService, getCurrentUser, loginService} from "../service/authService";
import {FacebookLoginService, GoogleLoginService} from "../service/thirdPartyLoginService";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        color: "#fff"
    },
}));

const myTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#2CB895"
        },
    },
})

export default function SignIn({location}) {
    const [input, setInput] = useState({
        user: "",
        password: "",
        error: "",
    });
    const [status, setStatus] = useState({type: "error", content:""});
    const [alert, setAlert] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const classes = useStyles();

    useEffect(()=>{
        const fetchAuthen = async () => {
            if(getCurrentUser())
            {
                const res = await checkLoginService();
                if(res) setIsLogin(true);
            }
            else {
                setIsLogin(false);
            }
        }
        fetchAuthen();
        if(location.location.err)
        {
            setStatus({type:"error", content: location.location.err})
            setAlert(true);
        }
        else if (location.location.success)
        {
            setStatus({type:"success", content: location.location.success})
            setAlert(true);
        }
    },[location.location])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(input.user.length === 0 || input.password.length === 0)
        {
            setStatus({type: "error", content: "Please enter username or password"})
            setAlert(true);
        }
        else {
            const res = await loginService(input.user, input.password);

            if(res.error)
            {
                setStatus({type: "error", content: res.error})
                setAlert(true);
            }
            else
            {
                //direct
                setIsLogin(true);
            }
        }
    }

    const responseGoogle = async (response) => {
        if(!response.err)
        {
            const res = await GoogleLoginService(response.tokenId);
            if(res.error)
            {
                setStatus({type: "error", content: res.error})
                setAlert(true);
            }
            else
            {
                //direct
                setIsLogin(true);
            }
        }
        else {
            setStatus({type: "error", content: response.err});
            setAlert(true);
        }
    }

    const responseFacebook = async (response) => {
        console.log(response)
        if(!response.err)
        {
            const res = await FacebookLoginService(response.accessToken, response.userID);
            if(res.error)
            {
                setStatus({type: "error", content: res.error})
                setAlert(true);
            }
            else
            {
                //direct
                setIsLogin(true);
            }
        }
        else {
            setStatus({type: "error", content: response.err});
            setAlert(true);
        }
    }

    if(isLogin) return(<Redirect to ="/dashboard"/>);

    return (
        <div>
            <MyAppBar/>
            <ThemeProvider theme={myTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
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
                               }
                        >
                            {status.content}
                        </Alert>
                    </Collapse>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Username"
                            name="username"
                            autoFocus
                            onChange={(e) =>
                                setInput({...input, user: e.target.value})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={(e)=>
                                setInput({...input, password: e.target.value})}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={(e) => handleSubmit(e)}
                        >
                            Sign In
                        </Button>
                        <Grid container justify="space-between" alignContent="center">
                            <Grid item xs={12} sm={6}>
                                <GoogleLogin
                                    clientId="682680851043-22m1a87uc6lp6ab7cj4f6bcesp07noo5.apps.googleusercontent.com"
                                    buttonText="Login with Google"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FacebookLogin
                                    appId="369890444269182"
                                    autoLoad={false}
                                    callback={responseFacebook}
                                    render={renderProps => (
                                        <Button
                                            onClick={renderProps.onClick}
                                            variant="contained"
                                            startIcon={<FacebookIcon style={{ color: "blue" }} />}
                                            style={{backgroundColor: "#fff", textTransform:"none",
                                                height: 42 }}
                                        >
                                            Login with Facebook
                                        </Button>
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <Grid container style={{marginTop: 10}}>
                            <Grid item xs>
                                <Link to="/login" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/signup" variant="body2">
                                    Don't have an account? Register
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
            </ThemeProvider>
        </div>

    );
}