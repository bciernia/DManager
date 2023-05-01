import {useCallback, useEffect, useMemo, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Box, Button, Grid, List, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";
import classes from './AllCharacters.module.css';
import CharacterDetails from "../CharacterDetails/CharacterDetails";
import Spinner from "../../../UI/Spinner/Spinner";

const TeamDetails = props => {
    const params = useParams();
    const navigate = useNavigate();
    const teamId = params.teamId;

    const [isLoading, setIsLoading] = useState(false);
    const [charactersArray, setCharactersArray] = useState([]);
    const [chosenCharacter, setChosenCharacter] = useState();

    const getAllCharacters = () => {
        setIsLoading(true);

        fetch(`http://127.0.0.1:3000/characters/all`)
            .then(res => res.json())
            .then(data => setCharactersArray(data))
            .finally(() => {
                setIsLoading(false);
            });
    };

    const showCharacterDetails = (characterId) => {
        setIsLoading(true);

        fetch(`http://127.0.0.1:3000/characters/${characterId}`)
            .then(res => res.json())
            .then(data => setChosenCharacter(data))
            .finally(() => {
                setIsLoading(false);
            })
    };

    useEffect(() => {
        getAllCharacters();
    }, []);

    const createPlayerCharacter = () => {
        navigate('newCharacter/playerCharacter')
    }
    const createNpc = () => {
        navigate('newCharacter/npc')
    }
    const createMonster = () => {
        navigate('newCharacter/monster')
    }
    const createBeast = () => {
        navigate('newCharacter/beast')
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
                        onClick={createBeast}>Create
                    beast</Button>
            </div>
            <Grid container>
                <Grid item md={2} sx={{display: "flex", flexDirection: "column"}}>
                    <Box sx={{width: "100%", margin: "0.5rem 0"}}>
                        <nav>
                            <Typography variant="h4" textAlign="center">Character list</Typography>
                            <List sx={{
                                height: "35rem",
                                overflow: "auto",
                                border: "solid 2px",
                            }}>
                                {isLoading && <Spinner/>}
                                {charactersArray.length === 0 &&
                                    <Typography variant="h6" textAlign="center">No characters</Typography>}
                                {charactersArray.map(character =>
                                    <ListItem key={character._id} disablePadding>
                                        <ListItemButton sx={{textAlign: "center"}}
                                                        onClick={() => showCharacterDetails(character._id)}>
                                            <ListItemText primary={character.characterName}
                                                          secondary={character.characterType}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                )}
                            </List>
                        </nav>
                    </Box>
                </Grid>
                <Grid item md={10}>
                    <Box sx={{height: "50rem", width: "100%"}}>
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

export default TeamDetails;