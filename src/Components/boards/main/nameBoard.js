import React, {useState} from "react";
import Box from "@material-ui/core/Box";
import {Typography} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {saveNameBoard} from "./boardService";

const useStyles = makeStyles((theme) => ({
    nameBoard: {
        marginBottom: "20px"
    },
    typography: {
        paddingRight: "30px",
        fontSize: "24px"
    },
    icon: {
        marginBottom: "10px"
    },
    buttonSave: {
        backgroundColor: "#00c853",
        color: "#ffffff",
        "&:hover": {
            backgroundColor: "#00c853",
            color: "#ffffff",
        }
    },
    buttonClose: {
        color: "#2196f3"
    },
    textField:{
        marginBottom: 10,
        marginRight: 10,
        width: "50%"
    }


}));

export default function NameBoard({nameBoard, id, handleRenameBoard})
{
    const [isEditingNameBoard, setIsEditingNameBoard] = useState(false);
    const [value, setValue] = useState(nameBoard);
    const classes = useStyles();

    const handleClick = () =>
    {
        setIsEditingNameBoard(!isEditingNameBoard);
    }

    const handleSave = async  () =>
    {
        if(value.length === 0 )
        {
            setValue(nameBoard);
        }
        else {
            const res = await saveNameBoard(id, value);
            if(res) handleRenameBoard(value);
        }
        setIsEditingNameBoard(false);
    }

    const handleClose = () =>
    {
        setValue(nameBoard);
        setIsEditingNameBoard(false);
    }

    const renderNameBoard = () => {
        if (isEditingNameBoard)
        {
            return (
                <div style={{marginBottom: 10}}>
                    <TextField
                        defaultValue={nameBoard}
                        required
                        variant="standard"
                        onChange={(e) => setValue(e.target.value)}
                        className={classes.textField}
                        inputProps={{
                            style:{
                                fontSize: "20px"
                            }
                        }}
                    />
                    <Button className={classes.buttonSave}
                            onClick={handleSave}>
                        Save
                    </Button>
                    <Button className={classes.buttonClose}
                            onClick={handleClose}>
                        Cancel
                    </Button>
                </div>
            )
        }
        else {
            return (
                <Box className={classes.nameBoard}>
                    <Typography variant="h5" display="inline" className={classes.typography}>
                        {value}
                    </Typography>
                    <IconButton size={"small"}  className={classes.icon} onClick={handleClick}>
                        <EditIcon fontSize={"inherit"} style={{fontSize: "15px"}}/>
                    </IconButton>
                </Box>
            )
        }
    }

    return(renderNameBoard());

}