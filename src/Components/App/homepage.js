import React from "react";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import MyAppBar from "./header";
import {Grid} from "@material-ui/core";
// import picture from "./resource/9814.jpg"

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',

    },
    main: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(2),
    },
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
    button:{
        fontSize: 20,
        textTransform: "none",
        backgroundColor: "#2CB895",
        width: 200,
        color: "#fff",
        borderRadius: 25,
        margin: 10,
        "&:hover": {
            backgroundColor: "#239478",
            color: "#ffffff",
        }
    }
}));

export default function HomePage()
{
    const classes = useStyles();
    return(
        <React.Fragment>
            <MyAppBar/>
            <div className={classes.root} >
                <Container component="main" className={classes.main}>
                    <Grid container  justify="center" alignContent="center">
                        <Grid container direction="column">
                            <Grid container item style={{marginBottom: 20}}>
                                <Typography variant="h3" component="h1" gutterBottom style={{fontWeight: "bold"}}>
                                    Welcome to Retro App
                                </Typography>
                            </Grid>
                            <Grid container item xs ={12} sm={4}>
                                <Typography variant="h6" component="h2" gutterBottom style={{marginBottom: 10}}>
                                    {'Simple to create, edit and cooperate your board with teammate'}
                                </Typography>
                                <Typography variant="h6" component="h2" gutterBottom>
                                    {'You can start with'}
                                </Typography>
                            </Grid>
                            <Grid container item xs={6}>
                                <Grid item>
                                    <Link to="/login" style={{ textDecoration: 'none', color: "inherit" }}>
                                        <Button className={classes.button}>
                                            Login
                                        </Button>
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link to="/signup" style={{ textDecoration: 'none', color: "inherit" }}>
                                        <Button className={classes.button} >
                                            Or register
                                        </Button>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>


                </Container>
            </div>


        </React.Fragment>

    )
}