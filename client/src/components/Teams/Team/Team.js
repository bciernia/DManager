import Card from "../../UI/Card/Card";
import {useNavigate} from "react-router-dom";

const Team = props => {

    const teamId = props.team._id + '';

    const navigate = useNavigate();

    const showTeamDetails = () => {
        navigate(`${props.team._id}`)
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
        <Card onClick={showTeamDetails}>
            {/* Add character portrait <img />*/}
            <p> Team name: {props.team.name}</p>
            <p> Game system: {props.team.gameSystem}</p>
            <button onClick={deleteTeam}>Delete</button>
        </Card>
    )
}

export default Team;