import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {
    Button,
    Dialog, Divider,
    FormControl,
    InputLabel,
    ListSubheader,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import classes from './AddHandout.module.css';

const getLocationsForScenario = (scenarioId) =>
    fetch(`http://127.0.0.1:3000/dm/scenario/${scenarioId}/location/all`)
        .then(res => res.json());

const AddHandout = () => {
    const {campaignId, scenarioId} = useParams();

    const navigate = useNavigate();

    const [handoutName, setHandoutName] = useState('');
    const [handoutDescription, setHandoutDescription] = useState('');
    const [handoutPhoto, setHandoutPhoto] = useState(null);
    const [handoutLocation, setHandoutLocation] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const [scenarioLocations, setScenarioLocations] = useState([]);

    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        getLocationsForScenario(scenarioId)
            .then(data => {
                setScenarioLocations(data)
                setIsLoading(false)
            });
    }, [])

    const previewImg = () => {
        setDialogOpen(true);
    }

    const handleClose = () => {
        setDialogOpen(false);
    };

    const addLocation = event => {
        event.preventDefault();

        const handout = {
            handoutName,
            handoutDescription,
            handoutPhoto,
            handoutLocation,
            scenarioId,
        }

        fetch(`http://127.0.0.1:3000/dm/scenario/${scenarioId}/newHandout`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(handout)
        })
            .then(res => res.json())
            .then(() => navigate(`/dm/campaign/${campaignId}/scenario/${scenarioId}/edit`));
    }

    const convertLocationsToSelectWithHeaders = (locations) => {
        const locationArray = [];

        for (let i = 0; i < locations.length; i++) {
            locationArray.push({
                id: locations[i]._id,
                name: locations[i].locationName,
                isHeader: true,
            })
            for (let j = 0; j < locations[i].locationRooms.length; j++) {
                locationArray.push({
                    id: locations[i].locationRooms[j].roomId,
                    name: locations[i].locationRooms[j].roomName,
                })
            }
        }

        return locationArray;
    }

    const convertedScenarioLocationData = convertLocationsToSelectWithHeaders(scenarioLocations);

    const handleFileChange = event => {
        const photo = event.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(photo);
        reader.onload = () => {
            setHandoutPhoto(reader.result);
        }
    }

    const handleChange = (event) => {
        setHandoutLocation(event.target.value);
    }

    const [selectedRoom, setSelectedRoom] = useState('');

    return (
        <div className={classes.container}>
            <Dialog onClose={handleClose} open={dialogOpen} maxWidth="lg">
                <img src={handoutPhoto} alt="Image preview dialog" className={classes.imgDialogPreview}/>
            </Dialog>
            <div className={classes["container--form__display"]}>
                <Typography variant="h5" sx={{margin: ".5rem", textAlign: "center"}}>New handout</Typography>
                <form id="addLocationForm" className={classes['container--form']}
                      onSubmit={(event) => addLocation(event)}>
                    <TextField sx={{width: "80%"}} type="text" label="Title"
                               inputProps={{maxLength: 50}}
                               required
                               onChange={(event) => setHandoutName(event.target.value)}/>
                    <TextField sx={{width: "80%"}} type="text" inputProps={{maxLength: 1000}} multiline
                               rows={5} label="Description"
                               required
                               onChange={(event) => setHandoutDescription(event.target.value)}/>
                    <input
                        onChange={handleFileChange}
                        type="file"
                        accept="image/png, image/jpeg, application/pdf"
                        // hidden
                        id="photo"
                        name="photo"
                        multiple
                    />

                </form>
                <Button form="addLocationForm"
                        sx={{backgroundColor: "#F5793B", position: "absolute", top: "7.5rem", right: "2rem"}}
                        variant="contained"
                        color="inherit"
                        type="submit">Save handout</Button>
            </div>
            <div>
                {handoutPhoto &&
                    <img src={handoutPhoto} alt="Uploaded image preview" className={classes["img__preview"]}
                         onClick={previewImg}/>}
            </div>
            <div>
                <FormControl sx={{m: 1, minWidth: 250}}>
                    <InputLabel htmlFor="grouped-select">Handout location</InputLabel>
                    <Select
                        value={handoutLocation}
                        onChange={(event) => handleChange(event)}
                        id="grouped-select"
                        label="Handout location"
                        MenuProps={{PaperProps: {sx: {maxHeight: 300}}}}
                    >
                        <MenuItem sx={{height: "2.25rem"}} value={scenarioId}>
                            <p>Scenario</p>
                        </MenuItem>

                        {convertedScenarioLocationData.map(data =>
                            <MenuItem sx={{height: "2.25rem"}} value={data.id}><p className={data.isHeader && classes["select--header"]}
                            >{data.name}</p>
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>
            </div>
        </div>
    )
}

export default AddHandout;