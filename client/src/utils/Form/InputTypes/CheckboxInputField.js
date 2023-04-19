import {Checkbox, FormControlLabel, MenuItem, Select, TextField} from "@mui/material";
import {useField} from "formik";

const CheckboxInputField = ({label, ...props}) => {
    const [field, meta] = useField(props);

    //TODO default value of checkbox

    return (
        <div>
            <FormControlLabel control={
                <Checkbox
                    checked={field.value}
                    {...field}
                    {...props}
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}/>
            } label={label}/>
        </div>
    )
}

export default CheckboxInputField;