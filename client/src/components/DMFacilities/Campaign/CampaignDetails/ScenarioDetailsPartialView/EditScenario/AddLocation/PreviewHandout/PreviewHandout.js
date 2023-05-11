import {Card, Dialog, Divider, Typography} from "@mui/material";
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
                <Card sx={{height: "30rem", width: "20rem", padding: ".5rem"}}>
                    {handout.handoutPhoto ? (<div className={classes["handout--photo__container"]}><img src={handout.handoutPhoto} className={classes["handout--photo"]}/></div>) :
                        <Typography variant="body1" sx={{textAlign: "center", margin: "1rem 0", fontStyle: "italic"}}>No image</Typography>}
                    <Divider/>
                    <Typography variant="body1" sx={{marginTop: ".25rem"}}>{handout.handoutName}</Typography>
                    <Typography variant="body2" sx={{marginTop: ".5rem"}}> {handout.handoutDescription}</Typography>
                </Card>
            </Dialog>
            <span onClick={previewHandout} className={classes["handout--display"]}>
                {handout.handoutName}
            </span>
        </>
    )
}

export default PreviewHandout;