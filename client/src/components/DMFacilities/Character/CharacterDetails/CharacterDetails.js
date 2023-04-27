import {Avatar, Box, Button, Grid, Typography} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Spinner from "../../../UI/Spinner/Spinner";
import classes from "./CharacterDetails.module.css";

const CharacterDetails = props => {
    const params = useParams();
    const characterId = params.characterId;

    const [character, setCharacter] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        fetch(`http://127.0.0.1:3000/character/${characterId}`)
            .then(res => res.json())
            .then(data => setCharacter(data))
            .finally(() => {
                console.log(character);
                setIsLoading(false);
            });
    }, []);

    //TODO finish character details page

    return (
        <div>
            <Box sx={{width: "75rem", height: "50rem", margin: "2rem auto"}}>
                {isLoading && <Spinner/>}
                <Grid container spacing={2}>
                    <Grid item md={3} sx={{minHeight: "20rem"}}>
                        <Typography variant="h4">{character.characterName}</Typography>
                        <Typography variant="h4">{character.characterType}</Typography>
                        <Typography variant="h4">{character.characterClass}</Typography>
                        <Typography variant="h4">{character.characterRace}</Typography>
                        <Typography variant="h4">{character.characterAlignment}</Typography>
                    </Grid>
                    <Grid item md={3} sx={{minHeight: "20rem"}}>
                        <Grid container spacing={2} sx={{
                            height: "100%",
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Typography variant="h3" sx={{marginLeft: "1rem"}}>Statistics</Typography>
                            <Grid item md={6} sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}><Typography display="inline">STR<Typography variant="h4" display="inline"><b> {character.characterStrength}</b></Typography></Typography></Grid>
                            <Grid item md={6} sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}><Typography display="inline">DEX<Typography variant="h4" display="inline"><b> {character.characterDexterity}</b></Typography></Typography></Grid>
                            <Grid item md={6} sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}><Typography display="inline">CON<Typography variant="h4"
                                                                           display="inline"><b> {character.characterConstitution}</b></Typography></Typography></Grid>
                            <Grid item md={6} sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}><Typography display="inline">INT<Typography variant="h4" display="inline"><b> {character.characterIntelligence}</b></Typography></Typography></Grid>
                            <Grid item md={6} sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}><Typography display="inline">WIS<Typography variant="h4" display="inline"><b> {character.characterWisdom}</b></Typography></Typography></Grid>
                            <Grid item md={6} sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}><Typography display="inline">CHA<Typography variant="h4"
                                                                           display="inline"><b> {character.characterCharisma}</b></Typography></Typography></Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={3} sx={{minHeight: "20rem"}}>

                    </Grid>
                    <Grid item md={3} sx={{minHeight: "20rem", position: "relative"}}>
                        <Avatar src={character.characterPhoto}
                                sx={{position: "relative", left: "2.5rem", width: '15rem', height: '15rem'}}/>
                    </Grid>
                    <Grid item md={12} sx={{backgroundColor: "blue", minHeight: "20rem"}}></Grid>
                </Grid>

            </Box>
            <Button> <Link sx={{textDecoration: "none"}} to="../../" relative="path">Go back to summary</Link></Button>
        </div>
    )
}

export default CharacterDetails;