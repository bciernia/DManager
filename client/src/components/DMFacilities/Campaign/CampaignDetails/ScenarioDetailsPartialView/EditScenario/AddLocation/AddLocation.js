import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button, TextField, Typography} from "@mui/material";
import classes from './AddLocation.module.css';

const AddLocation = () => {
    const {campaignId, scenarioId} = useParams();

    const navigate = useNavigate();

    const [locationName, setLocationName] = useState('');
    const [locationDescription, setLocationDescription] = useState('');
    const [locationMap, setLocationMap] = useState(null);
    const [locationRooms, setLocationRooms] = useState([]);

    const addLocation = event => {
        event.preventDefault();

        const location = {
            locationName,
            locationDescription,
            locationMap,
            locationRooms,
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
            <div className={classes["container--form__display"]}>

                <Typography variant="h5" sx={{marginBottom: "1rem", textAlign: "center"}}>New location</Typography>
                <form className={classes['container--form']} onSubmit={(event) => addLocation(event)}>
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
                    <Button sx={{backgroundColor: "#F5793B", position: "absolute", bottom: 0}} variant="contained"
                            color="inherit"
                            type="submit">Add scenario</Button>
                </form>
            </div>

            <div>
                {locationMap && <img src={locationMap} alt="Uploaded image preview" className={classes["img--preview"]}/>}
            </div>
        </div>
    )
}

export default AddLocation;