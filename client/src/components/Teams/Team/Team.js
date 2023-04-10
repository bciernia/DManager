import Character from "../Character/Character";
import {useEffect, useState} from "react";
import Spinner from "../../UI/Spinner/Spinner";
import Card from "../../UI/Card/Card";
import AddCharacter from "../Character/AddCharacter/AddCharacter";

const Team = props => {

    return (
        <Card>
            {/* Add character portrait <img />*/}
            <p> Team name: {props.team.name}</p>
            <p> Game system: {props.team.gameSystem}</p>
        </Card>
    )
}

export default Team;