import {Button, Typography} from "@mui/material";
import classes from './CampaignDetails.module.css';
import {useNavigate} from "react-router-dom";

const CampaignDetails = props => {
    const campaign = props.campaign;
    const campaignId = campaign._id;

    const navigate = useNavigate();

    const addScenarioToChosenCampaign = () => {
        navigate(`${campaignId}/scenario/newScenario`);
    }

    return (
        <div className={classes.container}>
            <Button sx={{backgroundColor: "#F5793B", position: "absolute", right: 0, marginTop: "0.5rem"}}
                    variant="contained" color="inherit"
                    onClick={addScenarioToChosenCampaign}
            >Add scenario to campaign</Button>
            <Typography variant="h2">{campaign.campaignName}</Typography>
            <Typography variant="h4">{campaign.campaignSetting}</Typography>
            <Typography variant="h4">{campaign.campaignDescription}</Typography>
        </div>
    )
}

export default CampaignDetails;