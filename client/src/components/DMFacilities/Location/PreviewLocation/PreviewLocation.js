import {Box, Button, Card, Dialog, FormControl, Grid, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import noMap from "../../../../assets/images/no_map.png";
import classes from "../../Campaign/CampaignDetails/ScenarioDetailsPartialView/EditScenario/EditScenario.module.css";
import PreviewHandout
    from "../../Campaign/CampaignDetails/ScenarioDetailsPartialView/EditScenario/AddHandout/PreviewHandout/PreviewHandout";
import PreviewLocationRoom
    from "../../Campaign/CampaignDetails/ScenarioDetailsPartialView/EditScenario/AddLocation/PreviewLocation/PreviewLocationRoom";
import {useNavigate} from "react-router-dom";

const getLocationsForScenario = (scenarioId) =>
    fetch(`http://127.0.0.1:3000/dm/scenario/${scenarioId}/location/all`)
        .then(res => res.json());

const getHandoutsForScenario = (scenarioId) =>
    fetch(`http://127.0.0.1:3000/dm/scenario/${scenarioId}/handout/all`)
        .then(res => res.json());

const PreviewLocation = props => {

    const navigate = useNavigate();
    const [imageDialogOpen, setImageImageDialogOpen] = useState(false);
    const [chosenLocation, setChosenLocation] = useState({});
    const [locationHandouts, setLocationHandouts] = useState([]);
    const [scenarioLocations, setScenarioLocations] = useState([]);

    useEffect(() => {
        Promise.all([
            getLocationsForScenario(props.scenarioId),
            getHandoutsForScenario(props.scenarioId),
        ]).then(([locations, handouts]) => {
            setScenarioLocations(locations);
            setLocationHandouts(handouts);
        })
    }, []);

    const editLocation = (locationId) => {
        navigate(`location/${locationId}`);
    }

    const deleteLocation = (locationId) => {
        setChosenLocation({});

        fetch(`http://127.0.0.1:3000/dm/scenario/${props.scenarioId}/${locationId}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
            },
        }).then(res => {
            setScenarioLocations((locations) => locations.filter(location => location._id !== locationId))
        });
    }

    const showLocationDetails = (locationId) => {
        setChosenLocation(scenarioLocations.find(location => location._id === locationId));
    }

    const previewImg = () => {
        setImageImageDialogOpen(true);
    }

    const handleImageDialogClose = () => {
        setImageImageDialogOpen(false);
    };

    return (
        <>
            <Dialog onClose={handleImageDialogClose} open={imageDialogOpen} maxWidth="md">
                <img src={chosenLocation.locationMap} alt="Image preview dialog"/>
            </Dialog>
            <Grid container sx={{padding: "1rem"}}>

                <Grid item md={12} sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <Typography variant="h4" textAlign="center"
                                sx={{marginBottom: ".5rem"}}>Locations</Typography>
                    <FormControl sx={{minWidth: 250}}>
                        <InputLabel id="select-location-label">Choose location</InputLabel>
                        <Select
                            onChange={(event) => showLocationDetails(event.target.value)}
                            inputProps={{'aria-label': 'Without label'}}
                            labelId="select-location-label"
                            label="Choose location"
                        >
                            {scenarioLocations.length === 0 && <MenuItem disabled>No locations</MenuItem>}
                            {scenarioLocations.map(location =>
                                <MenuItem value={location._id}>{location.locationName}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md={12} sx={{marginTop: ".5rem"}}>
                    {chosenLocation._id !== undefined &&
                        <Card sx={{backgroundColor: "whitesmoke", padding: ".5rem"}}>
                            {/*<Button sx={{}} variant="contained">Delete location</Button>*/}
                            <div>
                                <Box sx={{width: "100%", height: "100%"}}>
                                    <Grid container>
                                        <Grid item md={3} sx={{marginRight: "1rem"}}>
                                            {chosenLocation.locationMap === null &&
                                                <img src={noMap} alt="No uploaded map"
                                                     className={classes["img__preview"]}/>}
                                            {chosenLocation.locationMap &&
                                                <img src={chosenLocation.locationMap}
                                                     alt="Uploaded image preview"
                                                     className={classes["img__preview"]}
                                                     onClick={previewImg}/>}
                                            <Box sx={{width: "100%", display: "flex", height: "rem"}}>

                                                {props.isInEditingScenario &&
                                                    <>
                                                        <Button sx={{width: "6.5rem", margin: ".25rem .5rem .25rem 0"}}
                                                                variant="contained" color="primary"
                                                                onClick={() => (editLocation(chosenLocation._id))}
                                                        >Edit
                                                        </Button>
                                                        <Button sx={{width: "6.5rem", margin: ".25rem .5rem .25rem 0"}}
                                                                variant="contained"
                                                                color="error"
                                                                onClick={() => deleteLocation(chosenLocation._id)}>Delete</Button>
                                                    </>
                                                }
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
                                                {locationHandouts.map(
                                                    handout => (handout.handoutLocation === chosenLocation._id.toString()) ?
                                                        <PreviewHandout handout={handout}/>
                                                        : <Typography></Typography>)}
                                            </div>
                                        </Grid>
                                    </Grid>
                                    {chosenLocation.locationRooms.length !== 0 &&
                                        <Typography variant="h5">Rooms</Typography>}
                                    {chosenLocation.locationRooms && chosenLocation.locationRooms.map(room =>
                                        <PreviewLocationRoom room={room} handouts={locationHandouts}/>
                                    )}
                                </Box>
                            </div>
                        </Card>}
                </Grid>
            </Grid>
        </>
    )
};

export default PreviewLocation;