import {TextField} from "@mui/material";
import {useField} from "formik";

const TextInputField = ({label, ...props}) => {
    const [field, meta] = useField(props);

    return (
        <div>
            <TextField fullWidth
                       label={label}
                       type="text"
                       name={props.name}
                       sx={props.sx}
                       rows={props.rows}
                       multiline={props.multiline}
                       {...field}
                       error={meta.touched && Boolean(meta.error)}
                       helperText={meta.touched && meta.error}/>
        </div>
    )
}

export default TextInputField;