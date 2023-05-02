import classes from './RadioButtonsGroup.module.css';
import {FormControlLabel, Radio, RadioGroup, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";

const RadioButtonsGroup = props => {
    const radioButtonGroup = props.radioButtonGroup;
    const radioButtonOptions = props.radioButtonOptions;

    return (
        <Table sx={{minWidth: 400}} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>{props.columnName[0]}</TableCell>
                    <TableCell align="right">{props.columnName[1]}</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {radioButtonGroup.map((row, index) => (
                    <TableRow
                        key={row.name}
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                    >
                        <TableCell component="th" scope="row">
                            {row[1][0]}
                        </TableCell>

                        <RadioGroup
                            defaultValue="0"
                            onChange={(e) => props.handleChosenRadio(e.target.value, index)}
                        >
                            {radioButtonOptions.map(profLevel => {
                                return <FormControlLabel value={profLevel[0]}
                                                         control={<Radio size="small"/>}
                                                         label={profLevel[1]}

                                                         labelPlacement="end"/>
                            })}
                        </RadioGroup>
                    </TableRow>
                ))}
            </TableBody>
        </Table>

    )
}

export default RadioButtonsGroup;