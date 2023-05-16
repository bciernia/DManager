import {Typography} from "@mui/material";
import classes from './CampaignDetailsPartialView.module.css';
import {useNavigate} from "react-router-dom";

const CampaignDetailsPartialView = props => {
    const campaign = props.campaign;

    return (
        <div className={classes.container}>
            <Typography variant="h2">{campaign.campaignName}</Typography>
            <Typography variant="h4">{campaign.campaignSetting}</Typography>
            <Typography variant="h4">{campaign.campaignDescription}</Typography>
        </div>
    )
}

export default CampaignDetailsPartialView;