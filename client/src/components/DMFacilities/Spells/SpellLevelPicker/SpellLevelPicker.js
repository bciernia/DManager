import {FormControlLabel, Radio, RadioGroup, Typography} from "@mui/material";
import classes from './SpellLevelPicker.module.css';

const SpellLevelPicker = props => {
    const spellLevels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <div>
            <Typography>Level</Typography>
            <RadioGroup
                defaultValue="0"
                onChange={(e) => props.setSpellLevel(e.target.value)}
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                }}
            >
                {spellLevels.map(spellLevel => {
                    return <FormControlLabel key={spellLevel}
                                             value={spellLevel}
                                             control={<Radio size="small"/>}
                                             label={spellLevel}
                                             labelPlacement="top"
                                             sx={{margin: "0 .125rem"}}
                    />
                })}
            </RadioGroup>
        </div>
    )
}

export default SpellLevelPicker;