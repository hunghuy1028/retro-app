import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import callAPI from "../../util/callAPI";

export default function NewBoard({open, handleAddBoard, handleClose}) {

    const [contentTextField, setContentTextField] = useState("");

    const addingNewBoard = async () =>
    {
        if(contentTextField.length > 0)
        {
            const res = await callAPI("POST", "users/newBoard", {contentTextField});
            handleAddBoard(contentTextField, res.data);
            handleClose();
        }
        else {
            handleClose();
        }
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Adding a new board</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To adding a new board, please enter name of board first.
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        id="name"
                        label="Name"
                        fullWidth
                        autoComplete={"off"}
                        onChange={(e) => {setContentTextField(e.target.value)}}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={addingNewBoard} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
