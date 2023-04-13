import Character from "../Character/Character";
import {useEffect, useState} from "react";
import Spinner from "../../UI/Spinner/Spinner";
import AddCharacter from "../Character/AddCharacter/AddCharacter";
import {useParams} from "react-router-dom";
import Wrapper from "../../../utils/Wrapper";
import {Box, Typography} from "@mui/material";

const TeamDetails = props => {
    const params = useParams();
    const teamId = params.teamId;

    const [isLoading, setIsLoading] = useState(false);
    const [charactersArray, setCharactersArray] = useState([]);
    //TODO get team by id from parameter

    const getAllCharacters = (teamId) => {
        setIsLoading(true);

        fetch(`http://127.0.0.1:3000/teams/${teamId}/characters`)
            .then(res => res.json())
            .then(data => setCharactersArray(data))
            .finally(() => {
                setIsLoading(false);
            });
    }

    useEffect(() => {
        //TODO find all characters who has been set to team with id from parameter

        getAllCharacters(teamId);
    }, [teamId]);

    return (
        <Wrapper>
            {isLoading && <Spinner/>}

            <Box sx={{display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap', flexDirection: 'row'}}>
                {charactersArray.length === 0 && <p>No characters</p>}
                {charactersArray.map(character => <Character key={character._id} teamId={teamId} character={character}/>)}
            </Box>
            <AddCharacter teamId={teamId} onUpdate={() => getAllCharacters(teamId)}/>
        </Wrapper>
    )
}

export default TeamDetails;