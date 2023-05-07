import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Dialog, List, ListItem, ListItemButton, ListItemText, TextField, Typography} from "@mui/material";
import classes from './AddLocation.module.css';
import Spinner from "../../../../../../UI/Spinner/Spinner";

const AddLocation = () => {
    const {campaignId, scenarioId} = useParams();

    const navigate = useNavigate();

    const [locationName, setLocationName] = useState('');
    const [locationDescription, setLocationDescription] = useState('');
    const [locationMap, setLocationMap] = useState(null);
    const [locationRooms, setLocationRooms] = useState([]);

    const [roomName, setRoomName] = useState('');
    const [roomDescription, setRoomDescription] = useState('');

    const [dialogOpen, setDialogOpen] = useState(false);

    const previewImg = () => {
        setDialogOpen(true);
    }

    const handleClose = () => {
        setDialogOpen(false);
    };

    const addLocation = event => {
        event.preventDefault();

        const location = {
            locationName,
            locationDescription,
            locationMap,
            locationRooms,
            scenarioId,
        }

        fetch(`http://127.0.0.1:3000/dm/scenario/${scenarioId}/newLocation`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(location)
        })
            .then(res => res.json())
            .then(() => navigate(`/dm/campaign/${campaignId}/scenario/${scenarioId}/edit`));
    }

    const addRoom = event => {
        event.preventDefault();

        const newRoom = {
            roomId: '',
            roomName,
            roomDescription,
        }

        locationRooms.push(newRoom);

        setRoomName('');
        setRoomDescription('');
    }

    const handleFileChange = event => {
        const photo = event.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(photo);
        reader.onload = () => {
            setLocationMap(reader.result);
        }
    }

    return (
        <div className={classes.container}>
            <Dialog onClose={handleClose} open={dialogOpen} maxWidth="lg">
                <img src={locationMap} alt="Image preview dialog"/>
            </Dialog>

            <div className={classes["container--form__display"]}>
                <Typography variant="h5" sx={{margin: ".5rem", textAlign: "center"}}>New location</Typography>
                <form id="addLocationForm" className={classes['container--form']}
                      onSubmit={(event) => addLocation(event)}>
                    <TextField sx={{width: "80%"}} type="text" label="Title"
                               inputProps={{maxLength: 50}}
                               required
                               onChange={(event) => setLocationName(event.target.value)}/>
                    <TextField sx={{width: "80%"}} type="text" inputProps={{maxLength: 1000}} multiline
                               rows={5} label="Description"
                               required
                               onChange={(event) => setLocationDescription(event.target.value)}/>
                    <input
                        onChange={handleFileChange}
                        type="file"
                        accept="image/png, image/jpeg"
                        // hidden
                        id="photo"
                        name="photo"
                        multiple
                    />

                </form>
                <Typography variant="h5" sx={{margin: ".5rem", textAlign: "center"}}>New room</Typography>
                <form id="addRoomForm" className={classes['container--form']}
                      onSubmit={(event) => addRoom(event)}>
                    <TextField sx={{width: "80%"}} type="text" label="Name"
                               inputProps={{maxLength: 50}}
                               value={roomName}
                               required
                               onChange={(event) => setRoomName(event.target.value)}/>
                    <TextField sx={{width: "80%"}} type="text" inputProps={{maxLength: 1000}} multiline
                               rows={5} label="Description"
                               value={roomDescription}
                               required

                               onChange={(event) => setRoomDescription(event.target.value)}/>

                    {/*TODO SELECT WITH HANDOUTS FROM THIS LOCATION, CONNECT THEM WITH ROOMS*/}
                    <Button form="addRoomForm"
                            sx={{backgroundColor: "#F5793B"}}
                            variant="contained"
                            color="inherit"
                            type="submit">Add room</Button>
                </form>
                <Button form="addLocationForm"
                        sx={{backgroundColor: "#F5793B", position: "absolute", top: "7.5rem", right: "2rem"}}
                        variant="contained"
                        color="inherit"
                        type="submit">Save location</Button>
            </div>
            <List sx={{
                position: "absolute",
                width: "17.5rem",
                top: "12.5rem",
                right: "2rem",
                border: "solid 2px",
            }}>
                {locationRooms.length === 0 &&
                    <Typography variant="h6" textAlign="center">No rooms</Typography>}
                {locationRooms.map(room =>
                    <ListItem key={room.roomName} disablePadding>
                        <ListItemButton sx={{textAlign: "center"}}>
                            <ListItemText primary={room.roomName}/>
                        </ListItemButton>
                    </ListItem>
                )}
            </List>
            <div>
                {locationMap && <img src={locationMap} alt="Uploaded image preview" className={classes["img__preview"]}
                                     onClick={previewImg}/>}
            </div>
        </div>
    )
}

export default AddLocation;