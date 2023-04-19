import {TextField} from "@mui/material";
import {useField} from "formik";

const NumberInputField = ({label, ...props}) => {
    const [field, meta] = useField(props);

    return (
        <div>
            <TextField fullWidth
                       InputProps={{
                           inputProps: {
                               min: 0, max: 30
                           }
                       }}
                       sx={{margin: ".25rem 0", minWidth: "10rem", maxWidth: "10rem"}}
                       label={label}
                       type="number"
                       name={props.name}
                       {...field}
                       error={meta.touched && Boolean(meta.error)}
                       helperText={meta.touched && meta.error}/>
        </div>
    )
}

export default NumberInputField;