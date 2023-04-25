import {useEffect, useState} from "react";
import Spinner from "../../../UI/Spinner/Spinner";
import Team from "../Team";

const AllTeams = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [teamsArray, setTeamsArray] = useState([]);

    useEffect(() => {
        setIsLoading(true);

        fetch('http://127.0.0.1:3000/teams')
            .then(res => res.json())
            .then(data => setTeamsArray(data))
            .finally(() => {
                setIsLoading(false);
            })
    }, []);

    return (
        <div>

            {isLoading && <Spinner/>}

            {teamsArray.map(team => <Team key={team._id} team={team}/>)}

            {/*{teamsArray.length === 0 && <p>No teams</p>}*/}
            {/*{teamsArray.map(character => <Character key={character._id} character={character} />)}*/}
        </div>
    )
}

export default AllTeams;