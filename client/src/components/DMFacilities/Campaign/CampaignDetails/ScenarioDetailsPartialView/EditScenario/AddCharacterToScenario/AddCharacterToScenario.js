import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Card, Grid, List, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";
import classes from './AddCharacterToScenario.module.css';
import PreviewChosenCharacter from "./PreviewChosenCharacter/PreviewChosenCharacter";

//TODO get all characters except PC -> they have to be chosen to whole scenario
const getAllCharacters = () =>
    fetch(`http://127.0.0.1:3000/characters/all`)
        .then(res => res.json());

const addHandoutToDb = (scenarioId, handout) => fetch(`http://127.0.0.1:3000/dm/scenario/${scenarioId}/newHandout`, {
    method: "POST",
    headers: {
        "Content-type": "application/json",
    },
    body: JSON.stringify(handout)
})
    .then(res => res.json());


const convertLocationsToSelectWithHeaders = (locations) => {
    const locationArray = [];

    for (let i = 0; i < locations.length; i++) {
        locationArray.push({
            id: locations[i]._id,
            name: locations[i].locationName,
            isHeader: true,
        })
        for (let j = 0; j < locations[i].locationRooms.length; j++) {
            locationArray.push({
                id: locations[i].locationRooms[j].roomId,
                name: locations[i].locationRooms[j].roomName,
            })
        }
    }

    return locationArray;
}

const AddCharacterToScenario = () => {
    const {campaignId, scenarioId} = useParams();

    const navigate = useNavigate();

    const [allCharacters, setAllCharacters] = useState([]);
    const [chosenCharacter, setChosenCharacter] = useState({});

    useEffect(() => {
        getAllCharacters()
            .then(data => {
                setAllCharacters(data);
                if(data[0]){
                    setChosenCharacter(data[0]);
                }
            });
    }, []);

    return (

        <div>
            <Typography variant="h4" sx={{display: "flex", justifyContent: "center", margin: "1rem 0"}}>Add characters
                to chosen scenario</Typography>
            <Grid container>
                <Grid item md={5}>
                    <div className={classes.container}>
                        <Typography variant="h5">All characters</Typography>
                        <List sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                        }}>
                            {allCharacters?.length === 0 &&
                                <Typography variant="h6" textAlign="center">No characters</Typography>}
                            {allCharacters.map((character) =>
                                <ListItem key={character._id} sx={{margin: ".25rem"}} disablePadding>
                                    <Card sx={{backgroundColor: "whitesmoke", minWidth: 320}}>
                                        <ListItemButton onClick={() => setChosenCharacter(character)}
                                                        sx={{textAlign: "center"}}>
                                            <ListItemText primary={<Typography
                                                variant="body2">{character.characterName}</Typography>}/>
                                        </ListItemButton>
                                    </Card>
                                </ListItem>
                            )}
                        </List>
                    </div>
                </Grid>
                <Grid item md={2}>
                    <PreviewChosenCharacter character={chosenCharacter}/>
                </Grid>
                <Grid item md={5}>
                    <div className={classes.container}>
                        <Typography variant="h5">Scenario characters</Typography>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default AddCharacterToScenario;