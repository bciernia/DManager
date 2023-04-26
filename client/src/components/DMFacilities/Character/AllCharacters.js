import Character from "./Character";
import {useEffect, useState} from "react";
import Spinner from "../../UI/Spinner/Spinner";
import {Link, useParams} from "react-router-dom";
import Wrapper from "../../../utils/Wrapper";
import {Box, Button, Typography} from "@mui/material";

const TeamDetails = props => {
    const params = useParams();
    const teamId = params.teamId;

    const [isLoading, setIsLoading] = useState(false);
    const [charactersArray, setCharactersArray] = useState([]);

    const getAllCharacters = (teamId) => {
        setIsLoading(true);

        fetch(`http://127.0.0.1:3000/character/all`)
            .then(res => res.json())
            .then(data => setCharactersArray(data))
            .finally(() => {
                setIsLoading(false);
            });
    }

    useEffect(() => {
        getAllCharacters(teamId);
    }, [teamId]);

    return (
        <Wrapper>
            {isLoading && <Spinner/>}
            <Box sx={{display: 'flex', justifyContent: 'flex-start', flexDirection: 'row'}}>
                {charactersArray.length === 0 && <p>No characters</p>}
                {charactersArray.map(character => <Character key={character._id} teamId={teamId}
                                                             character={character}/>)}
            </Box>
        </Wrapper>
    )
}

export default TeamDetails;