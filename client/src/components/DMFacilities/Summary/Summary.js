import {
    Box,
    Button,
    Card,
    Divider, FormControlLabel,
    Grid, InputLabel,
    List,
    ListItem,
    ListItemButton,
    ListItemText, Switch
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import AllTeams from "../Teams/AllTeams/AllTeams";
import classes from "./Summary.module.css";
import Character from "../Character/Character";
import AllCharacters from "../Character/AllCharacters";


const Summary = () => {
    const navigate = useNavigate();

    const goToCampaignMenu = () => {
        navigate(`campaign`)
    }

    const goToCharactersMenu = () => {
        navigate('character');
    }

    const goToSessionHistoryMenu = () => {
        navigate('session-history');
    }

    return (
        <div className={classes.container}>
            <Button sx={{backgroundColor: "#F5793B"}} variant="contained" color="inherit" onClick={goToCampaignMenu}>Campaigns</Button>
            <Button sx={{backgroundColor: "#F5793B"}} variant="contained" color="inherit" onClick={goToCharactersMenu}>Characters</Button>
            <Button sx={{backgroundColor: "#F5793B"}} variant="contained" color="inherit" onClick={goToSessionHistoryMenu}>Session history</Button>
        </div>
    )
}

export default Summary;