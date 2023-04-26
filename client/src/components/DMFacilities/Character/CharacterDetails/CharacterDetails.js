import {Box, Button, Typography} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Spinner from "../../../UI/Spinner/Spinner";

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
    },[]);

    return (
        <div>
            Character details
    <Box>
        {isLoading && <Spinner/>}
        <Typography>{character.characterName}</Typography>
    </Box>
            <Button> <Link sx={{textDecoration: "none"}} to="../../" relative="path">Go back to summary</Link></Button>
        </div>
    )
}

export default CharacterDetails;