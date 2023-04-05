import Card from "../../UI/Card/Card";

const Character = (props) => {
    return (
        <Card>
            {/* Add character portrait <img />*/}
            <p> Name: {props.character.name}</p>
            <p> Exp: {props.character.exp}</p>
            <p>Character class: {props.character.characterClass}</p>
            <p>Is alive: {props.character.isAlive.toString()}</p>
            <p>Player: {props.character.playerName}</p>
        </Card>
    )
}

export default Character;