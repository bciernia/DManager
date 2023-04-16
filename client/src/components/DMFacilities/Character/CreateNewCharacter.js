import {Formik} from "formik";
import {CharacterInitialValues} from "../../../utils/dndUtils/CharacterInitialValues";
import {Box, Button, TextField} from "@mui/material";
import * as yup from 'yup'
import InputField from "../../../utils/InputField";
import MultiStepForm, {FormStep} from "../../../utils/MultiStepForm";

//TODO finish validation schemas
const characterInfoValidationSchema = yup.object({
    characterName: yup.string().required('Character name is required'),
    playerName: yup.string().required('Player name is required'),
    characterType: yup.string().required('Character type is required'),
    characterClass: yup.string().required('Character class is required'),
    characterRace: yup.string().required('Character race is required'),
    characterBackground: yup.string().required('Character background is required'),
    characterBackstory: yup.string().length(1000, "Backstory cannot be longer than 1000 characters"),
});

const characterStatsValidationSchema = yup.object({
    characterStrength: yup.number().min(1, "Stat has to be higher than 1").max(30, "Stat has to be lower than 30").required("Strength is required"),
    characterDexterity: yup.number().min(1, "Stat has to be higher than 1").max(30, "Stat has to be lower than 30").required("Dexterity is required"),
    characterConstitution: yup.number().min(1, "Stat has to be higher than 1").max(30, "Stat has to be lower than 30").required("Constitution is required"),
    characterIntelligence: yup.number().min(1, "Stat has to be higher than 1").max(30, "Stat has to be lower than 30").required("Intelligence is required"),
    characterWisdom: yup.number().min(1, "Stat has to be higher than 1").max(30, "Stat has to be lower than 30").required("Wisdom is required"),
    characterCharisma: yup.number().min(1, "Stat has to be higher than 1").max(30, "Stat has to be lower than 30").required("Charisma is required"),
});

const CreateNewCharacter = () => {
    return (
        <Box sx={{height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <MultiStepForm initialValues={CharacterInitialValues}
                           onSubmit={values => {
                               console.log(values, null, 2)
                           }}
            >
                {/*TODO finish adding character form*/}
                <FormStep
                    stepName="Character info"
                    onSubmit={() => console.log('Step1 submit')}
                    validationSchema={characterInfoValidationSchema}>
                    <InputField name="characterName" label="Character name" sx={{margin: ".25rem 0"}}/>
                    <InputField name="playerName" label="Player name" sx={{margin: ".25rem 0"}}/>
                </FormStep>
                <FormStep
                    stepName="Character skills"
                    onSubmit={() => console.log('Step2 submit')}
                    validationSchema={characterStatsValidationSchema}>
                    <InputField name="characterStrength" label="Character strength"
                                sx={{margin: ".25rem 0", minWidth: "10rem", maxWidth: "20rem"}}/>
                    <InputField name="characterDexterity" label="Character dexterity" sx={{margin: ".25rem 0"}}/>
                    <InputField name="characterDexterity" label="Character dexterity" sx={{margin: ".25rem 0"}}/>
                    <InputField name="characterDexterity" label="Character dexterity" sx={{margin: ".25rem 0"}}/>
                    <InputField name="characterDexterity" label="Character dexterity" sx={{margin: ".25rem 0"}}/>
                    <InputField name="characterDexterity" label="Character dexterity" sx={{margin: ".25rem 0"}}/>
                </FormStep>
            </MultiStepForm>
        </Box>
    )
}

export default CreateNewCharacter;