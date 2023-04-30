import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, Typography} from "@mui/material";
import NewScenarioFrom from "./Form/NewScenarioFrom";

const CreateNewScenario = () => {
    const {campaignId} = useParams();
    const [chosenCampaign, setChosenCampaign] = useState({});

    useEffect(() => {
        fetch(`http://127.0.0.1:3000/dm/campaign/${campaignId}`)
            .then(res => res.json())
            .then(data => setChosenCampaign(data));
    }, [])

    const test = () => {
        alert(chosenCampaign.campaignName);
    }

    return (
        <div>
            <Typography variant="h5">Campaign: {chosenCampaign.campaignName}</Typography>
            <Typography variant="h4">Create new scenario</Typography>

            <NewScenarioFrom />
        </div>
    )
}

export default CreateNewScenario;