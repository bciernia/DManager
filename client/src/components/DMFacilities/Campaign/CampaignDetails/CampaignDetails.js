import classes from "../CampaignsSummary/CampaignDetailsPartialView/CampaignDetailsPartialView.module.css";
import {Box, Button, Grid, List, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Spinner from "../../../UI/Spinner/Spinner";

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

    const addScenarioToChosenCampaign = () => {
        navigate(`scenario/newScenario`);
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

    return (
        <div className={classes.container}>
            {isLoading && <Spinner/>}
            <Button sx={{backgroundColor: "#F5793B", position: "absolute", right: ".5rem", marginTop: "0.5rem"}}
                    variant="contained" color="inherit"
                    onClick={addScenarioToChosenCampaign}
            >Add scenario to campaign</Button>
            <Typography variant="h2">{campaign.campaignName}</Typography>
            <Grid container spacing={1}>
                <Grid item md={2} >
                    <Button sx={{backgroundColor: "#F5793B"}} variant="contained" color="inherit"
                            onClick={() => alert("TESt")}>Add new campaign</Button>
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
                                    <Typography variant="h6" textAlign="center">No campaigns</Typography>}
                                {scenariosArray.map(scenario =>
                                <ListItem key={scenario._id} disablePadding>
                                        <ListItemButton sx={{textAlign: "center"}}
                                                        onClick={() => alert(scenario.scenarioName)}>
                                            <ListItemText primary={scenario.scenarioName}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                )}
                            </List>
                        </nav>
                    </Box>
                </Grid>

                <Grid item md={9} sx={{backgroundColor: "green"}}>
                    test2
                </Grid>
            </Grid>
        </div>
    )
}

export default CampaignDetails;