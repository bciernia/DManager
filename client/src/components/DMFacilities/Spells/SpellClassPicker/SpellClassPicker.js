import {CharacterClasses} from "../../../../utils/dndUtils/CharacterClasses";
import {Checkbox, FormControlLabel, FormGroup, InputLabel, Radio} from "@mui/material";

const SpellClassPicker = props => {
    const characterClasses = Object.entries(CharacterClasses).map(characterClass => characterClass[1]);

    return (
        <>
            <InputLabel>Availability</InputLabel>
            <FormGroup sx={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                {characterClasses.map(characterClass => {
                    return <FormControlLabel onClick={(e) => props.spellClasses(e.target.value)}
                                                             control={<Checkbox />} key={characterClass} label={characterClass} labelPlacement="top" value={characterClass}/>
                })}
            </FormGroup>
        </>
    )
}

export default SpellClassPicker;