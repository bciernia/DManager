import React, {useState} from "react";
import {Box, Button, TextField, Typography} from "@mui/material";
import SpellLevelPicker from "./SpellLevelPicker/SpellLevelPicker";
import classes from './Spells.module.css';

const Spells = () => {
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

    const addSpellToDb = () => {
        console.log(spellLevel)
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
            <TextField sx={{margin: ".5rem 0"}} type="text" inputProps={{maxLength: 15}}
                       label="Casting time(sec.)"
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