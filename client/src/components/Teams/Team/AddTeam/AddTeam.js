import {useRef, useState} from "react";
import classes from "./AddTeam.module.css";
import Spinner from "../../../UI/Spinner/Spinner";
import Card from "../../../UI/Card/Card";
import team from "../Team";

const AddTeam = () => {
    const [isLoading, setIsLoading] = useState(false);

    const inputTeamNameRef = useRef(null);
    const inputGameSystemRef = useRef(null);

    const createTeam = () => {
        //TODO check if any of fields is empty

        const name = inputTeamNameRef.current.value;
        const gameSystem = inputGameSystemRef.current.value;

        inputTeamNameRef.current.value = '';
        inputGameSystemRef.current.value = '';

        console.log(name)
        console.log(gameSystem)

        return {
            name,
            gameSystem,
        }
    }

    const addNewTeamHandler = event => {
        event.preventDefault();
        setIsLoading(true);

        fetch('http://127.0.0.1:3000/teams/newTeam', {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(createTeam())
        }).then(res => res.json())
            .finally(() => setIsLoading(false));
    }

    return (
        <div>
            <Card>
                {isLoading && <Spinner/>}

                {!isLoading && (
                    <form onSubmit={addNewTeamHandler} className={classes["add-team--form"]}>
                        <label htmlFor="teamName">Team name</label>
                        <input id="teamName" type="text" ref={inputTeamNameRef}/>
                        <label htmlFor="gameSystem">Game system</label>
                        <input id="gameSystem" type="text" ref={inputGameSystemRef}/>

                        <button type="submit">Add team</button>
                    </form>
                )}

            </Card>
        </div>
    )
}

export default AddTeam;