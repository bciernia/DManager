import classes from './CampaignsSummary.module.css';
import {Box, Button, Grid, List, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import Character from "../../Character/Character";
import {useNavigate} from "react-router-dom";

const CampaignsSummary = () => {

    const [isLoading, setIsLoading] = useState([]);
    const [campaignArray, setCampaignArray] = useState([]);

    const navigate = useNavigate();

    const getAllCharacters = () => {
        setIsLoading(true);

        fetch(`http://127.0.0.1:3000/dm/campaign/all`)
            .then(res => res.json())
            .then(data => setCampaignArray(data))
            .finally(() => {
                setIsLoading(false);
            });
    }

    const goToAddNewCampaignForm = () => {
        navigate('newCampaign');
    }

    useEffect(() => {
        getAllCharacters();
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item md={4}>
                <Box sx={{width: "100%", maxWidth: 400, margin: "0.5rem 1rem"}}>
                    <Button sx={{backgroundColor: "#F5793B"}} variant="contained" color="inherit" onClick={goToAddNewCampaignForm}>Add new campaign</Button>
                    <nav aria-label="main mailbox folders">
                        <Typography variant="h4" textAlign="center">Campaigns list</Typography>
                        <List sx={{
                            width: '100%',
                            position: 'relative',
                            overflow: 'auto',
                            maxHeight: 340,
                        }}>
                            {campaignArray.length === 0 && <Typography variant="h6" textAlign="center">No campaigns</Typography>}
                            {campaignArray.map(campaign =>
                                <ListItem disablePadding>
                                    <ListItemButton sx={{textAlign: "center"}}>
                                        <ListItemText primary={campaign.campaignName}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            )}

                        </List>
                    </nav>
                </Box>
            </Grid>
            <Grid item md={8}>
                TES
            </Grid>

        </Grid>
    )
}

export default CampaignsSummary;