import Card from "../../UI/Card/Card";
import {Avatar, Box, Button} from "@mui/material";

const Character = (props) => {
    const characterId = props.character._id + '';
    const teamId = props.teamId;

    //TODO refresh list after delete
    const deleteCharacter = () => {
        fetch(`http://127.0.0.1:3000/teams/${teamId}/characters/${characterId}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
            },
        }).then(res => res.json())
            .then(data => console.log(data));
    }

    return (
        <Card>
            <Box sx={{position: 'relative', minWidth: '17.5rem', minHeight: '22.5rem'}}>
                <Avatar src={props.character.characterPhoto}
                        sx={{position: 'relative', top: 0, left: '12.5rem', width: '5rem', height: '5rem'}}/>
                <p>Name: {props.character.characterName}</p>
                <p>Character class: {props.character.characterClass}</p>
                <p>Player: {props.character.playerName}</p>
                <Button variant="outlined" color="error" onClick={deleteCharacter}
                        sx={{position: 'absolute', bottom: 0}}>Delete character</Button>
            </Box>
        </Card>
    )
}

export default Character;