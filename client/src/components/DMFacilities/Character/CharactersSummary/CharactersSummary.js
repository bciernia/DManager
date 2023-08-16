import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Button, Grid, List, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";
import classes from './CharactersSummary.module.css';
import CharacterDetails from "../CharacterDetails/CharacterDetails";
import Spinner from "../../../UI/Spinner/Spinner";
import {LoadingButton} from "@mui/lab";

const getAllCharacters = () =>
    fetch(`http://127.0.0.1:3000/characters/all`)
        .then(res => res.json())

const CharactersSummary = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [charactersArray, setCharactersArray] = useState([]);
    const [chosenCharacter, setChosenCharacter] = useState();
    const [deletedCharactersIds, setDeletedCharactersIds] = useState([]);

    const showCharacterDetails = (characterId) => {
        setChosenCharacter(charactersArray.find(character => character._id === characterId));
    };

    const deleteCharacter = (characterId) => {
        setDeletedCharactersIds((deletedCharactersIds) => [...deletedCharactersIds, characterId]);

        fetch(`http://127.0.0.1:3000/characters/${characterId}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
            },
        }).then(res => {
            console.log(res);
            setCharactersArray((characters) => characters.filter(item => item._id !== characterId))
        }).finally(() => {
            setDeletedCharactersIds((deletedCharactersIds) => deletedCharactersIds.filter(item => item._id !== characterId))
        });
    };

    useEffect(() => {
        getAllCharacters()
            .then((characters) => {
                setCharactersArray(characters);
                setChosenCharacter(characters[0]);
                setIsLoading(false);
            })
    }, []);

    useEffect(() => {
        if (chosenCharacter) return;

        setChosenCharacter(charactersArray[0]);
    }, [charactersArray]);

    const createPlayerCharacter = () => {
        navigate('newCharacter/playerCharacter')
    }
    const createNpc = () => {
        navigate('newCharacter/npc')
    }
    const createMonster = () => {
        navigate('newCharacter/monster')
    }

    const createSimpleNPC = () => {
        navigate('newCharacter/simpleNpc')
    }

    return (
        <div className={classes.container}>
            <div>
                <Button sx={{backgroundColor: "#F5793B", margin: "0 .5rem 0 0"}} variant="contained" color="inherit"
                        onClick={createPlayerCharacter}>Create player character</Button>
                <Button sx={{backgroundColor: "#F5793B", margin: "0 .5rem 0 0"}} variant="contained" color="inherit"
                        onClick={createNpc}>Create
                    npc</Button>
                <Button sx={{backgroundColor: "#F5793B", margin: "0 .5rem 0 0"}} variant="contained" color="inherit"
                        onClick={createMonster}>Create
                    monster</Button>
                <Button sx={{backgroundColor: "#F5793B", margin: "0 .5rem 0 0"}} variant="contained" color="inherit"
                        onClick={createSimpleNPC}>Create simple NPC</Button>
            </div>
            <Grid container>
                <Grid item md={2} sx={{display: "flex", flexDirection: "column"}}>
                    <Box sx={{width: "100%", margin: "0.5rem 0"}}>
                        <nav>
                            <Typography variant="h4" textAlign="center">Character list</Typography>
                            <List sx={{
                                height: "27.5rem",
                                overflow: "auto",
                                border: "solid 2px",
                            }}>
                                {isLoading && <Spinner/>}
                                {charactersArray.length === 0 &&
                                    <Typography variant="h6" textAlign="center">No characters</Typography>}
                                {charactersArray.sort((a,b) => (a.characterName > b.characterName) ? 1 : -1).map(character =>
                                    <ListItem key={character._id} disablePadding>
                                        <ListItemButton sx={{textAlign: "center"}}
                                                        onClick={() => showCharacterDetails(character._id)}>
                                            <ListItemText primary={character.characterName}
                                                          secondary={character.characterType}
                                            />
                                        </ListItemButton>

                                        <LoadingButton loading={deletedCharactersIds.includes(character._id)}
                                                       variant="contained"
                                                       onClick={() => deleteCharacter(character._id)}>Delete</LoadingButton>
                                    </ListItem>
                                )}
                            </List>
                        </nav>
                        <div className={classes["character--filters"]}>
                            <Typography>FILTER PANEL</Typography>
                        </div>
                    </Box>
                </Grid>
                <Grid item md={10}>
                    <Box sx={{height: "50rem", width: "100%"}}>
                        {isLoading && <Spinner/>}
                        {!chosenCharacter ? (
                                <Typography sx={{display: "flex", justifyContent: "center"}} variant="h2">Choose one of
                                    yours characters to display</Typography>) :
                            (
                                 <CharacterDetails character={chosenCharacter}/>
                            )}
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default CharactersSummary;