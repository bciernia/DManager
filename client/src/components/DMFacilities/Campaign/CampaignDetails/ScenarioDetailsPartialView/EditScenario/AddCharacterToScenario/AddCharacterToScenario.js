import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, Grid, List, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";
import classes from './AddCharacterToScenario.module.css';
import PreviewChosenCharacter from "./PreviewChosenCharacter/PreviewChosenCharacter";
import {v4 as uuid} from 'uuid';

//TODO get all characters except PC -> they have to be chosen to whole scenario
const getAllCharacters = () =>
    fetch(`http://127.0.0.1:3000/characters/all`)
        .then(res => res.json());

const getCharactersForScenario = (scenarioId) =>
    fetch(`http://127.0.0.1:3000/dm/scenario/${scenarioId}/characters/all`)
        .then(res => res.json());

const updateCharactersInScenario = (scenarioId, characters) => fetch(`http://127.0.0.1:3000/dm/scenario/${scenarioId}/updateCharacters`, {
    method: "PUT",
    headers: {
        "Content-type": "application/json",
    },
    body: JSON.stringify(characters)
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
    const [chosenCharactersToScenario, setChosenCharactersToScenario] = useState([]);

    const characterDescriptionForScenarioRef = useRef('');

    useEffect(() => {
        Promise.all([
            getAllCharacters(),
            getCharactersForScenario(scenarioId),
        ])
            .then(([allCharacters, scenarioCharacters]) => {
                setAllCharacters(allCharacters);
                if (allCharacters[0]) {
                    setChosenCharacter(allCharacters[0]);
                }
                setChosenCharactersToScenario(scenarioCharacters);
                setChosenCharactersToScenario(scenarioCharacters => scenarioCharacters.map(character => ({...character, tempId: uuid()})));
            });
    }, []);

    const updateCharacters = async () => {
        const updatedIdsOfCharactersInScenario = chosenCharactersToScenario.map(({_id}) => _id);

        updateCharactersInScenario(scenarioId, updatedIdsOfCharactersInScenario)
            .then(() => navigate(`/dm/campaign/${campaignId}/scenario/${scenarioId}/edit`));
    }

    const addCharacterToScenario = () => {
        const newCharacter = {
            ...chosenCharacter,
            tempId: uuid(),
        }
        setChosenCharactersToScenario(characters => [...characters, newCharacter]);
        characterDescriptionForScenarioRef.current.value = '';
    }

    const removeCharacterFromScenario = (chosenCharacterTempId) => {
        setChosenCharactersToScenario(characters => characters.filter(character => character.tempId !== chosenCharacterTempId));
    }

    return (
        <div>
            <Button variant="contained"
                    sx={{backgroundColor: "#F5793B", position: "absolute", top: "7.5rem", right: "2rem"}}
                    color="inherit" onClick={updateCharacters}>Update characters</Button>
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
                    <PreviewChosenCharacter character={chosenCharacter}
                                            addCharacterToScenario={addCharacterToScenario}/>
                    <div>
                        <TextField sx={{width: "100%", marginTop: ".5rem"}} type="text" inputProps={{maxLength: 1000}}
                                   multiline
                                   rows={5} label="Description for scenario"
                                   required
                                   inputRef={characterDescriptionForScenarioRef}/>
                    </div>
                </Grid>
                <Grid item md={5}>
                    <div className={classes.container}>
                        <Typography variant="h5">Scenario characters</Typography>
                        <List sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                        }}>
                            {chosenCharactersToScenario?.length === 0 &&
                                <Typography variant="h6" textAlign="center">No characters</Typography>}
                            {chosenCharactersToScenario.map((character) =>
                                <ListItem key={character.tempId} sx={{margin: ".25rem"}} disablePadding>
                                    <Card sx={{backgroundColor: "whitesmoke", minWidth: 320}}>
                                        <ListItem onClick={() => setChosenCharacter(character)}
                                                  sx={{textAlign: "center"}}>
                                            <ListItemText primary={<Typography
                                                variant="body2">{character.characterName}</Typography>}/>
                                            <Button variant="contained" color="error"
                                                    onClick={() => removeCharacterFromScenario(character.tempId)}>REMOVE</Button>
                                        </ListItem>
                                    </Card>
                                </ListItem>
                            )}
                        </List>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default AddCharacterToScenario;