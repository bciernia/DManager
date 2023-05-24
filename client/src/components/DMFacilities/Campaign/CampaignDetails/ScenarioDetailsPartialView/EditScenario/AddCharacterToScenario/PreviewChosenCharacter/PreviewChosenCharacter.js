import classes from './PreviewChosenCharacter.module.css';
import {Button, Card, Dialog, Divider, Typography} from "@mui/material";
import React, {useState} from "react";

const PreviewChosenCharacter = props => {
    const character = props.character;

    const [characterDetailsDialogOpen, setCharacterDetailsDialogOpen] = useState(false);

    const handleCharacterDetailsDialogClose = () => {
        setCharacterDetailsDialogOpen(false);
    };

    const handleCharacterDetailsDialogOpen = () => {
        setCharacterDetailsDialogOpen(true);
    };

    return (
        <>
            <Dialog onClose={handleCharacterDetailsDialogClose} open={characterDetailsDialogOpen} maxWidth="md">

            </Dialog>
            <Card sx={{padding: ".5rem .5rem"}}>
                <div className={classes["img-container"]}>
                    <img src={character.characterPhoto} alt="Character photo" className={classes["character-photo"]}/>
                </div>
                <Divider/>
                <Typography>{character.characterName}</Typography>

                <Button>Add</Button>
                <Button onClick={handleCharacterDetailsDialogOpen}>Details</Button>
            </Card>
        </>
    )
}

export default PreviewChosenCharacter;
