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
            <Box sx={{width: "75rem", height: "50rem", margin: "auto"}}>
                {isLoading && <Spinner/>}
                <Grid container spacing={2}>
                    <Grid item md={9} sx={{backgroundColor: "red", minHeight: "20rem"}}>
                        <Typography variant="h4">{character.characterName}</Typography>
                        <Typography variant="h4">{character.characterType}</Typography>
                        <Typography variant="h4">{character.characterClass}</Typography>
                        <Typography variant="h4">{character.characterRace || "No race"}</Typography>

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