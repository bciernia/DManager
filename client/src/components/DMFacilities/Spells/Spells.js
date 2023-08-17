import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    MenuItem,
    Select,
    TextField,
    Typography,
    FormControl,
    Grid,
    InputLabel, List, ListItem, Card, ListItemButton, ListItemText,
} from "@mui/material";
import classes from './Spells.module.css';
import {SpellSchools} from "../../../utils/dndUtils/SpellSchools";
import SpellLevelPicker from "./SpellLevelPicker/SpellLevelPicker";
import SpellClassPicker from "./SpellClassPicker/SpellClassPicker";

const getAllSpells = () =>
    fetch(`http://127.0.0.1:3000/dm/spells/all`)
        .then(res => res.json());

const Spells = () => {
    const spellSchools = Object.entries(SpellSchools).map(school => school[1]);

    const [spellName, setSpellName] = useState('');
    const [spellDescription, setSpellDescription] = useState('');
    const [spellLevel, setSpellLevel] = useState(0);
    const [spellIsAvailableFor, setSpellIsAvailableFor] = useState([]);
    const [spellSchool, setSpellSchool] = useState('');
    const [spellComponents, setSpellComponents] = useState('');
    const [spellRange, setSpellRange] = useState('');
    const [spellDuration, setSpellDuration] = useState('');
    const [spellCastingTime, setSpellCastingTime] = useState('');

    const [spells, setSpells] = useState([]);

    useEffect(() => {
        getAllSpells()
            .then(res => setSpells(res));
    }, []);

    const addClassToArray = (newSpell) => {
        if (spellIsAvailableFor.includes(newSpell)) {
            setSpellIsAvailableFor(spells => spells.filter(chosenSpell => chosenSpell !== newSpell))
        } else {
            setSpellIsAvailableFor(spells => [...spells, newSpell])
        }
    }

    const clearFields = () => {
        setSpellName('');
        setSpellDescription('');
        setSpellLevel(0);
        setSpellComponents('');
        setSpellRange('');
        setSpellDuration('');
        setSpellCastingTime('');
    }

    const addSpellToDb = () => {
        const newSpell = {
            name: spellName,
            description: spellDescription,
            level: spellLevel,
            availableFor: spellIsAvailableFor,
            school: spellSchool,
            components: spellComponents,
            range: spellRange,
            duration: spellDuration,
            castingTime: spellCastingTime,
        }

        fetch(`http://127.0.0.1:3000/dm/spells/newSpell`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(newSpell)
        }).then(res => res.json())
            .catch(() => {
                alert("Something gone wrong!");
            });

        clearFields();
    }

    return (
        <>
            <Typography variant="h5">New spell</Typography>
            <Box sx={{padding: "1rem"}}>
                <Grid container>
                    <Grid item="3" sx={{width: "30rem", display: "flex", flexDirection: "column", marginRight: ".5rem"}}>
                        <TextField sx={{margin: ".5rem 0"}} type="text" label="Name"
                                   inputProps={{maxLength: 50}}
                                   value={spellName}
                                   onChange={(event) => setSpellName(event.currentTarget.value)}/>
                        <TextField sx={{margin: ".5rem 0"}} type="text" inputProps={{maxLength: 15}}
                                   label="Range"
                                   value={spellRange}
                                   onChange={(event) => setSpellRange(event.currentTarget.value)}/>
                        <SpellLevelPicker setSpellLevel={setSpellLevel}/>
                        <SpellClassPicker spellClasses={addClassToArray}/>
                    </Grid>

                    <Grid item="3" sx={{width: "30rem", display: "flex", flexDirection: "column"}}>
                        <TextField sx={{margin: ".5rem 0"}} type="text" inputProps={{maxLength: 15}}
                                   label="Casting time"
                                   value={spellCastingTime}
                                   onChange={(event) => setSpellCastingTime(event.currentTarget.value)}/>
                        <TextField sx={{margin: ".5rem 0"}} type="text" inputProps={{maxLength: 30}}
                                   label="Duration"
                                   value={spellDuration}
                                   onChange={(event) => setSpellDuration(event.currentTarget.value)}/>
                        <TextField sx={{margin: ".5rem 0"}} type="text" inputProps={{maxLength: 100}}
                                   label="Components"
                                   value={spellComponents}
                                   onChange={(event) => setSpellComponents(event.currentTarget.value)}/>
                        <TextField sx={{margin: ".5rem 0"}} type="text" inputProps={{maxLength: 3000}}
                                   multiline
                                   rows={5} label="Description"
                                   value={spellDescription}
                                   onChange={(event) => setSpellDescription(event.currentTarget.value)}/>
                        <FormControl size="small">
                            <InputLabel id="select-spell-school">School</InputLabel>
                            <Select
                                labelId="select-spell-school"
                                label="School"
                                sx={{marginBottom: ".5rem", minWidth: "10rem"}}
                                onChange={(e) => setSpellSchool(e.target.value)}
                            >
                                <MenuItem><em>Choose school</em></MenuItem>
                                {spellSchools.map(school => <MenuItem key={school}
                                                                      value={school}>{school}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <Button sx={{backgroundColor: "#F5793B"}}
                                variant="contained"
                                color="inherit"
                                onClick={addSpellToDb}>Add</Button>
                    </Grid>
                    <Grid item="3">
                        <List sx={{
                            display: "flex",
                            flexDirection: "column",
                            height: "35rem",
                            overflow: "auto",
                            overflowX: "hidden",
                        }}>
                            {spells?.length === 0 &&
                                <Typography variant="h6" textAlign="center">No spells</Typography>}
                            {spells.filter(spell => spell.name.toLowerCase().includes(spellName.toLowerCase())).map((spell) =>
                                <ListItem key={spell._id}
                                          sx={{margin: ".25rem", display: "flex"}}
                                          disablePadding>
                                    <Card sx={{backgroundColor: "whitesmoke", minWidth: 200}}>
                                        <ListItemButton onClick={() => {
                                            console.log(spell)
                                        }}
                                                        sx={{textAlign: "center"}}>
                                            <ListItemText primary={<Typography
                                                variant="body2">{spell.name}</Typography>}/>
                                        </ListItemButton>
                                    </Card>
                                </ListItem>
                            )}
                        </List>
                    </Grid>
                    <Grid item="3">
                        FILTERS
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default Spells;