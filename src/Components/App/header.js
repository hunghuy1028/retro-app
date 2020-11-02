import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    title: {
        flexGrow: 1,
    }
}}));


export default function MyAppBar()
{
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute">
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Retro
                    </Typography>
                    <IconButton color="inherit">
                        <AccountCircleIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    )
}