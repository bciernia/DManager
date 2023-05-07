import {useNavigate, useParams} from "react-router-dom";
import {
    Box,
    Button,
    Dialog,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import classes from './EditScenario.module.css';

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

    const [chosenLocation, setChosenLocation] = useState({});

    const [dialogOpen, setDialogOpen] = useState(false);

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
        })
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

    const showLocationDetails = (locationId) => {
        setChosenLocation(newScenarioLocations.find(location => location._id === locationId));
    }

    const addLocation = () => {
        navigate(`newLocation`);
    }

    const addHandout = () => {
        navigate(`newHandout`);
    }

    const previewImg = () => {
        setDialogOpen(true);
    }

    const handleClose = () => {
        setDialogOpen(false);
    };

    return (
        <div>
            <Dialog onClose={handleClose} open={dialogOpen} maxWidth="md">
                <img src={chosenLocation.locationMap} alt="Image preview dialog"/>
            </Dialog>
            <div className={classes["buttons--container"]}>
                {!isEditModeOn ? <Button variant="contained" onClick={changeScenarioName}>Edit</Button> :
                    <Button onClick={saveForm} variant="contained">Save changes</Button>}
                {!isEditModeOn && <><Button onClick={saveNewScenario} variant="contained">Submit changes</Button>
                    <Button sx={{backgroundColor: "#F5793B"}}
                            variant="contained" color="inherit" onClick={addLocation}>Add location</Button>
                    <Button sx={{backgroundColor: "#F5793B"}}
                            variant="contained" color="inherit">Add note</Button>
                    <Button sx={{backgroundColor: "#F5793B"}}
                            variant="contained" color="inherit">Add character</Button>
                    <Button sx={{backgroundColor: "#F5793B"}}
                            variant="contained" color="inherit" onClick={addHandout}>Add handout</Button></>}</div>
            <Grid container sx={{padding: "1rem"}}>
                <Grid item md={3} sx={{height: "14.5rem"}}>
                    <Typography variant="h6">
                        Scenario name
                    </Typography>
                    {!isEditModeOn ? <Typography>{scenario.scenarioName}</Typography>
                        :
                        <TextField
                            sx={{width: "80%"}} type="text" label="Title"
                            inputProps={{maxLength: 50}}
                            required
                            defaultValue={newScenarioName}
                            onChange={(event) => setNewScenarioName(event.target.value)}/>
                    }
                    <Typography variant="h6">
                        Scenario description
                    </Typography>
                    {!isEditModeOn ? <Typography>{scenario.scenarioDescription}</Typography>
                        :
                        <TextField
                            sx={{width: "80%"}} type="text" label="Description"
                            inputProps={{maxLength: 1000}}
                            required
                            multiline
                            rows={3}
                            defaultValue={newScenarioDescription}
                            onChange={(event) => setNewScenarioDescription(event.target.value)}/>
                    }
                </Grid>
                <Grid item md={3}>
                    <Typography variant="h4" textAlign="center" sx={{marginBottom: ".5rem"}}>Locations</Typography>
                    <FormControl sx={{minWidth: 250}}>
                        <InputLabel id="select-location-label">Choose location</InputLabel>
                        <Select
                            onChange={(event) => showLocationDetails(event.target.value)}
                            inputProps={{'aria-label': 'Without label'}}
                            labelId="select-location-label"
                            label="Choose location"
                        >
                            {newScenarioLocations.length === 0 && <MenuItem disabled>No locations</MenuItem>}
                            {newScenarioLocations.map(location =>
                                <MenuItem value={location._id}>{location.locationName}</MenuItem>
                            )}
                        </Select>
                    </FormControl>

                </Grid>
                <Grid item md={3}>

                    <Typography variant="h4" textAlign="center" sx={{marginBottom: ".5rem"}}>Notes</Typography>
                    Lista notatek
                </Grid>
                <Grid item md={6}>
                    <Box sx={{width: "100%", height: "100%"}}>
                        <Grid container>
                            <Grid item md={3} sx={{marginRight: "1rem"}}>
                                {/*TODO NO PHOTO, DISPLAY TEXT*/}
                                {chosenLocation.locationMap &&
                                    <img src={chosenLocation.locationMap} alt="Uploaded image preview"
                                         className={classes["img__preview"]}
                                         onClick={previewImg}/>}
                            </Grid>
                            <Grid item md={8}>
                                <Typography variant="h5">
                                    {chosenLocation.locationName}
                                </Typography>
                                <Typography variant="h6">
                                    {chosenLocation.locationDescription}
                                </Typography>
                            </Grid>
                        </Grid>
                        {chosenLocation.locationRooms && <Typography variant="h6">
                            Rooms count: {chosenLocation.locationRooms.length}
                        </Typography>}
                        {chosenLocation.locationRooms &&
                            <Button sx={{backgroundColor: "#F5793B", position: "absolute", left: "1.5rem",}}
                                    variant="contained" color="inherit">Check location details</Button>}
                    </Box>
                </Grid>
                <Grid item md={3}>
                    TEST
                </Grid>
                <Grid item md={3}>
                    TEST
                </Grid>
            </Grid>


        </div>
    )
}

export default EditScenario;