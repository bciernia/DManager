import {CharacterInitialValues} from "../../../utils/dndUtils/CharacterInitialValues";
import {Box, Grid, Typography} from "@mui/material";
import TextInputField from "../../../utils/Form/InputTypes/TextInputField";
import MultiStepForm, {FormStep} from "../../../utils/Form/MultiStepForm";
import {
    characterInfoValidationSchema,
    characterProficienciesValidationSchema,
    characterSkillsValidationSchema,
    characterStatsValidationSchema
} from "../../../utils/Form/ValidationSchemas";
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
    }, []);

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
                    <TextInputField name="characterType" label="" value={CharacterTypes.characterType}
                                    sx={{margin: ".25rem 0"}} isDisabled="true"/>
                    <TextInputField name="characterName" label="Character name" sx={{margin: ".25rem 0"}}/>
                    <TextInputField name="playerName" label="Player name" sx={{margin: ".25rem 0"}}/>
                    <DropdownInputField name="characterClass" label="Character class"
                                        arrayOfMenuItems={characterClassesArray}/>
                    <CheckboxInputField name="isAlive" label="Is alive?"/>
                </FormStep>
                <FormStep
                    stepName="Character statistics"
                    onSubmit={() => console.log('Step2 submit')}
                    validationSchema={characterStatsValidationSchema}>
                    <Typography sx={{width: "100%", textAlign: "center"}}>Character statistics</Typography>

                    <Grid container spacing={2}>
                        <Grid item md={6}>
                            <NumberInputField name="characterStrength" label="Character strength"/>
                            <NumberInputField name="characterDexterity" label="Character dexterity"/>
                            <NumberInputField name="characterConstitution" label="Character constitution"/>
                            <NumberInputField name="characterIntelligence" label="Character intelligence"/>
                            <NumberInputField name="characterWisdom" label="Character wisdom"/>
                            <NumberInputField name="characterCharisma" label="Character charisma"/>
                        </Grid>
                        <Grid item md={6}>
                            <NumberInputField name="characterLevel" label="Character level"/>
                            <NumberInputField name="exp" label="Character experience"/>
                            <NumberInputField name="characterHP" label="Character health points"/>
                            <NumberInputField name="characterSpeed" label="Character speed"/>
                            <NumberInputField name="characterInitiative" label="Character initiative"/>
                            <NumberInputField name="armorClass" label="Armor class"/>
                        </Grid>
                    </Grid>
                </FormStep>
                <FormStep
                    stepName="Character proficiencies"
                    onSubmit={() => console.log("Step3 submit")}
                    validationSchema={characterProficienciesValidationSchema}
                >
                    <Typography>Character saving throws</Typography>
                    <CheckboxInputField name="hasStrengthSavingThrowProficiency" label="Strength"/>
                    <CheckboxInputField name="hasDexteritySavingThrowProficiency" label="Dexterity"/>
                    <CheckboxInputField name="hasConstitutionSavingThrowProficiency" label="Constitution"/>
                    <CheckboxInputField name="hasIntelligenceSavingThrowProficiency" label="Intelligence"/>
                    <CheckboxInputField name="hasWisdomSavingThrowProficiency" label="Wisdom"/>
                    <CheckboxInputField name="hasCharismaSavingThrowProficiency" label="Charisma"/>
                </FormStep>
                <FormStep
                    stepName="Character skills"
                    onSubmit={() => console.log("Step4 submit")}
                    validationSchema={characterSkillsValidationSchema}
                >
                    <Typography sx={{width: "100%", textAlign: "center"}}>Character skills</Typography>
                    <Grid container spacing={2}>
                        <Grid item md={6}>
                            <CheckboxInputField name="hasAcrobatics" label="Acrobatics"/>
                            <CheckboxInputField name="hasAnimalHandling" label="Animal handling"/>
                            <CheckboxInputField name="hasArcana" label="Arcana"/>
                            <CheckboxInputField name="hasAthletics" label="Athletics"/>
                            <CheckboxInputField name="hasDeception" label="Deception"/>
                            <CheckboxInputField name="hasHistory" label="History"/>
                            <CheckboxInputField name="hasInsight" label="Insight"/>
                            <CheckboxInputField name="hasIntimidation" label="Intimidation"/>
                            <CheckboxInputField name="hasInvestigation" label="Investigation"/>
                        </Grid>
                        <Grid item md={6}>
                            <CheckboxInputField name="hasMedicine" label="Medicine"/>
                            <CheckboxInputField name="hasNature" label="Nature"/>
                            <CheckboxInputField name="hasPerception" label="Perception"/>
                            <CheckboxInputField name="hasPerformance" label="Performance"/>
                            <CheckboxInputField name="hasPersuasion" label="Persuasion"/>
                            <CheckboxInputField name="hasReligion" label="Religion"/>
                            <CheckboxInputField name="hasSleightOfHands" label="Sleight of hands"/>
                            <CheckboxInputField name="hasStealth" label="Stealth"/>
                            <CheckboxInputField name="hasSurvival" label="Survival"/>
                        </Grid>
                    </Grid>


                </FormStep>
                {/*<Form*/}
                {/*>*/}
                {/*    <TextareaInputField name="characterBackstory" label="Character backstory"/>*/}
                {/**/}
                {/*</Form>*/}
            </MultiStepForm>
        </Box>
    )
}

export default CreateNewPlayerCharacter;