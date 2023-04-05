import Character from "./Character/Character";
import {useEffect, useState} from "react";
import Spinner from "../UI/Spinner/Spinner";
import Card from "../UI/Card/Card";

const Team = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [charactersArray, setCharactersArray] = useState([]);

    useEffect(() => {
        setIsLoading(true);

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
            {isLoading && <Spinner />}

            {charactersArray.length === 0 && <p>No characters</p>}

            {charactersArray.map(character => <Character key={character._id} character={character} />)}
        </Card>
    )
}

export default Team;