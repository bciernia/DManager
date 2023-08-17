import React, {useState} from "react";
import classes from './Artifacts.module.css';
import {
    Box,
    Button, Card,
    FormControl,
    Grid,
    InputLabel,
    List,
    ListItem, ListItemButton, ListItemText,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import SpellLevelPicker from "../Spells/SpellLevelPicker/SpellLevelPicker";
import SpellClassPicker from "../Spells/SpellClassPicker/SpellClassPicker";
import {ArtifactsTypes} from "../../../utils/dndUtils/ArtifactsTypes";

const Artifacts = props => {
    const artifactTypes = Object.entries(ArtifactsTypes).map(artifact => artifact[1]);

    const [artifactName, setArtifactName] = useState('');
    const [artifactDescription, setArtifactDescription] = useState('');
    const [artifactType, setArtifactType] = useState('');
    const [artifactImg, setArtifactImg] = useState('');

    const clearFields = () => {
        setArtifactName('');
        setArtifactDescription('');
        setArtifactImg('');
    }

    const addArtifactToDb = () => {
        const newArtifact = {
            name: artifactName,
            description: artifactDescription,
            type: artifactType,
            // img: artifactImg,
        }



        fetch(`http://127.0.0.1:3000/dm/artifacts/newArtifact`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(newArtifact)
        }).then(res => res.json())
            .catch(() => {
                alert("Something gone wrong!");
            });

        clearFields();
    }

    return (
        <>
            <Typography variant="h5">New artifact</Typography>
            <Box sx={{padding: "1rem"}}>
                <Grid container>
                    <Grid item="3" sx={{width: "30rem", display: "flex", flexDirection: "column"}}>
                        <TextField sx={{margin: ".5rem 0"}} type="text" label="Name"
                                   inputProps={{maxLength: 50}}
                                   value={artifactName}
                                   onChange={(event) => setArtifactName(event.currentTarget.value)}/>
                        <TextField sx={{margin: ".5rem 0"}} type="text" inputProps={{maxLength: 3000}}
                                   multiline
                                   rows={5} label="Description"
                                   value={artifactDescription}
                                   onChange={(event) => setArtifactDescription(event.currentTarget.value)}/>
                        <FormControl size="small">
                            <InputLabel id="select-spell-school">Type</InputLabel>
                            <Select
                                labelId="select-spell-school"
                                label="School"
                                sx={{marginBottom: ".5rem", minWidth: "10rem"}}
                                onChange={(e) => setArtifactType(e.target.value)}
                            >
                                <MenuItem><em>Choose artifact</em></MenuItem>
                                {artifactTypes.map(artifact => <MenuItem key={artifact}
                                                                         value={artifact}>{artifact}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <Button sx={{backgroundColor: "#F5793B"}}
                                variant="contained"
                                color="inherit"
                                onClick={addArtifactToDb}>Add</Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default Artifacts;