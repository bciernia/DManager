import {Typography} from "@mui/material";

const CampaignDetails = props => {
    const campaign = props.campaign;

    return (
        <div>
            <Typography variant="h2">{campaign.campaignName}</Typography>
            <Typography variant="h4">{campaign.campaignSetting}</Typography>
            <Typography variant="h4">{campaign.campaignDescription}</Typography>
        </div>
    )
}

export default CampaignDetails;