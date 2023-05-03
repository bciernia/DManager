import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Typography} from "@mui/material";
import NewScenarioFrom from "./Form/NewScenarioFrom";

const CreateNewScenario = () => {
    const {campaignId} = useParams();
    const [chosenCampaign, setChosenCampaign] = useState({});

    useEffect(() => {
        fetch(`http://127.0.0.1:3000/dm/campaign/${campaignId}`)
            .then(res => res.json())
            .then(data => setChosenCampaign(data));
    }, [])

    return (
        <div>
            <Typography variant="h5" sx={{margin: "1rem 0 0 1rem"}}>Campaign: {chosenCampaign.campaignName}</Typography>
            <NewScenarioFrom />
        </div>
    )
}

export default CreateNewScenario;