import {CharacterInitialValues} from "../../../utils/dndUtils/CharacterInitialValues";
import {Box, Button, TextField, Typography} from "@mui/material";
import TextInputField from "../../../utils/Form/InputTypes/TextInputField";
import MultiStepForm, {FormStep} from "../../../utils/Form/MultiStepForm";
import {characterInfoValidationSchema, characterStatsValidationSchema} from "../../../utils/Form/ValidationSchemas";
import NumberInputField from "../../../utils/Form/InputTypes/NumberInputField";
import DropdownInputField from "../../../utils/Form/InputTypes/DropdownInputField";
import {CharacterClasses} from "../../../utils/dndUtils/CharacterClasses";
import {CharacterTypes} from "../../../utils/dndUtils/CharacterTypes";
import {ConditionTypes} from "../../../utils/dndUtils/ConditionTypes";
import {DamageTypes} from "../../../utils/dndUtils/DamageTypes";
import TextareaInputField from "../../../utils/Form/InputTypes/TextareaInputField";
import CheckboxInputField from "../../../utils/Form/InputTypes/CheckboxInputField";
import {useEffect} from "react";

const CreateNewPlayerCharacter = () => {
    const characterClassesArray = Object.entries(CharacterClasses);
    const characterTypesArray = Object.entries(CharacterTypes);
    const conditionTypesArray = Object.entries(ConditionTypes);
    const damageTypesArray = Object.entries(DamageTypes);

    useEffect(() => {
    CharacterInitialValues.characterType = CharacterTypes.playerCharacter;
    },[]);

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
                    <Typography>New player character</Typography>
                    <TextInputField name="characterType" label="" value={CharacterTypes.playerCharacter}
                                    sx={{margin: ".25rem 0"}} isDisabled={true}/>
                    <TextInputField name="characterName" label="Character name" sx={{margin: ".25rem 0"}}/>
                    <TextInputField name="playerName" label="Player name" sx={{margin: ".25rem 0"}}/>
                    <DropdownInputField name="characterClass" label="Character class"
                                        arrayOfMenuItems={characterClassesArray}/>
                    <TextareaInputField name="characterBackstory" label="Character backstory"/>
                    <CheckboxInputField name="isAlive" label="Is alive"/>
                </FormStep>
                <FormStep
                    stepName="Character skills"
                    onSubmit={() => console.log('Step2 submit')}
                    validationSchema={characterStatsValidationSchema}>
                    <NumberInputField name="characterStrength" label="Character strength"/>
                    <NumberInputField name="characterDexterity" label="Character dexterity"/>
                    <NumberInputField name="characterConstitution" label="Character constitution"/>
                    <NumberInputField name="characterIntelligence" label="Character intelligence"/>
                    <NumberInputField name="characterWisdom" label="Character wisdom"/>
                    <NumberInputField name="characterCharisma" label="Character charisma"/>
                </FormStep>
            </MultiStepForm>
        </Box>
    )
}

export default CreateNewPlayerCharacter;