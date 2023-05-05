import {Button, TextField, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import classes from "../../NewCampaign/Form/NewCampaignForm.module.css";
import Card from "../../../../UI/Card/Card";
import React, {useState} from "react";

const NewScenarioFrom = () => {
    const {campaignId} = useParams()

    const [scenarioName, setScenarioName] = useState('');
    const [scenarioDescription, setScenarioDescription] = useState('');
    const scenarioSchedule = [];
    const scenarioCharacters = [];
    const scenarioLocations = [];
    const scenarioHandouts = [];

    const navigate = useNavigate();

    const addScenario = event => {
        event.preventDefault();

        const scenario = {
            scenarioName,
            scenarioDescription,
            scenarioSchedule,
            scenarioCharacters,
            scenarioLocations,
            scenarioHandouts,
            campaignId,
        }

        fetch(`http://127.0.0.1:3000/dm/${campaignId}/scenario/newScenario`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(scenario)
        })
            .then(res => res.json())
            .then(() => navigate(`/dm/campaign/${campaignId}`));
    }

    return (
        <div className={classes.container}>
            <Card>
                <Typography variant="h5" sx={{marginBottom: "1rem", textAlign: "center"}}>New scenario</Typography>
                <form className={classes['container--from']} onSubmit={(event) => addScenario(event)}>
                    <TextField sx={{width: "80%"}} type="text" label="Title"
                               inputProps={{maxLength: 50}}
                               required
                               onChange={(event) => setScenarioName(event.target.value)}/>
                    <TextField sx={{width: "80%"}} type="text" inputProps={{maxLength: 1000}} multiline
                               rows={5} label="Description"
                               required
                               onChange={(event) => setScenarioDescription(event.target.value)}/>
                    <Button sx={{backgroundColor: "#F5793B", position: "absolute", bottom: 0}} variant="contained"
                            color="inherit"
                            type="submit">Add scenario</Button>
                </form>
            </Card>
        </div>
    )
}

export default NewScenarioFrom;