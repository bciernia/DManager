import classes from './PreviewChosenCharacter.module.css';
import {Button, Card, Dialog, Divider, Typography} from "@mui/material";
import React, {useState} from "react";
import CharacterDetails from "../../../../../../Character/CharacterDetails/CharacterDetails";

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
            <Dialog onClose={handleCharacterDetailsDialogClose} open={characterDetailsDialogOpen} maxWidth="lg">
                {/*TODO finish character details preview*/}
                <CharacterDetails character={character} />
            </Dialog>
            <Card sx={{padding: ".5rem .5rem"}}>
                <div className={classes["img-container"]}>
                    <img src={character.characterPhoto} alt="Character photo" className={classes["character-photo"]}/>
                </div>
                <Divider/>
                <Typography>{character.characterName}</Typography>

                <div className={classes["container-btns"]}>
                    <Button variant="contained" sx={{margin: ".25rem", width: "5rem", backgroundColor: "#F5793B"}} color="inherit" onClick={handleCharacterDetailsDialogOpen}>Details</Button>
                    <Button variant="contained" sx={{margin: ".25rem", width: "5rem"}} color="success" onClick={props.addCharacterToScenario}>Add</Button>
                </div>
            </Card>
        </>
    )
}

export default PreviewChosenCharacter;
