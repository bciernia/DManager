import Card from "../../UI/Card/Card";
import {Avatar, Box, Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Character = (props) => {
    const characterId = props.character._id + '';

    const navigate = useNavigate();

    const showCharacterDetails = () => {
        navigate(`character/${props.character._id}`)
    }

    //TODO refresh list after delete
    const deleteCharacter = () => {
        fetch(`http://127.0.0.1:3000/character/${characterId}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
            },
        }).then(res => res.json())
            .then(data => console.log(data));
    };

    return (
        <Card>
            <Box sx={{position: 'relative', width: "15rem", minHeight: '18.75rem'}}>
                <Avatar src={props.character.characterPhoto}
                        sx={{position: 'relative', top: 0, left: '10rem', width: '5rem', height: '5rem'}}/>
                <Typography>Name: <b>{props.character.characterName}</b></Typography>
                <Typography>Class: <b>{props.character.characterClass}</b></Typography>
                <Typography>Player: <b>{props.character.playerName}</b></Typography>
                <Typography>Type: <b>{props.character.characterType}</b></Typography>
                <Button variant="contained" color="info" onClick={showCharacterDetails}
                        sx={{position: 'absolute', bottom: "2.5rem"}}>Details</Button>
                <Button variant="contained" color="error" onClick={deleteCharacter}
                        sx={{position: 'absolute', bottom: 0}}>Delete</Button>
            </Box>
        </Card>
    )
}

export default Character;