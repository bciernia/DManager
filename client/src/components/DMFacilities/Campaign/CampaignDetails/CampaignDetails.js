import classes from "../CampaignsSummary/CampaignDetailsPartialView/CampaignDetailsPartialView.module.css";
import {Box, Button, Grid, List, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Spinner from "../../../UI/Spinner/Spinner";
import CampaignDetailsPartialView from "../CampaignsSummary/CampaignDetailsPartialView/CampaignDetailsPartialView";
import ScenarioDetailsPartialView from "./ScenarioDetailsPartialView/ScenarioDetailsPartialView";

const getCampaignById = (campaignId) =>
    fetch(`http://127.0.0.1:3000/dm/campaign/${campaignId}`)
        .then(res => res.json());

const getScenariosFromChosenCampaign = (campaignId) =>
    fetch(`http://127.0.0.1:3000/dm/campaign/${campaignId}/scenario/all`)
        .then(res => res.json());

const CampaignDetails = () => {
    const {campaignId} = useParams();
    const navigate = useNavigate();

    const [campaign, setCampaign] = useState({});
    const [scenariosArray, setScenariosArray] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [chosenScenario, setChosenScenario] = useState();

    const addScenarioToChosenCampaign = () => {
        navigate(`scenario/newScenario`);
    }

    const editChosenScenario = () => {
        navigate(`scenario/${chosenScenario._id}/edit`)
    }

    const showScenarioDetails = (scenarioId) => {
        setChosenScenario(scenariosArray.find(scenario => scenario._id === scenarioId));
    }

    useEffect(() => {
        setIsLoading(true);

        Promise.all([
            getCampaignById(campaignId),
            getScenariosFromChosenCampaign(campaignId)
        ]).then(([dataCampaign, dataScenarios]) => {
            setCampaign(dataCampaign);
            setScenariosArray(dataScenarios);
            setIsLoading(false);
        })

    }, [campaignId]);

    useEffect(() => {
        if (chosenScenario) return;

        setChosenScenario(scenariosArray[0]);
    }, [scenariosArray]);

    return (
        <div className={classes.container}>
            {isLoading && <Spinner/>}
            <Button sx={{backgroundColor: "#F5793B", position: "absolute", right: ".5rem", marginTop: "0.5rem"}}
                    variant="contained" color="inherit"
                    onClick={addScenarioToChosenCampaign}
            >Add scenario</Button>
            <Button sx={{backgroundColor: "#F5793B", position: "absolute", right: ".5rem", marginTop: "3.5rem"}}
                    variant="contained" color="inherit"
                    onClick={editChosenScenario}
            >Edit scenario</Button>
            <Typography variant="h2">{campaign.campaignName}</Typography>
            <Grid container>
                <Grid item md={2} >

                    <Box sx={{width: "100%", margin: "0.5rem 0"}}>
                        <nav>
                            <Typography variant="h4" textAlign="center">Scenarios list</Typography>
                            <List sx={{
                                height: "35rem",
                                overflow: "auto",
                                border: "solid 2px",
                            }}>
                                {isLoading && <Spinner/>}
                                {scenariosArray.length === 0 &&
                                    <Typography variant="h6" textAlign="center">No scenarios</Typography>}
                                {scenariosArray.map(scenario =>
                                <ListItem key={scenario._id} disablePadding>
                                        <ListItemButton sx={{textAlign: "center"}}
                                                        onClick={() => showScenarioDetails(scenario._id)}>
                                            <ListItemText primary={scenario.scenarioName}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                )}
                            </List>
                        </nav>
                    </Box>
                </Grid>

                <Grid item md={10}>
                    <Box sx={{height: "40rem", width: "100%"}}>
                        {!chosenScenario ? (
                                <Typography sx={{display: "flex", justifyContent: "center"}} variant="h2">Choose one of
                                    yours scenarios</Typography>) :
                            (
                                <ScenarioDetailsPartialView scenario={chosenScenario}/>
                            )}
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default CampaignDetails;