import {useNavigate, useParams} from "react-router-dom";
import {
    Button,
    Card,
    Dialog,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    TextField,
    Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import classes from './EditScenario.module.css';
import PreviewHandout from "./AddHandout/PreviewHandout/PreviewHandout";
import PreviewLocation from "../../../../Location/PreviewLocation/PreviewLocation"
import Notes from "../../../../Notes/Notes";

const getScenarioById = (scenarioId) =>
    fetch(`http://127.0.0.1:3000/dm/scenario/${scenarioId}`)
        .then(res => res.json());

const getHandoutsForScenario = (scenarioId) =>
    fetch(`http://127.0.0.1:3000/dm/scenario/${scenarioId}/handout/all`)
        .then(res => res.json());

const saveNewScenario = (scenarioId, scenario) =>
    fetch(`http://127.0.0.1:3000/dm/scenario/${scenarioId}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(scenario)
    }).then(res => res.json());

const EditScenario = (effect, deps) => {
    const {scenarioId} = useParams();
    const navigate = useNavigate();

    const [isEditModeOn, setIsEditModeOn] = useState(false);
    const [scenario, setScenario] = useState({});
    const [handouts, setHandouts] = useState([]);
    const [newScenarioName, setNewScenarioName] = useState();
    const [newScenarioDescription, setNewScenarioDescription] = useState();
    const [scenarioHandouts, setScenarioHandouts] = useState([]);

    const [chosenCharacter, setChosenCharacter] = useState({});

    const [characterPreviewDialogOpen, setCharacterPreviewDialogOpen] = useState(false);

    const [scenarioCharacters, setScenarioCharacters] = useState([]);

    useEffect(() => {
        Promise.all([
            getScenarioById(scenarioId),
            getHandoutsForScenario(scenarioId),
        ]).then(([scenarioData, handoutsData]) => {
            setScenario(scenarioData);
            setHandouts(handoutsData);
            setScenarioCharacters(scenarioData.scenarioCharacters);
            setNewScenarioName(scenarioData.scenarioName);
            setNewScenarioDescription(scenarioData.scenarioDescription);
            setScenarioHandouts(handoutsData.filter(handout => handout.handoutLocation === scenarioId));
        })
    }, []);

    const changeScenarioName = () => {
        setIsEditModeOn(isEditModeOn => !isEditModeOn);
    }

    const saveForm = () => {
        setIsEditModeOn(isEditModeOn => !isEditModeOn);
        scenario.scenarioName = newScenarioName;
        scenario.scenarioDescription = newScenarioDescription;
    }

    const addLocation = () => {
        navigate(`newLocation`);
    }

    const addCharacter = () => {
        navigate(`newCharacter`);
    }

    const addHandout = () => {
        navigate(`newHandout`);
    }

    const previewCharacter = (character) => {
        setChosenCharacter(character);
        setCharacterPreviewDialogOpen(true);
    }

    const handleCharacterPreviewClose = () => {
        setCharacterPreviewDialogOpen(false);
    }

    return (
        <div>
            <Dialog onClose={handleCharacterPreviewClose} open={characterPreviewDialogOpen} maxWidth="xs">
                <Card sx={{padding: ".5rem .5rem"}}>
                    <div className={classes["img-container"]}>
                        <img src={chosenCharacter.characterPhoto} alt="Character photo"
                             className={classes["character-photo"]}/>
                    </div>
                    <Divider/>
                    <Typography variant="h6">{chosenCharacter.characterName}</Typography>
                    <Typography variant="body">{chosenCharacter.characterDescriptionForScenario}</Typography>
                </Card>
            </Dialog>
            <div className={classes["buttons--container"]}>
                {!isEditModeOn ? <Button variant="contained" onClick={changeScenarioName}>Edit</Button> :
                    <Button onClick={saveForm} variant="contained">Save changes</Button>}
                {!isEditModeOn && <>
                    <Button sx={{backgroundColor: "#F5793B"}}
                            variant="contained" color="inherit" onClick={addLocation}>Add location</Button>
                    <Button sx={{backgroundColor: "#F5793B"}}
                            variant="contained" color="inherit" onClick={addCharacter}>Add character</Button>
                    <Button sx={{backgroundColor: "#F5793B"}}
                            variant="contained" color="inherit" onClick={addHandout}>Add handout</Button></>}</div>
            <Grid container>
                <Grid item md={6}>
                    {!isEditModeOn ? <Typography variant="h5">{scenario.scenarioName}</Typography>
                        :
                        <TextField
                            sx={{width: "80%"}} type="text" label="Title"
                            inputProps={{maxLength: 50}}
                            required
                            defaultValue={newScenarioName}
                            onChange={(event) => setNewScenarioName(event.target.value)}/>
                    }

                    {!isEditModeOn ? <Typography variant="body2" sx={{
                            overflow: "hidden",
                            fontStyle: "italic"
                        }}>{scenario.scenarioDescription}</Typography>
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
                    {!isEditModeOn &&
                        <>
                            <Typography variant="h6">Scenario handouts</Typography>
                            <div>
                                {(scenarioHandouts.length === 0) ? (<Typography>No handouts in scenario</Typography>)
                                    : (scenarioHandouts.map(handout => <PreviewHandout handout={handout}/>))}
                            </div>
                        </>}
                </Grid>
            </Grid>
            <Grid container sx={{padding: "1rem"}}>
                <Grid item md={6}>
                    <PreviewLocation scenarioId={scenarioId} isInEditingScenario={true}/>
                </Grid>
                <Grid item md={3}>
                    <Grid container sx={{padding: "1rem"}}>
                        <Grid item md={12}>
                            <Typography variant="h4" textAlign="center"
                                        sx={{marginBottom: ".5rem"}}>Characters</Typography>
                        </Grid>
                        <Grid item md={12}>
                            <div>
                                <List sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    flexDirection: "column",
                                    alignContent: "center",
                                }}>
                                    {/*TODO many characters as one item in list*/}
                                    {scenarioCharacters?.length === 0 &&
                                        <Typography variant="h6" textAlign="center">No characters</Typography>}
                                    {scenarioCharacters.map((character) =>
                                        <ListItem key={character._id}
                                                  sx={{margin: ".25rem", display: "flex", justifyContent: "center"}}
                                                  disablePadding>
                                            <Card sx={{backgroundColor: "whitesmoke", minWidth: 280}}>
                                                <ListItemButton onClick={() => previewCharacter(character)}
                                                                sx={{textAlign: "center"}}>
                                                    <ListItemText primary={<Typography
                                                        variant="body2">{character.characterName}</Typography>}/>
                                                </ListItemButton>
                                            </Card>
                                        </ListItem>
                                    )}
                                </List>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={3}>
                    <Notes scenarioId={scenarioId} />
                </Grid>
            </Grid>
        </div>
    )
}
export default EditScenario;