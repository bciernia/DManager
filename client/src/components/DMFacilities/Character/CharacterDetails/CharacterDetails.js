import {Button} from "@mui/material";
import {Link} from "react-router-dom";

const CharacterDetails = () => {
    return (
        <div>
            Character details

            <Button> <Link sx={{textDecoration: "none"}} to="../../" relative="path">Go back to summary</Link></Button>
        </div>
    )
}

export default CharacterDetails;