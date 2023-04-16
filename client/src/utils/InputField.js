import {TextField} from "@mui/material";
import {useField} from "formik";
import {type} from "@testing-library/user-event/dist/type";
import {getQueriesForElement} from "@testing-library/react";

const InputField = ({label, ...props}) => {
    const [field, meta] = useField(props);

    const getFieldType = () => {
        if(typeof field.value === "boolean"){
            return "checkbox";
        } else if (typeof field.value === "number"){
            return "number"
        }

        return "text";
    }

    return (
        <div>
            <TextField fullWidth
                       InputProps={{
                           inputProps: {
                               min: 0, max: 30
                           }
                       }}
                       label={label}
                       type={getFieldType()}
                       {...field}
                       {...props}
                       error={meta.touched && Boolean(meta.error)}
                       helperText={meta.touched && meta.error}/>
        </div>
    )
}

export default InputField;