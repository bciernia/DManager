import React, {useEffect, useState} from 'react';
import classes from './CampaignsSummary.module.css';
import {Box, Button, Grid, List, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import CampaignDetailsPartialView from "./CampaignDetailsPartialView/CampaignDetailsPartialView";
import Spinner from "../../../UI/Spinner/Spinner";

const getAllCampaigns = () =>
    fetch(`http://127.0.0.1:3000/dm/campaign/all`)
        .then(res => res.json());

const CampaignsSummary = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [campaignArray, setCampaignArray] = useState([]);
    const [chosenCampaign, setChosenCampaign] = useState();

    const navigate = useNavigate();

    const showCampaignDetails = (campaignId) => {
        setChosenCampaign(campaignArray.find(campaign => campaign._id === campaignId));
    }

    const goToAddNewCampaignForm = () => {
        navigate('newCampaign');
    }

    useEffect(() => {
        getAllCampaigns()
            .then(data => {
                setCampaignArray(data)
                setIsLoading(false);
            })
    }, []);

    useEffect(() => {
        if (chosenCampaign) return;

        setChosenCampaign(campaignArray[0]);
    }, [campaignArray]);

    return (
        <div className={classes.container}>
            <Grid container>
                <Grid item md={2} sx={{display: "flex", flexDirection: "column", marginTop: "0.5rem"}}>
                    <Button sx={{backgroundColor: "#F5793B"}} variant="contained" color="inherit"
                            onClick={goToAddNewCampaignForm}>Add new campaign</Button>
                    <Box sx={{width: "100%", margin: "0.5rem 0"}}>
                        <nav>
                            <Typography variant="h4" textAlign="center">Campaign list</Typography>
                            <List sx={{
                                height: "35rem",
                                overflow: "auto",
                                border: "solid 2px",
                            }}>
                                {isLoading && <Spinner/>}
                                {campaignArray.length === 0 &&
                                    <Typography variant="h6" textAlign="center">No campaigns</Typography>}
                                {campaignArray.map(campaign =>
                                    <ListItem key={campaign._id} disablePadding>
                                        <ListItemButton sx={{textAlign: "center"}}
                                                        onClick={() => showCampaignDetails(campaign._id)}>
                                            <ListItemText primary={campaign.campaignName}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                )}
                            </List>
                        </nav>
                    </Box>
                </Grid>
                <Grid item md={10}>
                    <Box sx={{height: "50rem", width: "100%"}}>
                        {!chosenCampaign ? (
                                <Typography sx={{display: "flex", justifyContent: "center"}} variant="h2">Choose one of
                                    yours campaigns</Typography>) :
                            (
                                <CampaignDetailsPartialView campaign={chosenCampaign}/>
                            )}
                    </Box>
                </Grid>
            </Grid>
        </div>

    )
}

export default CampaignsSummary;