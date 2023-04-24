import {useField} from "formik";
import {
    Button,
    InputLabel, MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";

const DataTableHandler = ({label, ...props}) => {
    const {arrayToRender, tableHeaders} = props;
    const tableHeadersLength = tableHeaders.length;
    // const [field, meta] = useField(props);

    console.log(arrayToRender);

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 400}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {tableHeaders.map(item => <TableCell>{item}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableHeadersLength !== 1 && arrayToRender.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {row.proficiency}
                                </TableCell>

                                <TableCell>{row.level}</TableCell>
                            </TableRow>
                        ))}

                        {tableHeadersLength === 1 && arrayToRender.map((row) => (
                            <TableRow
                                key={row}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {row}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}

export default DataTableHandler;