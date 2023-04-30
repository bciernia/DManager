import {Button, FormControl, TextField, Typography} from "@mui/material";
import Card from "../../../../UI/Card/Card";
import React, {useState} from "react";
import classes from './NewCampaignForm.module.css';
import {useNavigate} from "react-router-dom";

const NewCampaignForm = () => {

    const [campaignName, setCampaignName] = useState('');
    const [campaignSetting, setCampaignSetting] = useState('');
    const [campaignDescription, setCampaignDescription] = useState('');

    const navigate = useNavigate();

    const handleSubmit = event => {
        event.preventDefault();

        const campaign = {
            campaignName,
            campaignSetting,
            campaignDescription,
        }

        fetch('http://127.0.0.1:3000/dm/campaign/newCampaign', {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(campaign)
        })
            .then(res => res.json())
            .then(campaignId => navigate(`/dm/campaign/${campaignId}`));
    }

    return (
        <div className={classes.container}>
            <Card>
                <form className={classes['container--from']} onSubmit={(event) => handleSubmit(event)}>
                    <TextField sx={{width: "80%"}} type="text" label="Campaign name"
                               inputProps={{maxLength: 50}}
                               required
                               onChange={(event) => setCampaignName(event.target.value)}/>
                    <TextField sx={{width: "80%"}} type="text" label="Campaign setting"
                               inputProps={{maxLength: 50}}
                               required
                               onChange={(event) => setCampaignSetting(event.target.value)}/>
                    <TextField sx={{width: "80%"}} type="text" inputProps={{maxLength: 1000}} multiline
                               rows={5} label="Campaign description"
                               required
                               onChange={(event) => setCampaignDescription(event.target.value)}/>
                    <Button sx={{backgroundColor: "#F5793B", position: "absolute", bottom: 0}} variant="contained"
                            color="inherit"
                            type="submit">Add campaign</Button>
                </form>
            </Card>
        </div>

    )
}


export default NewCampaignForm;