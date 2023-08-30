import classes from './RadioButtonsGroup.module.css';
import {
    FormControlLabel,
    Paper,
    Radio,
    RadioGroup,
    Table,
    TableBody,
    TableCell, TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import RadioButton from "./RadioButton/RadioButton";

const RadioButtonsGroup = props => {
    const radioButtonGroup = props.radioButtonGroup;
    const radioButtonOptions = props.radioButtonOptions;

    return (
        <TableContainer component={Paper}>
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
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    justifyContent: " center",
                                    alignItems: "center",
                                    flexDirection: "row"
                                }}
                            >
                                {radioButtonOptions.map(profLevel => {
                                    return (
                                        <div>
                                            {profLevel[1][0]}
                                            <FormControlLabel
                                                value={profLevel[0]}
                                                // control={<RadioButton label={profLevel[1]}/>}
                                                label={" "}
                                                control={<Radio size="small"/>}
                                                labelPlacement="end"/>
                                        </div>
                                    )
                                })}
                            </RadioGroup>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default RadioButtonsGroup;