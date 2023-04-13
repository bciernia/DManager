import Card from "../../../UI/Card/Card";
import classes from "./AddCharacter.module.css"
import {useRef, useState} from "react";
import Spinner from "../../../UI/Spinner/Spinner";

const AddCharacter = props => {
    const teamId = props.teamId;

    const [isLoading, setIsLoading] = useState(false);

    const inputCharacterNameRef = useRef(null);
    const inputCharacterClassRef = useRef(null);
    const inputPlayerNameRef = useRef(null);

    const createCharacter = () => {
        //TODO check if any of fields is empty

        const name = inputCharacterNameRef.current.value;
        const characterClass = inputCharacterClassRef.current.value;
        const playerName = inputPlayerNameRef.current.value;

        inputCharacterNameRef.current.value = '';
        inputCharacterClassRef.current.value = '';
        inputPlayerNameRef.current.value = '';

        return {
            name,
            characterClass,
            playerName,
            teamId,
        }
    }

    const addNewCharacterHandler = event => {
        event.preventDefault();
        setIsLoading(true);

        fetch(`http://127.0.0.1:3000/teams/${teamId}/characters/newCharacter`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(createCharacter())
        }).then(res => res.json())
            .finally(() => {
                setIsLoading(false)
                props.onUpdate();
            });
    }

    return (
        <Card>
            {isLoading && <Spinner/>}

            {!isLoading && (
                // TODO add character img
                <form onSubmit={addNewCharacterHandler} className={classes["add-character--form"]}>
                    <label htmlFor="characterName">Character name</label>
                    <input id="characterName" type="text" ref={inputCharacterNameRef}/>
                    {/*TODO Player name has to be dropdown */}
                    <label htmlFor="playerName">Player name</label>
                    <input id="playerName" type="text" ref={inputPlayerNameRef}/>
                    <label htmlFor="characterClass">Character class</label>
                    {/*TODO Character class has to be dropdown */}
                    <input id="characterClass" type="text" ref={inputCharacterClassRef}/>
                    {/*TODO add radio is Player character or NPC*/}

                    <button type="submit">Add character</button>
                </form>
            )}

        </Card>
    )
}

export default AddCharacter;