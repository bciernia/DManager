import {Button, Typography} from "@mui/material";
import classes from './CampaignDetails.module.css';

const CampaignDetails = props => {
    const campaign = props.campaign;

    return (
        <div className={classes.container}>
            <Button sx={{backgroundColor: "#F5793B", position:"absolute", right:"-7rem", marginTop: "0.5rem"}} variant="contained" color="inherit">Add scenario to campaign</Button>
            <Typography variant="h2">{campaign.campaignName}</Typography>
            <Typography variant="h4">{campaign.campaignSetting}</Typography>
            <Typography variant="h4">{campaign.campaignDescription}</Typography>
        </div>
    )
}

export default CampaignDetails;