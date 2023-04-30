import classes from './CampaignsSummary.module.css';
import {Box, Button, Grid, List, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import Character from "../../Character/Character";
import {useNavigate} from "react-router-dom";
import CampaignDetails from "../CampaignDetails/CampaignDetails";

const CampaignsSummary = () => {

    const [isLoading, setIsLoading] = useState([]);
    const [campaignArray, setCampaignArray] = useState([]);
    const [chosenCampaign, setChosenCampaign] = useState();

    const navigate = useNavigate();

    const getAllCampaigns = () => {
        setIsLoading(true);

        fetch(`http://127.0.0.1:3000/dm/campaign/all`)
            .then(res => res.json())
            .then(data => setCampaignArray(data))
            .finally(() => {
                setIsLoading(false);
            });
    }

    const showCampaignDetails = (campaignId) => {
        setIsLoading(true);

        fetch(`http://127.0.0.1:3000/dm/campaign/${campaignId}`)
            .then(res => res.json())
            .then(data => setChosenCampaign(data))
            .finally(() => {
                setIsLoading(false);
            })
    }


    const goToAddNewCampaignForm = () => {
        navigate('newCampaign');
    }

    useEffect(() => {
        getAllCampaigns();
    }, []);

    return (
        <Grid container>
            <Grid item md={2} sx={{display: "flex", flexDirection: "column", margin: "0.5rem"}}>
                <Button sx={{backgroundColor: "#F5793B"}} variant="contained" color="inherit" onClick={goToAddNewCampaignForm}>Add new campaign</Button>
                <Box sx={{width: "100%", margin: "0.5rem 0"}}>
                    <nav>
                        <Typography variant="h4" textAlign="center">Campaign list</Typography>
                        <List>
                            {campaignArray.length === 0 && <Typography variant="h6" textAlign="center">No campaigns</Typography>}
                            {campaignArray.map(campaign =>
                                <ListItem disablePadding>
                                    <ListItemButton sx={{textAlign: "center"}} onClick={() => showCampaignDetails(campaign._id)}>
                                        <ListItemText primary={campaign.campaignName}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            )}
                        </List>
                    </nav>
                </Box>
            </Grid>
            <Grid item md={9}>
                <Box sx={{height: "50rem", width: "100%"}}>
                    {!chosenCampaign ? (<Typography sx={{display:"flex", justifyContent:"center"}} variant="h2">Choose one of yours campaigns</Typography>) :
                        (
                            <CampaignDetails campaign={chosenCampaign} />
                        )}
                </Box>
            </Grid>
        </Grid>
    )
}

export default CampaignsSummary;