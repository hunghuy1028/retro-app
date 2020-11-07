import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Redirect, Link} from "react-router-dom";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import {checkLoginService, loginService} from "./service/authService";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
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
    },
}));

export default function SignIn() {
    const [input, setInput] = useState({
        user: "",
        password: "",
        error: "",
    });
    const [error, setError] = useState("");
    const [alert, setAlert] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    useEffect(()=>{
        const fetchAuthen = async () => {
            const res = await checkLoginService();
            if(res) setIsLogin(true);
        }
        fetchAuthen();
    },[])


    const classes = useStyles();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(input.user.length === 0 || input.password.length === 0)
        {
            setError("Please enter username or password")
            setAlert(true);
        }
        else {
            const res = await loginService(input.user, input.password);
            console.log(res);
            if(res.msg)
            {
                setError(res.msg)
                setAlert(true);
            }
            else
            {
                //direct
                setIsLogin(true);
            }
        }
    }

    if(isLogin) return(<Redirect to ="/users"/>);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Collapse in={alert}>
                    <Alert severity={"error"}
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
                        {error}
                    </Alert>
                </Collapse>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
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
                        autoComplete="current-password"
                        onChange={(e)=>
                            setInput({...input, password: e.target.value})}
                    />
                    {/*<FormControlLabel*/}
                    {/*    control={<Checkbox value="remember" color="primary" />}*/}
                    {/*    label="Remember me"*/}
                    {/*/>*/}
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
                    <Grid container>
                        <Grid item xs>
                            <Link to="/login" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/signup" variant="body2">
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            {/*<Box mt={8}>*/}
            {/*    <Copyright />*/}
            {/*</Box>*/}
        </Container>
    );
}