import Card from "../../UI/Card/Card";
import {Avatar, Box, Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Character = (props) => {
    const characterId = props.character._id + '';
    const teamId = props.teamId;

    const navigate = useNavigate();

    const showCharacterDetails = () => {
        navigate(`character/${props.character._id}`)
    }

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
            <Box sx={{position: 'relative', width: "15rem", minHeight: '18.75rem'}}>
                <Avatar src={props.character.characterPhoto}
                        sx={{position: 'relative', top: 0, left: '10rem', width: '5rem', height: '5rem'}}/>
                <p>Name: {props.character.characterName}</p>
                <p>Character class: {props.character.characterClass}</p>
                <p>Player: {props.character.playerName}</p>
                <Button variant="contained" color="info" onClick={showCharacterDetails}
                        sx={{position: 'absolute', bottom: "2.5rem"}}>Details</Button>
                <Button variant="contained" color="error" onClick={deleteCharacter}
                        sx={{position: 'absolute', bottom: 0}}>Delete</Button>
            </Box>
        </Card>
    )
}

export default Character;