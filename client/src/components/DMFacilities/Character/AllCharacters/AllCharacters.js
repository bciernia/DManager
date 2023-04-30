import Character from "../Character";
import {useEffect, useState} from "react";
import Spinner from "../../../UI/Spinner/Spinner";
import {Link, useParams} from "react-router-dom";
import Wrapper from "../../../../utils/Wrapper";
import {Box, Button, Grid, List, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";
import classes from './AllCharacters.module.css';
import CampaignDetails from "../../Scenarios/CampaignDetails/CampaignDetails";
import CharacterDetails from "../CharacterDetails/CharacterDetails";

const TeamDetails = props => {
    const params = useParams();
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
    }

    const showCharacterDetails = (characterId) => {
        setIsLoading(true);

        fetch(`http://127.0.0.1:3000/characters/${characterId}`)
            .then(res => res.json())
            .then(data => setChosenCharacter(data))
            .finally(() => {
                setIsLoading(false);
            })
    }

    useEffect(() => {
        getAllCharacters();
    }, []);

    const test = () => {
        alert(charactersArray);
    }

    return (
        <Wrapper>
            <div className={classes.container}>
                <Button sx={{backgroundColor: "#F5793B"}} variant="contained" color="inherit" onClick={test}>Create player character</Button>
                <Button sx={{backgroundColor: "#F5793B"}} variant="contained" color="inherit">Create npc</Button>
                <Button sx={{backgroundColor: "#F5793B"}} variant="contained" color="inherit">Create monster</Button>
                <Button sx={{backgroundColor: "#F5793B"}} variant="contained" color="inherit">Create animal</Button>
            </div>
            <Grid container>
                <Grid item md={2} sx={{display: "flex", flexDirection: "column", margin: "0.5rem"}}>
                    <Box sx={{width: "100%", margin: "0.5rem 0"}}>
                        <nav>
                            <Typography variant="h4" textAlign="center">Campaign list</Typography>
                            <List>
                                {charactersArray.length === 0 && <Typography variant="h6" textAlign="center">No campaigns</Typography>}
                                {charactersArray.map(character =>
                                    <ListItem disablePadding>
                                        <ListItemButton sx={{textAlign: "center"}} onClick={() => showCharacterDetails(character._id)}>
                                            <ListItemText primary={character.characterName} secondary={character.characterType}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                )}
                            </List>
                        </nav>
                    </Box>
                </Grid>
                <Grid item md={9}>
                    <Box sx={{height: "50rem", width: "100%"}}>
                        {!chosenCharacter ? (<Typography sx={{display:"flex", justifyContent:"center"}} variant="h2">Choose one of yours campaigns</Typography>) :
                            (
                                <CharacterDetails character={chosenCharacter} />
                            )}
                    </Box>
                </Grid>
            </Grid>
            {/*<Box sx={{display: 'flex', justifyContent: 'flex-start', flexDirection: 'row'}}>*/}
            {/*    {charactersArray.length === 0 && <p>No characters</p>}*/}
            {/*    {charactersArray.map(character => <Character key={character._id} teamId={teamId}*/}
            {/*                                                 character={character} rerenderCharacters={getAllCharacters}/>)}*/}
            {/*</Box>*/}
        </Wrapper>
    )
}

export default TeamDetails;