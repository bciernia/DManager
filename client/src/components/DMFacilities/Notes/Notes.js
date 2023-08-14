import React, {useCallback, useEffect, useRef, useState} from "react";
import {
    Button,
    Card,
    Dialog,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    TextField,
    Typography
} from "@mui/material";
import classes from './Notes.module.css';

const getNotesForScenario = (scenarioId) =>
    fetch(`http://127.0.0.1:3000/dm/scenario/${scenarioId}/notes/all`)
        .then(res => res.json());

const Notes = params => {
    const {scenarioId} = params;

    const [notes, setNotes] = useState([]);
    const [noteDialogOpen, setNoteDialogOpen] = useState(false);
    const [chosenNoteId, setChosenNoteId] = useState(0);
    const [editedNote, setEditedNote] = useState('');

    const newNoteTextFieldRef = useRef();
    const editNoteTextFieldRef = useRef();

    useEffect(() => {
        getNotesForScenario(scenarioId).then(notesData =>{
            setNotes(notesData);
        });
    }, [])

    const updateScenarioNotes = useCallback(() => {
        getNotesForScenario(scenarioId)
            .then(notesData => setNotes(notesData));
    }, [scenarioId]);
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

    const previewNote = (note) => {
        setEditedNote(note.note);
        setChosenNoteId(note._id);
        setNoteDialogOpen(true);
    }
    const handleNoteDialogClose = () => {
        setNoteDialogOpen(false);
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
        </div>
    )
}

export default Notes;