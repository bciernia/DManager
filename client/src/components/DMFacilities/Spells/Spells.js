import React, {useState} from "react";
import {Box, Button, MenuItem, Select, TextField, Typography, FormControl, InputLabel} from "@mui/material";
import classes from './Spells.module.css';
import {SpellSchools} from "../../../utils/dndUtils/SpellSchools";
import SpellLevelPicker from "./SpellLevelPicker/SpellLevelPicker";
import SpellClassPicker from "./SpellClassPicker/SpellClassPicker";

const Spells = () => {
    const spellSchools = Object.entries(SpellSchools).map(school => school[1]);

    const [spellName, setSpellName] = useState('');
    const [spellDescription, setSpellDescription] = useState('');
    const [spellLevel, setSpellLevel] = useState(0);
    const [spellAtHigherLvlDescription, setSpellAtHigherLvlDescription] = useState('');
    const [spellDmg, setSpellDmg] = useState('');
    const [spellIsAvailableFor, setSpellIsAvailableFor] = useState([]);
    const [spellSchool, setSpellSchool] = useState('');
    const [spellComponents, setSpellComponents] = useState('');
    const [spellRange, setSpellRange] = useState('');
    const [spellDuration, setSpellDuration] = useState('');
    const [spellCastingTime, setSpellCastingTime] = useState('');

    const [spell, setSpell] = useState({});

    const addClassToArray = (newSpell) => {
        if(spellIsAvailableFor.includes(newSpell)){
            setSpellIsAvailableFor(spells => spells.filter(chosenSpell => chosenSpell !== newSpell))
        }else {
            setSpellIsAvailableFor(spells=> [...spells, newSpell])
        }
    }

    const addSpellToDb = () => {
        const newSpell = {
            name: spellName,
            description: spellDescription,
            level: spellLevel,
            higherLevelDesc: spellAtHigherLvlDescription,
            dmg: spellDmg,
            availableFor: spellIsAvailableFor,
            school: spellSchool,
            components: spellComponents,
            range: spellRange,
            duration: spellDuration,
            castingTime: spellCastingTime,
        }
        setSpell(newSpell);
        console.log(spell);
    }

    return (
        <Box className={classes.spellForm}>
            <Typography variant="h5">Add spell</Typography>
            <TextField sx={{margin: ".5rem 0"}} type="text" label="Name"
                       inputProps={{maxLength: 50}}
                       value={spellName}
                       onChange={(event) => setSpellName(event.target.value)}/>
            <TextField sx={{margin: ".5rem 0"}} type="text" inputProps={{maxLength: 100}}
                       label="Damage"
                       value={spellDmg}
                       onChange={(event) => setSpellDmg(event.target.value)}/>
            <TextField sx={{margin: ".5rem 0"}} type="number" inputProps={{maxLength: 15}}
                       label="Range"
                       value={spellRange}
                       onChange={(event) => setSpellRange(event.target.value)}/>
            <SpellLevelPicker setSpellLevel={setSpellLevel}/>
            <SpellClassPicker spellClasses={addClassToArray} />
            <TextField sx={{margin: ".5rem 0"}} type="text" inputProps={{maxLength: 15}}
                       label="Casting time"
                       value={spellCastingTime}
                       onChange={(event) => setSpellCastingTime(event.target.value)}/>
            <TextField sx={{margin: ".5rem 0"}} type="text" inputProps={{maxLength: 1000}}
                       multiline
                       rows={5} label="Description"
                       value={spellDescription}
                       onChange={(event) => setSpellDescription(event.target.value)}/>
            <TextField sx={{margin: ".5rem 0"}} type="text" inputProps={{maxLength: 1000}}
                       multiline
                       rows={3} label="Higher level description"
                       value={spellAtHigherLvlDescription}
                       onChange={(event) => setSpellAtHigherLvlDescription(event.target.value)}/>
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
            {/*{isFeatureEdited &&*/}
            {/*    <Button sx={{backgroundColor: "#F5793B", margin: ".5rem 0"}}*/}
            {/*            variant="contained"*/}
            {/*            color="inherit"*/}
            {/*            onClick={() => editFeature(editedFeature)}>Update</Button>}*/}
            {/*{isFeatureEdited &&*/}
            {/*    <Button sx={{backgroundColor: "#F5793B"}}*/}
            {/*            variant="contained"*/}
            {/*            color="inherit"*/}
            {/*            onClick={() => deleteFeature(editedFeature)}>Delete*/}
            {/*    </Button>}*/}
            {/*{isFeatureEdited &&*/}
            {/*    <Button sx={{backgroundColor: "#F5793B", margin: ".5rem 0"}}*/}
            {/*            variant="contained"*/}
            {/*            color="inherit"*/}
            {/*            onClick={exitFeatureEdition}>Exit edition*/}
            {/*    </Button>}*/}
        </Box>
    )
}

export default Spells;