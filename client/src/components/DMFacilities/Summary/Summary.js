import { Button } from "@mui/material";
import {useNavigate} from "react-router-dom";
import classes from "./Summary.module.css";

const Summary = () => {
    const navigate = useNavigate();

    const goToCampaignMenu = () => {
        navigate(`campaign`)
    }

    const goToCharactersMenu = () => {
        navigate('characters');
    }

    const goToSessionHistoryMenu = () => {
        navigate('session-history');
    }

    const goToSpellsMenu = () => {
        navigate('spells');
    }

    return (
        <div className={classes.container}>
            <Button sx={{backgroundColor: "#F5793B"}} variant="contained" color="inherit"
                    onClick={goToCampaignMenu}>Campaigns</Button>
            <Button sx={{backgroundColor: "#F5793B"}} variant="contained" color="inherit"
                    onClick={goToCharactersMenu}>Characters</Button>
            <Button sx={{backgroundColor: "#F5793B"}} variant="contained" color="inherit"
                    onClick={goToSessionHistoryMenu}>Session history</Button>
            <Button sx={{backgroundColor: "#F5793B"}} variant="contained" color="inherit"
                    onClick={goToSpellsMenu}>Spells</Button>
        </div>
    )
}

export default Summary;