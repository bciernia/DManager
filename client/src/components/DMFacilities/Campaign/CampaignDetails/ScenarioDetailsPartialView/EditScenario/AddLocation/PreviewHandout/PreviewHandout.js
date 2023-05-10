import {Card, Dialog, Typography} from "@mui/material";
import React, {useState} from "react";

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
        <div>
            <Dialog onClose={handleClose} open={dialogOpen} maxWidth="md">
                <Card sx={{height: "20rem", width: "12.5rem"}}>
                    {handout.handoutPhoto}
                    <Typography>{handout.handoutName}</Typography>
                    <Typography> {handout.handoutDescription}</Typography>
                    <Typography>{handout.handoutLocation}</Typography>
                </Card>
            </Dialog>
            <Card onClick={previewHandout} sx={{height: "1.5rem", margin: ".5rem 0", textAlign: "center"}}>
                {handout.handoutName}
            </Card>
        </div>

    )
}

export default PreviewHandout;