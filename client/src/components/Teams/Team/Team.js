import Character from "../Character/Character";
import {useEffect, useState} from "react";
import Spinner from "../../UI/Spinner/Spinner";
import Card from "../../UI/Card/Card";
import AddCharacter from "../Character/AddCharacter/AddCharacter";
import {Link} from "react-router-dom";

const Team = props => {

    const teamId = props.team._id + '';

    const showTeamDetails = () => {
        //TODO show team details method
    }

    const deleteTeam = (event) => {
        event.preventDefault();

        fetch(`http://127.0.0.1:3000/teams/${teamId}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
            },
        }).then(res => res.json())
            .then(data => console.log(data));
    }

    return (
        <div onClick={showTeamDetails}>
            <Link to={`${props.team._id}`}>
                <Card>
                    {/* Add character portrait <img />*/}
                    <p> Team name: {props.team.name}</p>
                    <p> Game system: {props.team.gameSystem}</p>
                    <button onClick={deleteTeam}>Delete</button>
                </Card>
            </Link>
        </div>
    )
}

export default Team;