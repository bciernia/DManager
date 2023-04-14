import {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import Spinner from "../../../UI/Spinner/Spinner";

const AddCharacter = props => {
    const teamId = props.teamId;

    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const [characterPhoto, setCharacterPhoto] = useState(null);
    const [characterName, setCharacterName] = useState('');
    const [characterClass, setCharacterClass] = useState('');
    const [playerName, setPlayerName] = useState('');

    const setEmptyInputs = () => {
        setCharacterPhoto(null);
        setCharacterName('');
        setCharacterClass('');
        setPlayerName('');
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEmptyInputs();
    };

    const handleFileChange = event => {
        const photo = event.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(photo);
        reader.onload = () => {
            setCharacterPhoto(reader.result);
        }

        console.log(reader.result);
    }

    const inputChangeHandler = (event, setStateFunction) => {
        setStateFunction(event.target.value);
    }

    const createCharacter = () => {
        //TODO check if any of fields is empty
        const newCharacterName = characterName;
        const newCharacterClass = characterClass;
        const newPlayerName = playerName;

        return {
            //TODO change field "name" to "characterName"
            characterPhoto,
            name: newCharacterName,
            characterClass: newCharacterClass,
            playerName: newPlayerName,
            teamId,
        }
    }

    const addNewCharacterHandler = (event) => {
        event.preventDefault();
        setIsLoading(true);

        fetch(`http://127.0.0.1:3000/teams/${teamId}/characters/newCharacter`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(createCharacter())
        }).then(res => res.json())
            .finally(() => {
                setIsLoading(false)
                props.onUpdate();
            });
    }

    return (
        <div>
            {/*TODO add fields validation*/}
            <Button variant="outlined" onClick={handleClickOpen}>
                Open form dialog
            </Button>
            <Dialog fullWidth={true} maxWidth="md" open={open} onClose={handleClose}>
                <DialogTitle>New character</DialogTitle>
                {!isLoading && <DialogContent>
                    {/*<Button*/}
                    {/*    variant="contained"*/}
                    {/*    component="label"*/}
                    {/*>*/}
                        Upload character photo
                        <input
                            onChange={handleFileChange}
                            type="file"
                            accept="image/png, image/jpeg"
                            // hidden
                            id="photo"
                            name="photo"
                            multiple
                        />
                    {/*</Button>*/}

                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Character name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={characterName}
                        onChange={(event) => inputChangeHandler(event, setCharacterName)}
                    />

                    {/*TODO Character class has to be dropdown */}
                    <TextField
                        required
                        margin="dense"
                        id="name"
                        label="Character class"
                        type="text"
                        fullWidth
                        variant="outlined"
                        onChange={(event) => inputChangeHandler(event, setCharacterClass)}
                    />

                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Player name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        onChange={(event) => inputChangeHandler(event, setPlayerName)}
                    />
                    {isLoading && <Spinner />}
                </DialogContent>}
                <DialogActions>
                    <Button variant="outlined" color="error" onClick={handleClose}>Cancel</Button>
                    <Button variant="outlined" color="success" onClick={(event) => {
                        addNewCharacterHandler(event);
                        handleClose();
                    }}>Add character</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddCharacter;