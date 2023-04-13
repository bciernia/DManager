import Card from "../../UI/Card/Card";
import {Avatar, Box, Button} from "@mui/material";
import rainer from '../../../assets/characterPortaits/rainer.png'

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
                {/* Add character portrait <img />*/}
                <Avatar src={rainer}
                        sx={{position: 'absolute', top: '-1rem', right: 0, width: '5rem', height: '5rem'}}/>
                <p> Name: {props.character.name}</p>
                <p> Exp: {props.character.exp}</p>
                <p>Character class: {props.character.characterClass}</p>
                <p>Is alive: {props.character.isAlive.toString()}</p>
                <p>Player: {props.character.playerName}</p>
                <Button variant="outlined" color="error" onClick={deleteCharacter}
                        sx={{position: 'absolute', bottom: 0}}>Delete character</Button>
            </Box>
        </Card>
    )
}

export default Character;