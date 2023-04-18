import React from "react";
import {useState} from "react";
import {Form, Formik} from "formik";
import FormNavigation from "./FormNavigation";
import {Box, Step, StepLabel, Stepper} from "@mui/material";

const MultiStepForm = ({children, initialValues, onSubmit}, props) => {
    const [stepNumber, setStepNumber] = useState(0)
    const steps = React.Children.toArray(children);
    const [snapshot, setSnapshot] = useState(initialValues);

    const step = steps[stepNumber];
    const totalSteps = steps.length;
    const isLastStep = stepNumber === totalSteps - 1;

    const goToNextStep = values => {
        setSnapshot(values);
        setStepNumber(stepNumber + 1);
    }

    const goToPreviousStep = values => {
        setSnapshot(values);
        setStepNumber(stepNumber - 1);
    }

    const handleSubmit = async (values, actions) => {
        if (step.props.onSubmit) {
            await step.props.onSubmit(values)
        }

        if (isLastStep) {
            return onSubmit(values);
        } else {
            actions.setTouched({});
            goToNextStep(values);
        }
    }

    return (
        <div>
            <Formik initialValues={snapshot} onSubmit={handleSubmit} validationSchema={step.props.validationSchema}>
                {formik =>
                    <Form onSubmit={formik.handleSubmit}>
                        <Stepper activeStep={stepNumber} orientation="vertical"
                        sx={{position: "absolute", top: "1rem", right: "3rem"}}>
                            {steps.map((currentStep) => (
                                <Step key={currentStep.props.stepName}>
                                    <StepLabel>
                                        {currentStep.props.stepName}
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>

                        {step}

                        <FormNavigation
                            isLastStep={isLastStep}
                            hasPrevious={stepNumber > 0}
                            onBackClick={() => goToPreviousStep(formik.values)}
                        />
                    </Form>}
            </Formik>
        </div>
    )
}

export default MultiStepForm;

export const FormStep = ({stepName = "", children}) => children;