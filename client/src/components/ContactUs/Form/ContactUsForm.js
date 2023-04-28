import {FormControl, Input, InputLabel, TextField} from "@mui/material";
import {Form, Formik} from "formik";
import {FormStep} from "../../../utils/Form/MultiStepForm";
import {mailValidationSchema} from "../../../utils/Form/ValidationSchemas";

const ContactUsForm = (onSubmit) => {

    const sendMail = () => {

    }

    const handleSubmit = async (values) => {
        return onSubmit(values);
    }

    return (
        <div>
            <Formik onSubmit={handleSubmit} validationSchema={mailValidationSchema}>
                {formik =>
                    <Form onSubmit={formik.handleSubmit}>


                    </Form>
                }
            </Formik>
        </div>
    )
}

export default ContactUsForm;