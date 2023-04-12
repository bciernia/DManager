import Character from "../Character/Character";
import {useEffect, useState} from "react";
import Spinner from "../../UI/Spinner/Spinner";
import Card from "../../UI/Card/Card";
import AddCharacter from "../Character/AddCharacter/AddCharacter";
import {useParams} from "react-router-dom";

const TeamDetails = props => {
    const params = useParams();
    const teamId = params.teamId;

    const [isLoading, setIsLoading] = useState(false);
    const [charactersArray, setCharactersArray] = useState([]);
    //TODO get team by id from parameter

    const getAllCharacters = () => {
        setIsLoading(true);

        fetch('http://127.0.0.1:3000/character/all')
            .then(res => res.json())
            .then(data => setCharactersArray(data))
            .finally(() => {
                setIsLoading(false);
            });
    }

    useEffect(() => {
        //TODO find all characters who has been set to team with id from parameter

        getAllCharacters();
    }, []);

    return (
        <Card>
            <AddCharacter teamId={teamId} onUpdate={getAllCharacters}/>

            {isLoading && <Spinner />}

            {charactersArray.length === 0 && <p>No characters</p>}

            {charactersArray.filter(char => char.teamId === teamId)
                .map(character => <Character key={character._id} character={character} />)}
        </Card>
    )
}

export default TeamDetails;