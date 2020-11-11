import React, {useEffect, useState} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {logoutService} from "../User/service/authService";
import callAPI from "../../util/callAPI";

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props: MenuProps) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

export default function MyAppBar()
{
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [loginState, setLoginState] = useState({isLogin: false, user: null});

    useEffect(() => {
        const fetchData = async () =>
        {
            const res = await callAPI("GET", "users/profile",null);
            if(res.data.err)
            {
                setLoginState({isLogin: false, user: null})
            }
            else
            {
                setLoginState({isLogin: true, user: res.data.user})
            }
        }
        fetchData();

    }, [])


    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () =>
    {
        logoutService();
        setLoginState({isLogin: false, user: null});
        handleClose();
    }

    if(loginState.isLogin)
    {
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h5" className={classes.title}>
                            <Link to="/" style={{ textDecoration: 'none', color: "inherit" }}>
                                Retro
                            </Link>
                        </Typography>
                        <div style={{display: loginState.isLogin ? "block" : "none"}}>
                            <Button
                                aria-controls="customized-menu"
                                aria-haspopup="true"
                                variant="contained"
                                color="primary"
                                onClick={handleClick}
                            >
                                {loginState.user ? `Hi, ${loginState.user.lastName}` : "Hi"}
                            </Button>
                            <StyledMenu
                                id="customized-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                {/*<StyledMenuItem onClick={handleClose}>*/}
                                {/*    <Typography>{loginState.user.username}</Typography>*/}
                                {/*</StyledMenuItem>*/}
                                <Link to="/users/profile" style={{ textDecoration: 'none', color: "inherit" }}>
                                    <StyledMenuItem onClick={handleClose}>
                                        <ListItemIcon>
                                            <AccountCircleIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="Profile" />
                                    </StyledMenuItem>
                                </Link>
                                <Link to="/login" style={{ textDecoration: 'none', color: "inherit" }}>
                                    <StyledMenuItem onClick={handleLogout}>
                                        <ListItemIcon>
                                            <ExitToAppIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="Logout" />
                                    </StyledMenuItem>
                                </Link>

                            </StyledMenu>
                        </div>

                    </Toolbar>
                </AppBar>
            </div>
        );
    }
    else {
        return (<React.Fragment/>)
    }

}