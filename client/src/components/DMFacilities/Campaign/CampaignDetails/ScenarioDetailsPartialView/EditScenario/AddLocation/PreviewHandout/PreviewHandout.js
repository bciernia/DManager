import {Card, Dialog, Typography} from "@mui/material";
import React, {useState} from "react";
import classes from "./PreviewHandout.module.css";

const PreviewHandout = props => {
    const handout = props.handout;

    const [dialogOpen, setDialogOpen] = useState(false);

    const previewHandout = () => {
        setDialogOpen(true);
    }

    const handleClose = () => {
        setDialogOpen(false);
    };

    //TODO finish handout preview

    return (
        <>
            <Dialog onClose={handleClose} open={dialogOpen} maxWidth="md">
                <Card sx={{height: "20rem", width: "12.5rem"}}>
                    {handout.handoutPhoto}
                    <Typography>{handout.handoutName}</Typography>
                    <Typography> {handout.handoutDescription}</Typography>
                    <Typography>{handout.handoutLocation}</Typography>
                </Card>
            </Dialog>
            <span onClick={previewHandout} className={classes["handout--display"]}>
                {handout.handoutName}
            </span>
        </>
    )
}

export default PreviewHandout;