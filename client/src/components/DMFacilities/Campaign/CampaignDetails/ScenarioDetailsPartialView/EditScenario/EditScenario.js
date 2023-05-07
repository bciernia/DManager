import {useNavigate, useParams} from "react-router-dom";
import {Button, Grid, List, ListItem, ListItemButton, ListItemText, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";

const getScenarioById = (scenarioId) =>
    fetch(`http://127.0.0.1:3000/dm/scenario/${scenarioId}`)
        .then(res => res.json());

//TODO get all locations from current scenario
const getLocationsForScenario = (scenarioId) =>
    fetch(`http://127.0.0.1:3000/dm/scenario/${scenarioId}/location/all`)
        .then(res => res.json());

const EditScenario = () => {
    const {scenarioId} = useParams();
    const navigate = useNavigate();

    const [isEditModeOn, setIsEditModeOn] = useState(false);
    const [scenario, setScenario] = useState({});
    const [newScenarioName, setNewScenarioName] = useState();
    const [newScenarioDescription, setNewScenarioDescription] = useState();
    const [newScenarioNotes, setNewScenarioNotes] = useState();
    const [newScenarioLocations, setNewScenarioLocations] = useState([]);

    useEffect(() => {
        Promise.all([
            getScenarioById(scenarioId),
            getLocationsForScenario(scenarioId),
        ]).then(([scenarioData, locationsData]) => {
            console.log(locationsData);
                setScenario(scenarioData);
                setNewScenarioName(scenarioData.scenarioName);
                setNewScenarioDescription(scenarioData.scenarioDescription);
                setNewScenarioNotes(scenarioData.scenarioNotes);
                setNewScenarioLocations(locationsData);
            });
    }, []);

    const changeScenarioName = () => {
        setIsEditModeOn(isEditModeOn => !isEditModeOn);
    }

    const saveForm = () => {
        setIsEditModeOn(isEditModeOn => !isEditModeOn);
        setScenario({...scenario, scenarioName: newScenarioName, scenarioDescription: newScenarioDescription})
    }

    const saveNewScenario = () => {
        fetch(`http://127.0.0.1:3000/dm/scenario/${scenarioId}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(scenario)
        })
            .then(() => {
                alert("Scenario updated!");
            });
    }

    const showLocationDetails = () => {

    }

    const addLocation = () => {
        navigate(`newLocation`);
    }

    return (
        <div>
            {!isEditModeOn && <Button onClick={saveNewScenario} variant="contained">Submit changes</Button>}
            {!isEditModeOn ? <Button onClick={changeScenarioName}>Edit</Button> :
                <Button onClick={saveForm}>Save</Button>}
            <Grid container sx={{padding: "1rem"}}>

                <Grid item md={12} sx={{margin: "1rem 0"}}>
                    {!isEditModeOn ? <Typography variant="h6">{scenario.scenarioName}</Typography>
                        :
                        <TextField
                            sx={{width: "80%"}} type="text" label="Title"
                            inputProps={{maxLength: 50}}
                            required
                            defaultValue={newScenarioName}
                            onChange={(event) => setNewScenarioName(event.target.value)}/>
                    }
                </Grid>

                <Grid item md={12} sx={{margin: "1rem 0"}}>
                    {!isEditModeOn ? <Typography variant="h6">{scenario.scenarioDescription}</Typography>
                        :
                        <TextField
                            sx={{width: "80%"}} type="text" label="Description"
                            inputProps={{maxLength: 50}}
                            required
                            defaultValue={newScenarioDescription}
                            onChange={(event) => setNewScenarioDescription(event.target.value)}/>
                    }
                </Grid>
                <Grid item md={3} sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: "1rem 0"
                }}>
                    <Button sx={{backgroundColor: "#F5793B"}}
                            variant="contained" color="inherit" onClick={addLocation}>Add location</Button>

                    <Typography variant="h4" textAlign="center">Locations</Typography>
                    <List sx={{
                        height: "30rem",
                        width: "20rem",
                        overflow: "auto",
                        border: "solid 2px",
                    }}>

                        {newScenarioLocations.length === 0 &&
                            <Typography variant="h6" textAlign="center">No locations</Typography>}
                        {newScenarioLocations.map(location =>
                            <ListItem key={location._id} disablePadding>
                                <ListItemButton sx={{textAlign: "center"}}
                                                onClick={() => showLocationDetails()}>
                                    <ListItemText primary={location.locationName} />
                                </ListItemButton>
                            </ListItem>)}

                    </List>
                </Grid>
                <Grid item md={3} sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: "1rem 0"
                }}>
                    <Button sx={{backgroundColor: "#F5793B"}}
                            variant="contained" color="inherit">Add handout</Button>

                </Grid>
                <Grid item md={3} sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: "1rem 0"
                }}>
                    <Button sx={{backgroundColor: "#F5793B"}}
                            variant="contained" color="inherit">Add note</Button>
                </Grid>
                <Grid item md={3} sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: "1rem 0"
                }}>
                    <Button sx={{backgroundColor: "#F5793B"}}
                            variant="contained" color="inherit">Add characters</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default EditScenario;