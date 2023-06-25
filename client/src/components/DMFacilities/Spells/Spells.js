import React, {useState} from "react";
import {
    Box,
    Button,
    MenuItem,
    Select,
    TextField,
    Typography,
    FormControl,
    Grid,
    InputLabel,
} from "@mui/material";
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
    const [spellMaterialComponent, setSpellMaterialComponent] = useState('');
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
            materialComponent: spellMaterialComponent,
            range: spellRange,
            duration: spellDuration,
            castingTime: spellCastingTime,
        }

        setSpell(newSpell);

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
    }

    return (
        <Box className={classes.spellForm}>
            <Grid container>
                <Grid md item="6" sx={{display: "flex", flexDirection: "column", marginRight: ".5rem"}}>
                    <Typography variant="h5">New spell</Typography>
                    <TextField sx={{margin: ".5rem 0"}} type="text" label="Name"
                               inputProps={{maxLength: 50}}
                               value={spellName}
                               onChange={(event) => setSpellName(event.currentTarget.value)}/>
                    <TextField sx={{margin: ".5rem 0"}} type="text" inputProps={{maxLength: 100}}
                               label="Damage"
                               value={spellDmg}
                               onChange={(event) => setSpellDmg(event.currentTarget.value)}/>
                    <TextField sx={{margin: ".5rem 0"}} type="text" inputProps={{maxLength: 15}}
                               label="Range"
                               value={spellRange}
                               onChange={(event) => setSpellRange(event.currentTarget.value)}/>
                    <SpellLevelPicker setSpellLevel={setSpellLevel}/>
                    <SpellClassPicker spellClasses={addClassToArray} />
                </Grid>

                <Grid md item="6" sx={{display: "flex", flexDirection: "column"}}>
                    <TextField sx={{margin: ".5rem 0"}} type="text" inputProps={{maxLength: 15}}
                               label="Casting time"
                               value={spellCastingTime}
                               onChange={(event) => setSpellCastingTime(event.currentTarget.value)}/>
                    <TextField sx={{margin: ".5rem 0"}} type="text" inputProps={{maxLength: 15}}
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
                    <TextField sx={{margin: ".5rem 0"}} type="text" inputProps={{maxLength: 1000}}
                               multiline
                               rows={3} label="Higher level description"
                               value={spellAtHigherLvlDescription}
                               onChange={(event) => setSpellAtHigherLvlDescription(event.currentTarget.value)}/>
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
                </Grid>
            </Grid>
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