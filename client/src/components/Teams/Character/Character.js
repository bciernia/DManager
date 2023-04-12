import Card from "../../UI/Card/Card";

const Character = (props) => {
    const characterId = props.character._id + '';

    //TODO refresh list after delete
    const deleteCharacter = () => {
        fetch(`http://127.0.0.1:3000/character/${characterId}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
            },
        }).then(res => res.json())
            .then(data => console.log(data));
    }

    return (
        <Card>
            {/* Add character portrait <img />*/}
            <p> Name: {props.character.name}</p>
            <p> Exp: {props.character.exp}</p>
            <p>Character class: {props.character.characterClass}</p>
            <p>Is alive: {props.character.isAlive.toString()}</p>
            <p>Player: {props.character.playerName}</p>
            <button onClick={deleteCharacter}>Delete</button>
        </Card>
    )
}

export default Character;