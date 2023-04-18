import {InputLabel, MenuItem, Select} from "@mui/material";
import {useField} from "formik";

const DropdownInputField = ({label, ...props}) => {
    const [field, meta] = useField(props);

    const {helperText, arrayOfMenuItems, ...selectProps} = props;

    //TODO dropdown error and label/placeholder
    //TODO props
    return (
        <div>
            <InputLabel id={label}>{label}</InputLabel>
            <Select
                labelId={label}
                sx={{margin: ".35rem 0", minWidth: "15rem", maxWidth: "15rem"}}
                {...field}
                {...selectProps}
                error={meta.touched && Boolean(meta.error)}
                helperText={meta.touched && meta.error}
            >

                {props.arrayOfMenuItems.map(type => <MenuItem key={type[0]}
                                                             value={type[0]}>{type[1]}</MenuItem>)}
            </Select>

        </div>
    )
}

export default DropdownInputField;