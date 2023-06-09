import {TextareaAutosize, TextField} from "@mui/material";
import {useField} from "formik";

const TextareaInputField = ({label, ...props}) => {
    const [field, meta] = useField(props);

    return (
        <div>
            <TextField fullWidth
                       sx={{width: "40rem"}}
                       multiline
                       maxRows={15}
                       minRows={8}
                       label={label}
                       {...field}
                       {...props}
                       error={meta.touched && Boolean(meta.error)}
                       helperText={meta.touched && meta.error}/>
        </div>
    )
}

export default TextareaInputField;