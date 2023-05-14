import {useNavigate, useParams} from "react-router-dom";
import {
    Box,
    Button,
    Dialog,
    FormControl,
    Grid,
    InputLabel, List, ListItem, ListItemButton, ListItemText,
    MenuItem,
    Select,
    TextField,
    Typography,
    Card
} from "@mui/material";
import React, {useEffect, useState} from "react";
import classes from './EditScenario.module.css';
import noMap from '../../../../../../assets/images/no_map.png';
import PreviewLocationRoom from "./AddLocation/PreviewLocation/PreviewLocationRoom";
import PreviewHandout from "./AddHandout/PreviewHandout/PreviewHandout";

const getScenarioById = (scenarioId) =>
    fetch(`http://127.0.0.1:3000/dm/scenario/${scenarioId}`)
        .then(res => res.json());

const getLocationsForScenario = (scenarioId) =>
    fetch(`http://127.0.0.1:3000/dm/scenario/${scenarioId}/location/all`)
        .then(res => res.json());

const getHandoutsForScenario = (scenarioId) =>
    fetch(`http://127.0.0.1:3000/dm/scenario/${scenarioId}/handout/all`)
        .then(res => res.json());

const EditScenario = () => {
    const {scenarioId} = useParams();
    const navigate = useNavigate();

    const [isEditModeOn, setIsEditModeOn] = useState(false);
    const [scenario, setScenario] = useState({});
    const [handouts, setHandouts] = useState([]);
    const [newScenarioName, setNewScenarioName] = useState();
    const [newScenarioDescription, setNewScenarioDescription] = useState();
    const [newScenarioNotes, setNewScenarioNotes] = useState([]);
    const [newScenarioLocations, setNewScenarioLocations] = useState([]);

    const [note, setNote] = useState('');

    const [chosenLocation, setChosenLocation] = useState({});

    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        Promise.all([
            getScenarioById(scenarioId),
            getLocationsForScenario(scenarioId),
            getHandoutsForScenario(scenarioId),
        ]).then(([scenarioData, locationsData, handoutsData]) => {
            console.log(locationsData);
            setScenario(scenarioData);
            setHandouts(handoutsData);
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

    const addNote = event => {
        event.preventDefault();

        const newNote = {
            note,
            scenarioId,
        }

        scenario.scenarioNotes.push(newNote);

        setNote('');
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

    const deleteLocation = (locationId) => {
        setChosenLocation({});

        fetch(`http://127.0.0.1:3000/dm/scenario/${scenarioId}/${locationId}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
            },
        }).then(res => {
            console.log(res);
            setNewScenarioLocations((locations) => locations.filter(location => location._id !== locationId))
        });
    }

    const editLocation = (locationId) => {
        // navigate(`location/${locationId}`);
    }

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
                            variant="contained" color="inherit">Add character</Button>
                    <Button sx={{backgroundColor: "#F5793B"}}
                            variant="contained" color="inherit" onClick={addHandout}>Add handout</Button></>}</div>
            <Grid container sx={{padding: "1rem"}}>
                <Grid item md={3}
                      sx={{height: "14.5rem", display: "flex", flexDirection: "column", alignItems: "center"}}>
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
                    {!isEditModeOn ? <Typography sx={{overflow: "hidden"}}>{scenario.scenarioDescription}</Typography>
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
                <Grid item md={3} sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
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
                <Grid item md={6}
                      sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flexEnd"}}>
                    <form id="addNoteForm" className={classes['container--form']}
                          onSubmit={(event) => addNote(event)}>
                        <Button form="addNoteForm"
                                sx={{backgroundColor: "#F5793B"}}
                                variant="contained"
                                color="inherit"
                                type="submit">Add note</Button>
                        <TextField sx={{width: "20rem"}} type="text" label="Note"
                                   inputProps={{maxLength: 200}}
                                   rows={3}
                                   multiline
                                   value={note}
                                   required
                                   onChange={(event) => setNote(event.target.value)}/>

                    </form>
                    <List sx={{
                        position: "absolute",
                        top: "17.5rem",
                        width: "20rem",
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignContent: "center",
                    }}>
                        {/*TODO save note to db after adding them*/}
                        {newScenarioNotes.length === 0 &&
                            <Typography variant="h6" textAlign="center">No notes</Typography>}
                        {newScenarioNotes.map(note =>
                            <ListItem sx={{margin: ".25rem"}} key={note.note} disablePadding>
                                <Card sx={{backgroundColor: "whitesmoke", minWidth: 320}}>
                                    <ListItemButton sx={{textAlign: "center"}}>
                                        <ListItemText primary={<Typography variant="body2">{note.note}</Typography>}/>
                                    </ListItemButton>
                                </Card>
                            </ListItem>
                        )}
                    </List>
                </Grid>

                <Grid item md={6}>
                    {chosenLocation._id !== undefined && <Card sx={{backgroundColor: "whitesmoke", padding: ".5rem"}}>
                        {/*<Button sx={{}} variant="contained">Delete location</Button>*/}
                        <div>
                            <Box sx={{width: "100%", height: "100%"}}>
                                <Grid container>
                                    <Grid item md={3} sx={{marginRight: "1rem"}}>
                                        {chosenLocation.locationMap === null &&
                                            <img src={noMap} alt="No uploaded map"
                                                 className={classes["img__preview"]}/>}
                                        {chosenLocation.locationMap &&
                                            <img src={chosenLocation.locationMap} alt="Uploaded image preview"
                                                 className={classes["img__preview"]}
                                                 onClick={previewImg}/>}
                                        <Box sx={{width: "100%", display: "flex", height: "rem"}}>

                                            <Button sx={{width: "6.5rem", margin: ".25rem .5rem .25rem 0"}}
                                                    variant="contained" color="primary"
                                                    onClick={() => (editLocation(chosenLocation._id))}
                                            >Edit
                                            </Button>
                                            <Button sx={{width: "6.5rem", margin: ".25rem .5rem .25rem 0"}}
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() => deleteLocation(chosenLocation._id)}>Delete </Button>
                                        </Box>
                                    </Grid>
                                    <Grid item md={8}>
                                        <Typography variant="h5">
                                            {chosenLocation.locationName}
                                        </Typography>
                                        <Typography>
                                            {chosenLocation.locationDescription}
                                        </Typography>
                                        <div>
                                            {handouts.map(
                                                handout => (handout.handoutLocation === chosenLocation._id.toString()) ?
                                                    <PreviewHandout handout={handout}/>
                                                    : <Typography></Typography>)}
                                        </div>
                                    </Grid>
                                </Grid>
                                <Typography variant="h5">Rooms</Typography>
                                {chosenLocation.locationRooms && chosenLocation.locationRooms.map(room =>
                                    <PreviewLocationRoom room={room} handouts={handouts}/>
                                )}
                            </Box>
                        </div>

                    </Card>}
                </Grid>
                <Grid item md={3}>
                </Grid>
                <Grid item md={3}>
                </Grid>
            </Grid>
        </div>
    )
}

export default EditScenario;