import Character from "../Character/Character";
import {useEffect, useState} from "react";
import Spinner from "../../UI/Spinner/Spinner";
import Card from "../../UI/Card/Card";
import AddCharacter from "../Character/AddCharacter/AddCharacter";
import {useParams} from "react-router-dom";

const Team = () => {
    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [charactersArray, setCharactersArray] = useState([]);

    //TODO get team by id from parameter

    useEffect(() => {
        setIsLoading(true);

        //TODO find all characters who has been set to team with id from parameter

        fetch('http://127.0.0.1:3000/character/all')
            .then(res => res.json())
            .then(data => setCharactersArray(data))
            .finally(() => {
                setIsLoading(false);
            })

        //TODO add dependency to reload after adding new character to array
    }, []);

    return (
        <Card>
            <AddCharacter teamId={params.teamId}/>

            {isLoading && <Spinner />}

            {charactersArray.length === 0 && <p>No characters</p>}

            {charactersArray.map(character => <Character key={character._id} character={character} />)}
        </Card>
    )
}

export default Team;