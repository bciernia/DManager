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
    Card, Divider
} from "@mui/material";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import classes from './EditScenario.module.css';
import noMap from '../../../../../../assets/images/no_map.png';
import PreviewLocationRoom from "./AddLocation/PreviewLocation/PreviewLocationRoom";
import PreviewHandout from "./AddHandout/PreviewHandout/PreviewHandout";
import PreviewLocation from "../../../../Location/PreviewLocation/PreviewLocation"
import Spinner from "../../../../../UI/Spinner/Spinner";
import PreviewChosenCharacter from "./AddCharacterToScenario/PreviewChosenCharacter/PreviewChosenCharacter";

const getScenarioById = (scenarioId) =>
    fetch(`http://127.0.0.1:3000/dm/scenario/${scenarioId}`)
        .then(res => res.json());

const getLocationsForScenario = (scenarioId) =>
    fetch(`http://127.0.0.1:3000/dm/scenario/${scenarioId}/location/all`)
        .then(res => res.json());

const getHandoutsForScenario = (scenarioId) =>
    fetch(`http://127.0.0.1:3000/dm/scenario/${scenarioId}/handout/all`)
        .then(res => res.json());

const getNotesForScenario = (scenarioId) =>
    fetch(`http://127.0.0.1:3000/dm/scenario/${scenarioId}/notes/all`)
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
    const [notes, setNotes] = useState([]);
    const [newScenarioName, setNewScenarioName] = useState();
    const [newScenarioDescription, setNewScenarioDescription] = useState();
    const [newScenarioLocations, setNewScenarioLocations] = useState([]);
    const [scenarioHandouts, setScenarioHandouts] = useState([]);
    const [editedNote, setEditedNote] = useState('');
    const [chosenNoteId, setChosenNoteId] = useState(0);

    const [chosenLocation, setChosenLocation] = useState({});
    const [chosenCharacter, setChosenCharacter] = useState({});

    const [imageDialogOpen, setImageImageDialogOpen] = useState(false);
    const [noteDialogOpen, setNoteDialogOpen] = useState(false);
    const [characterPreviewDialogOpen, setCharacterPreviewDialogOpen] = useState(false);

    const [scenarioCharacters, setScenarioCharacters] = useState([]);

    const newNoteTextFieldRef = useRef();
    const editNoteTextFieldRef = useRef();

    useEffect(() => {
        Promise.all([
            getScenarioById(scenarioId),
            getLocationsForScenario(scenarioId),
            getHandoutsForScenario(scenarioId),
            getNotesForScenario(scenarioId),
        ]).then(([scenarioData, locationsData, handoutsData, notesData]) => {
            setScenario(scenarioData);
            setHandouts(handoutsData);
            setNotes(notesData);
            setScenarioCharacters(scenarioData.scenarioCharacters);
            setNewScenarioName(scenarioData.scenarioName);
            setNewScenarioDescription(scenarioData.scenarioDescription);
            setNewScenarioLocations(locationsData);
            setScenarioHandouts(handoutsData.filter(handout => handout.handoutLocation === scenarioId));
        })
    }, []);

    const updateScenarioNotes = useCallback(() => {
        getNotesForScenario(scenarioId)
            .then(notesData => setNotes(notesData));
    }, [scenarioId]);

    const changeScenarioName = () => {
        setIsEditModeOn(isEditModeOn => !isEditModeOn);
    }

    const saveForm = () => {
        setIsEditModeOn(isEditModeOn => !isEditModeOn);
        scenario.scenarioName = newScenarioName;
        scenario.scenarioDescription = newScenarioDescription;
    }

    const updateScenarioLocations = (locationId) => {
        setNewScenarioLocations((locations) => locations.filter(location => location._id !== locationId))
    }

    const addNote = async (event) => {
        event.preventDefault();

        const newNote = {
            note: newNoteTextFieldRef.current.value,
            scenarioId,
        }

        newNoteTextFieldRef.current.value = '';

        await fetch(`http://127.0.0.1:3000/dm/scenario/${scenarioId}/newNote`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(newNote)
        });

        await updateScenarioNotes();
    }


    const editNote = async (event) => {
        event.preventDefault();

        const updatedNote = {
            note: editNoteTextFieldRef.current.value,
            scenarioId,
        }

        editNoteTextFieldRef.current.value = '';

        handleNoteDialogClose();

        await fetch(`http://127.0.0.1:3000/dm/scenario/${scenarioId}/notes/${chosenNoteId}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(updatedNote)
        });

        await updateScenarioNotes();
    }

    const deleteNote = async (event) => {
        event.preventDefault();

        handleNoteDialogClose();

        await fetch(`http://127.0.0.1:3000/dm/scenario/${scenarioId}/notes/${chosenNoteId}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
            },
        });

        await updateScenarioNotes();
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

    const handleImageDialogClose = () => {
        setImageImageDialogOpen(false);
    };

    const previewNote = (note) => {
        setEditedNote(note.note);
        setChosenNoteId(note._id);
        setNoteDialogOpen(true);
    }

    const previewCharacter = (character) => {
        setChosenCharacter(character);
        setCharacterPreviewDialogOpen(true);
    }

    const handleNoteDialogClose = () => {
        setNoteDialogOpen(false);
    }

    const handleCharacterPreviewClose = () => {
        setCharacterPreviewDialogOpen(false);
    }

    return (
        <div>
            <Dialog onClose={handleNoteDialogClose} open={noteDialogOpen}>
                <form id="editNoteForm" className={classes['note-dialog']}
                      onSubmit={(event) => editNote(event)}>
                    <TextField sx={{width: "20rem"}} type="text" label="Note"
                               inputProps={{maxLength: 200}}
                               rows={3}
                               multiline
                               defaultValue={editedNote}
                               inputRef={editNoteTextFieldRef}
                               required/>
                    {/*// onChange={(event) => setEditedNote(event.target.value)}/>*/}
                    <div>
                        <Button form="editNoteForm"
                                variant="contained"
                                color="primary"
                                type="submit" sx={{marginRight: "1rem"}}>Update</Button>
                        <Button color="error" variant="contained"
                                onClick={(event) => deleteNote(event, chosenNoteId)}>Delete</Button>
                    </div>
                </form>
            </Dialog>
            <Dialog onClose={handleCharacterPreviewClose} open={characterPreviewDialogOpen} maxWidth="md">
                <Card sx={{padding: ".5rem .5rem"}}>
                    <div className={classes["img-container"]}>
                        <img src={chosenCharacter.characterPhoto} alt="Character photo"
                             className={classes["character-photo"]}/>
                    </div>
                    <Divider/>
                    <Typography>{chosenCharacter.characterName}</Typography>
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
                    <Grid container sx={{padding: "1rem"}}>
                        <PreviewLocation locations={newScenarioLocations} scenarioId={scenarioId}
                                         handouts={handouts} updateScenarioLocations={updateScenarioLocations} isInEditingScenario={true}/>
                    </Grid>
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
                    <Grid container sx={{padding: "1rem"}}>
                        <Grid item md={12}
                              sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <Typography variant="h4" textAlign="center"
                                        sx={{marginBottom: ".5rem"}}>Notes</Typography>

                        </Grid>
                        <div className={classes["add-note-form"]}>
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
                                           inputRef={newNoteTextFieldRef}
                                           required/>
                            </form>
                        </div>
                        <Grid item md={12}>
                            <List sx={{
                                display: "flex",
                                flexDirection: "column",
                            }}>
                                {/*TODO save note to db after adding them*/}
                                {notes?.length === 0 &&
                                    <Typography variant="h6" textAlign="center">No notes</Typography>}
                                {notes.map((note) =>
                                    <ListItem key={note._id}
                                              sx={{margin: ".25rem", display: "flex", justifyContent: "center"}}
                                              disablePadding>
                                        <Card sx={{backgroundColor: "whitesmoke", width: 320}}>
                                            <ListItemButton onClick={() => previewNote(note)}
                                                            sx={{textAlign: "center"}}>
                                                <ListItemText
                                                    primary={<Typography variant="body2">{note.note}</Typography>}/>
                                            </ListItemButton>
                                        </Card>
                                    </ListItem>
                                )}
                            </List>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}
export default EditScenario;