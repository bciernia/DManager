import {useNavigate} from "react-router-dom";
import Card from "../../UI/Card/Card";
import {Button} from "@mui/material";

const Team = props => {

    const teamId = props.team._id + '';

    const navigate = useNavigate();

    const showTeamDetails = () => {
        navigate(`teams/${props.team._id}`)
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
        //TODO clicking delete, showing team details
        <Card>
            <p> Team name: {props.team.name}</p>
            <p> Game system: {props.team.gameSystem}</p>
            <Button variant="contained" color="error" onClick={deleteTeam}>Delete</Button>
            <Button sx={{marginLeft: "1rem"}} variant="contained" color="info" onClick={showTeamDetails}>Details</Button>
        </Card>
    )
}

export default Team;