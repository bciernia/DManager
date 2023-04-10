import {useEffect, useState} from "react";
import Spinner from "../../../UI/Spinner/Spinner";

const AllTeams = () => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

    },[]);

    return (
        <div>
            {isLoading && <Spinner />}



            Ts
        </div>
    )
}

export default AllTeams;