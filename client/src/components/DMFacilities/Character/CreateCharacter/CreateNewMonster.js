import {CharacterTypes} from "../../../../utils/dndUtils/CharacterTypes";
import {ConditionTypes} from "../../../../utils/dndUtils/ConditionTypes";
import {DamageTypes} from "../../../../utils/dndUtils/DamageTypes";
import {
    Box,
    Button, Dialog,
    Divider,
    Grid,
    InputLabel,
    List,
    ListItem, ListItemButton, ListItemText,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import MultiStepForm, {FormStep} from "../../../../utils/Form/MultiStepForm";
import {
    characterSavingThrowsValidationSchema,
    monsterStatsValidationSchema
} from "../../../../utils/Form/ValidationSchemas";
import DropdownInputField from "../../../../utils/Form/InputTypes/DropdownInputField";
import TextInputField from "../../../../utils/Form/InputTypes/TextInputField";
import NumberInputField from "../../../../utils/Form/InputTypes/NumberInputField";
import React, {useEffect, useState} from "react";
import {LanguageProficiencies} from "../../../../utils/dndUtils/LanguageProficiencies";
import {ProficiencyLevel} from "../../../../utils/dndUtils/ProficiencyLevel";
import {SavingThrows} from "../../../../utils/dndUtils/SavingThrows";
import {SkillProficiencies} from "../../../../utils/dndUtils/SkillProficiencies";
import {CharacterRaces} from "../../../../utils/dndUtils/CharacterRaces";
import {CharacterAlignments} from "../../../../utils/dndUtils/CharacterAlignments";
import {useNavigate} from "react-router-dom";
import RadioButtonsGroup from "../../../../utils/Form/InputTypes/RadioButtons/RadioButtonsGroup";
import DataTableHandler from "../../../../utils/Form/Table/DataTableHandler";
import {MonsterInitialValues} from "../../../../utils/dndUtils/MonsterInitialValues";
import {CharacterSize} from "../../../../utils/dndUtils/CharacterSize";
import {MonsterType} from "../../../../utils/dndUtils/MonsterType";
import classes from './CreateNewMonster.module.css'

const CreateNewMonster = () => {
    const monsterTypeArray = Object.entries(MonsterType)
    const characterSizeArray = Object.entries(CharacterSize);
    const conditionTypes = Object.entries(ConditionTypes);
    const damageTypes = Object.entries(DamageTypes);
    const languageProficiences = Object.entries(LanguageProficiencies);
    const proficiencyLevel = Object.entries(ProficiencyLevel);
    const savingThrows = Object.entries(SavingThrows);
    const skillProficiencies = Object.entries(SkillProficiencies);
    const characterRaceArray = Object.entries(CharacterRaces);
    const characterAlignmentArray = Object.entries(CharacterAlignments);

    const initialSavingThrows = savingThrows.map(item => {
        return {proficiency: item[1][0], level: '0'};
    });

    const initialSkills = skillProficiencies.map(item => {
        return {proficiency: item[1][0], level: '0'};
    });

    const [isLoading, setIsLoading] = useState(false);

    const [characterPhoto, setCharacterPhoto] = useState(null);

    const [chosenProfLevel, setChosenProfLevel] = useState('');

    const [chosenLanguageAndLevel, setChosenLanguageAndLevel] = useState([]);
    const [chosenLanguageProf, setChosenLanguageProf] = useState('')

    const [characterVulnerabilities, setCharacterVulnerabilities] = useState([]);
    const [chosenVulnerability, setChosenVulnerability] = useState('');

    const [characterImmunities, setCharacterImmunities] = useState([]);
    const [chosenImmunity, setChosenImmunity] = useState('');

    const [characterResistances, setCharacterResistances] = useState([]);
    const [chosenResistance, setChosenResistance] = useState('');

    const [characterConditionImmunities, setCharacterConditionImmunities] = useState([]);
    const [chosenConditionImmunity, setChosenConditionImmunity] = useState('');

    const [chosenSkillAndLevel, setChosenSkillAndLevel] = useState(initialSkills);

    const [chosenSavingThrowsAndLevel, setChosenSavingThrowsAndLevel] = useState(initialSavingThrows);

    const [characterFeaturesAndTraits, setCharacterFeaturesAndTraits] = useState([]);

    const [featureName, setFeatureName] = useState('');
    const [featureDescription, setFeatureDescription] = useState('');
    const [featureDmg, setFeatureDmg] = useState('');
    const [featureHitBonus, setFeatureHitBonus] = useState('');
    const [featureReach, setFeatureReach] = useState('');

    const [editedFeature, setEditedFeature] = useState('');
    const [isFeatureEdited, setIsFeatureEdited] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        MonsterInitialValues.characterType = CharacterTypes.monster;

        MonsterInitialValues.characterStrength = randomNumber(1, 30);
        MonsterInitialValues.characterDexterity = randomNumber(1, 30);
        MonsterInitialValues.characterConstitution = randomNumber(1, 30);
        MonsterInitialValues.characterIntelligence = randomNumber(1, 30);
        MonsterInitialValues.characterWisdom = randomNumber(1, 30);
        MonsterInitialValues.characterCharisma = randomNumber(1, 30);
        MonsterInitialValues.characterProficiencyBonus = randomNumber(1, 30);
        MonsterInitialValues.characterInitiative = randomNumber(1, 30);
        MonsterInitialValues.exp = randomNumber(1, 400000);
        MonsterInitialValues.armorClass = randomNumber(1, 30);
        MonsterInitialValues.characterMovementSpeed = randomNumber(1, 500);
        MonsterInitialValues.characterHP = randomNumber(1, 1000);
        MonsterInitialValues.characterHPDice = "1d6";
    }, []);

    useEffect(() => {

        MonsterInitialValues.languageProficiency = chosenLanguageAndLevel;
        MonsterInitialValues.savingThrows = chosenSavingThrowsAndLevel;
        MonsterInitialValues.skillsProficiency = chosenSkillAndLevel;
        MonsterInitialValues.damageVulnerabilities = characterVulnerabilities;
        MonsterInitialValues.damageImmunities = characterImmunities;
        MonsterInitialValues.damageResistances = characterResistances;
        MonsterInitialValues.characterRace = characterRaceArray;
        MonsterInitialValues.characterAlignment = characterAlignmentArray;
        MonsterInitialValues.featuresAndTraits = characterFeaturesAndTraits;

    }, [chosenLanguageAndLevel, chosenSavingThrowsAndLevel, chosenSkillAndLevel]);

    const handleChosenSavingThrows = (value, index) => {
        setChosenSavingThrowsAndLevel(prevState => {
            const newSavingThrows = [...prevState];
            newSavingThrows[index] = {...newSavingThrows[index], level: value};
            return newSavingThrows;
        });
    };

    const handleChosenSkills = (value, index) => {
        setChosenSkillAndLevel(prevState => {
            const newSkill = [...prevState];
            newSkill[index] = {...newSkill[index], level: value};
            return newSkill;
        });
    };

    const handleChosenLanguage = () => {
        const newElement = {
            proficiency: chosenLanguageProf,
            level: chosenProfLevel,
        }

        if (!chosenProfLevel || !chosenLanguageProf) {
            alert("Can not save empty choose");
            return;
        }

        if (chosenLanguageAndLevel.some(chosenLanguage => chosenLanguage.proficiency === newElement.proficiency)) {
            alert("You have this chosen already");
            return;
        }

        setChosenLanguageAndLevel(oldArray => [...oldArray, newElement]);
        setChosenLanguageProf('');
        setChosenProfLevel('');
    }

    const handleChosenVulnerability = () => {
        if (!chosenVulnerability) {
            alert("Can not save empty choose");
            return;
        }

        if (characterVulnerabilities.some(vulnerability => vulnerability === chosenVulnerability)) {
            alert("You have this chosen already");
            return;
        }

        setCharacterVulnerabilities(oldArray => [...oldArray, chosenVulnerability])
        setChosenVulnerability('');
    }

    const handleChosenImmunity = () => {
        if (!chosenImmunity) {
            alert("Can not save empty choose");
            return;
        }

        if (characterImmunities.some(immunity => immunity === chosenImmunity)) {
            alert("You have this chosen already");
            return;
        }

        setCharacterImmunities(oldArray => [...oldArray, chosenImmunity])
        setChosenImmunity('');
    }

    const handleChosenResistance = () => {
        if (!chosenResistance) {
            alert("Can not save empty choose");
            return;
        }

        if (characterResistances.some(resistance => resistance === chosenResistance)) {
            alert("You have this chosen already");
            return;
        }

        setCharacterResistances(oldArray => [...oldArray, chosenResistance])
        setChosenResistance('');
    }

    const handleChosenConditionImmunity = () => {
        if (!chosenConditionImmunity) {
            alert("Can not save empty choose");
            return;
        }

        if (characterConditionImmunities.some(immunity => immunity === chosenConditionImmunity)) {
            alert("You have this chosen already");
            return;
        }

        setCharacterConditionImmunities(oldArray => [...oldArray, chosenConditionImmunity])
        setChosenConditionImmunity('');
    }

    const handleFileChange = event => {
        const photo = event.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(photo);
        reader.onload = () => {
            setCharacterPhoto(reader.result);
        }
    }

    const randomNumber = (min, max) => {
        return ((Math.random() * (max - min) + min).toFixed());
    }

    const addNewCharacterHandler = (monster) => {
        setIsLoading(true);

        fetch(`http://127.0.0.1:3000/characters/newMonster`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(monster)
        }).then(res => res.json())
            .catch(() => {
                alert("Something gone wrong!");
            })
            .finally(() => {
                setIsLoading(false);
                navigate(`/dm/`);
            });
    }

    const clearFeatureAndTraitsForm = () => {
        setFeatureName('');
        setFeatureDescription('');
        setFeatureReach('');
        setFeatureDmg('');
        setFeatureHitBonus('');
    }

    const addFeature = () => {
        const newFeature = {
            featureName,
            featureDescription,
            featureReach,
            featureDmg,
            featureHitBonus,
        }

        characterFeaturesAndTraits.push(newFeature);

        clearFeatureAndTraitsForm();
    }



    const editFeature = (editedFeature) => {
        const updatedFeature = {
            featureName,
            featureDescription,
            featureReach,
            featureDmg,
            featureHitBonus,
        }

        const indexOfEditedFeature = characterFeaturesAndTraits.indexOf(editedFeature);

        characterFeaturesAndTraits[indexOfEditedFeature] = updatedFeature;

        clearFeatureAndTraitsForm();
        setIsFeatureEdited(false)
    }

    const deleteFeature = (editedFeature) => {
        setCharacterFeaturesAndTraits(features => features.filter(feature => feature !== editedFeature));

        clearFeatureAndTraitsForm();
        setIsFeatureEdited(false)
    }

    const exitFeatureEdition = () => {
        setIsFeatureEdited(isFeatureEdited => !isFeatureEdited);
    }

    return (
        // TODO form width
        <Box sx={{height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <MultiStepForm initialValues={MonsterInitialValues}
                           onSubmit={(values) => {
                               values.languageProficiency = chosenLanguageAndLevel;
                               values.savingThrows = chosenSavingThrowsAndLevel;
                               values.skillsProficiency = chosenSkillAndLevel;
                               values.damageVulnerabilities = characterVulnerabilities;
                               values.damageImmunities = characterImmunities;
                               values.damageResistances = characterResistances;
                               values.conditionImmunities = characterConditionImmunities;
                               values.characterPhoto = characterPhoto;
                               values.featuresAndTraits = characterFeaturesAndTraits;
                               console.log(values)

                               addNewCharacterHandler(values);
                           }}
            >
                {/*TODO finish adding character form*/}
                <FormStep
                    stepName="Features and traits"
                >
                    {/*TODO style features and traits step, fields to add? : Weapon, hit bonus, reach, damage, */}
                    <Typography variant="h4"
                                sx={{width: "100%", textAlign: "center", marginBottom: "2rem"}}>Features and
                        traits</Typography>
                    <List sx={{
                        overflow: "auto",
                        position: "absolute",
                        width: "17.5rem",
                        top: "11rem",
                        height: "20rem",
                        left: "8.65rem",
                        border: "solid 2px",
                    }}>
                        <Typography variant="h6" textAlign="center">Features and traits</Typography>
                        <Divider/>
                        {characterFeaturesAndTraits?.length === 0 &&
                            <Typography variant="body2" textAlign="center">No features and traits</Typography>}
                        {characterFeaturesAndTraits?.map(feature =>
                            <ListItem key={feature.featureName} disablePadding>
                                <ListItemButton sx={{textAlign: "center"}} onClick={() => {
                                    setEditedFeature(feature);
                                    setFeatureName(feature.featureName);
                                    setFeatureDescription(feature.featureDescription);
                                    setFeatureDmg(feature.featureDmg);
                                    setFeatureHitBonus(feature.featureHitBonus);
                                    setFeatureReach(feature.featureReach);
                                    setIsFeatureEdited(true);
                                }}>
                                    <ListItemText primary={feature.featureName}/>
                                </ListItemButton>
                            </ListItem>
                        )}
                    </List>

                    <div className={classes["features-and-traits"]}>
                        <TextField sx={{margin: ".5rem 0"}} type="text" label="Name"
                                   inputProps={{maxLength: 50}}
                                   value={featureName}
                                   onChange={(event) => setFeatureName(event.target.value)}/>
                        <TextField sx={{margin: ".5rem 0"}} type="text" inputProps={{maxLength: 100}}
                                   label="Damage"
                                   value={featureDmg}
                                   onChange={(event) => setFeatureDmg(event.target.value)}/>
                        <TextField sx={{margin: ".5rem 0"}} type="number" inputProps={{maxLength: 15}}
                                   label="Hit bonus"
                                   value={featureHitBonus}
                                   onChange={(event) => setFeatureHitBonus(event.target.value)}/>
                        <TextField sx={{margin: ".5rem 0"}} type="text" inputProps={{maxLength: 15}}
                                   label="Reach"
                                   value={featureReach}
                                   onChange={(event) => setFeatureReach(event.target.value)}/>
                        <TextField sx={{margin: ".5rem 0"}} type="text" inputProps={{maxLength: 1000}}
                                   multiline
                                   rows={5} label="Description"
                                   value={featureDescription}
                                   onChange={(event) => setFeatureDescription(event.target.value)}/>

                        {!isFeatureEdited && <Button sx={{backgroundColor: "#F5793B"}}
                                variant="contained"
                                color="inherit"
                                onClick={addFeature}>Add</Button>}
                        {isFeatureEdited &&
                            <Button sx={{backgroundColor: "#F5793B", margin: ".5rem 0"}}
                                    variant="contained"
                                    color="inherit"
                                    onClick={() => editFeature(editedFeature)}>Update</Button>}
                        {isFeatureEdited &&
                            <Button sx={{backgroundColor: "#F5793B"}}
                                    variant="contained"
                                    color="inherit"
                                    onClick={() => deleteFeature(editedFeature)}>Delete
                            </Button>}
                        {isFeatureEdited &&
                            <Button sx={{backgroundColor: "#F5793B", margin: ".5rem 0"}}
                                    variant="contained"
                                    color="inherit"
                                    onClick={exitFeatureEdition}>Exit edition
                            </Button>}
                    </div>

                </FormStep>
                <FormStep

                    stepName="Monster info"
                    onSubmit={() => {
                        console.log('Step1 submit')
                    }}
                >
                    <Typography variant="h4" sx={{width: "100%", textAlign: "center", marginBottom: "2rem"}}>New monster
                    </Typography>
                    <TextInputField name="characterName" label="Monster name" sx={{margin: ".25rem 0"}}/>

                    {/*TODO photo preview*/}
                    <Typography>Upload character photo</Typography>
                    <input
                        onChange={handleFileChange}
                        type="file"
                        accept="image/png, image/jpeg"
                        // hidden
                        id="photo"
                        name="photo"
                        multiple
                    />
                    <DropdownInputField name="characterSize" label="Character size"
                                        arrayOfMenuItems={characterSizeArray}/>
                    <DropdownInputField name="characterRace" label="Monster type"
                                        arrayOfMenuItems={monsterTypeArray}/>
                    <DropdownInputField name="characterAlignment" label="Monster alignment"
                                        arrayOfMenuItems={characterAlignmentArray}/>
                </FormStep>
                <FormStep
                    stepName="Character statistics"
                    onSubmit={() => console.log('Step2 submit')}
                    validationSchema={monsterStatsValidationSchema}>
                    <Typography variant="h4" sx={{width: "100%", textAlign: "center", marginBottom: "2rem"}}>Character
                        statistics</Typography>

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
                            <TextInputField name="characterHPDice" label="HP dice"
                                            sx={{width: "10rem", margin: ".25rem 0"}}/>
                            <NumberInputField name="characterHP" label="Character health points" max={1000}/>
                            <NumberInputField name="exp" label="Character experience" max={400000}/>
                            <NumberInputField name="characterMovementSpeed" label="Character speed" max={500}/>
                            <NumberInputField name="characterInitiative" label="Character initiative"/>
                            <NumberInputField name="armorClass" label="Armor class"/>
                        </Grid>
                    </Grid>
                </FormStep>
                <FormStep
                    stepName="Character saving throws"
                    onSubmit={() => {
                        console.log("Step3 submit");
                    }}
                >

                    <Typography variant="h4" sx={{width: "100%", textAlign: "center", marginBottom: "2rem"}}>Character
                        saving throws</Typography>

                    <RadioButtonsGroup columnName={["Saving throws", "Proficiency Level"]}
                                       handleChosenRadio={handleChosenSavingThrows}
                                       radioButtonGroup={savingThrows}
                                       radioButtonOptions={proficiencyLevel}/>
                </FormStep>
                <FormStep
                    stepName="Character skills"
                    onSubmit={() => {
                        console.log("Step3 submit");
                    }}
                    validationSchema={characterSavingThrowsValidationSchema}
                >

                    <Typography variant="h4" sx={{width: "100%", textAlign: "center", marginBottom: "2rem"}}>Character
                        skills</Typography>

                    <RadioButtonsGroup columnName={["Skill throw", "Proficiency Level"]}
                                       handleChosenRadio={handleChosenSkills}
                                       radioButtonGroup={skillProficiencies}
                                       radioButtonOptions={proficiencyLevel}/>
                </FormStep>
                <FormStep
                    stepName="Movement skills"
                >
                    <Typography variant="h4" sx={{width: "100%", textAlign: "center", marginBottom: "2rem"}}>Movement
                        skills</Typography>

                    <NumberInputField name="monsterMovementBurrowSpeed" label="Burrow speed"/>
                    <NumberInputField name="monsterMovementClimbSpeed" label="Climb speed"/>
                    <NumberInputField name="monsterMovementFlySpeed" label="Fly speed"/>
                    <NumberInputField name="monsterMovementSwimSpeed" label="Swim speed"/>

                </FormStep>
                <FormStep
                    stepName="Vulnerabilities, immunities and resistances"
                >
                    <Typography variant="h4" sx={{width: "100%", textAlign: "center", marginBottom: "2rem"}}>Vulnerabilities,
                        immunities and
                        resistances</Typography>
                    <Grid container direction="row" justifyContent="center"
                          spacing={1}>
                        <Grid item md={2}>
                            <Typography sx={{width: "100%", textAlign: "center"}}>Vulnerabilities</Typography>

                            <DataTableHandler arrayToRender={characterVulnerabilities}
                                              tableHeaders={["Vulnerability"]}/>

                            <Select
                                sx={{margin: ".35rem 0", minWidth: "10rem", maxWidth: "10rem"}}
                                onChange={(e) => setChosenVulnerability(e.target.value)}
                            >
                                <MenuItem><em>Choose vulnerability</em></MenuItem>
                                {damageTypes.map(type => <MenuItem key={type[0]}
                                                                   value={type[1]}>{type[1]}</MenuItem>)}

                            </Select>
                            <Button onClick={handleChosenVulnerability}>Add vulnerability</Button>
                        </Grid>
                        <Grid item md={2}>
                            <Typography sx={{width: "100%", textAlign: "center"}}>Condition immunities</Typography>

                            <DataTableHandler arrayToRender={characterConditionImmunities}
                                              tableHeaders={["Immunities"]}/>

                            <Select
                                sx={{margin: ".35rem 0", minWidth: "10rem", maxWidth: "10rem"}}
                                onChange={(e) => setChosenConditionImmunity(e.target.value)}
                            >
                                <MenuItem><em>Choose immunity</em></MenuItem>
                                {conditionTypes.map(type => <MenuItem key={type[0]}
                                                                      value={type[1]}>{type[1]}</MenuItem>)}

                            </Select>
                            <Button onClick={handleChosenConditionImmunity}>Add immunity</Button>
                        </Grid>
                        <Grid item md={2}>
                            <Typography sx={{width: "100%", textAlign: "center"}}>Immunities</Typography>

                            <DataTableHandler arrayToRender={characterImmunities} tableHeaders={["Immunity"]}/>

                            <Select
                                sx={{margin: ".35rem 0", minWidth: "10rem", maxWidth: "10rem"}}
                                onChange={(e) => setChosenImmunity(e.target.value)}
                            >
                                <MenuItem><em>Choose immunity</em></MenuItem>
                                {damageTypes.map(type => <MenuItem key={type[0]}
                                                                   value={type[1]}>{type[1]}</MenuItem>)}

                            </Select>
                            <Button onClick={handleChosenImmunity}>Add immunity</Button>
                        </Grid>
                        <Grid item md={2}>
                            <Typography sx={{width: "100%", textAlign: "center"}}>Resistances</Typography>

                            <DataTableHandler arrayToRender={characterResistances} tableHeaders={["Resistance"]}/>

                            <Select
                                sx={{margin: ".35rem 0", minWidth: "10rem", maxWidth: "10rem"}}
                                onChange={(e) => setChosenResistance(e.target.value)}
                            >
                                <MenuItem><em>Choose resistance</em></MenuItem>
                                {damageTypes.map(type => <MenuItem key={type[0]}
                                                                   value={type[1]}>{type[1]}</MenuItem>)}

                            </Select>
                            <Button onClick={handleChosenResistance}>Add resistance</Button>
                        </Grid>
                    </Grid>

                </FormStep>
                <FormStep
                    stepName="Senses"
                >
                    <Typography variant="h4"
                                sx={{width: "100%", textAlign: "center", marginBottom: "2rem"}}>Senses</Typography>

                    <NumberInputField name="monsterBlindsightSense" label="Blindsight range"/>
                    <NumberInputField name="monsterDarkvisionSense" label="Darkvision range"/>
                    <NumberInputField name="monsterTremorsenseSense" label="Tremorsense range"/>
                    <NumberInputField name="monsterTruesightSense" label="Truesight range"/>

                </FormStep>
                <FormStep
                    stepName="Character language proficiencies"
                >
                    <Typography variant="h4"
                                sx={{width: "100%", textAlign: "center", marginBottom: "2rem"}}>Languages</Typography>

                    <DataTableHandler arrayToRender={chosenLanguageAndLevel} tableHeaders={["Language", "Level"]}/>

                    <InputLabel>Language</InputLabel>
                    <Select
                        sx={{margin: ".35rem 0", minWidth: "15rem", maxWidth: "15rem"}}
                        onChange={(e) => setChosenLanguageProf(e.target.value)}
                    >
                        <MenuItem><em>Choose language</em></MenuItem>
                        {languageProficiences.map(type => <MenuItem key={type[0]}
                                                                    value={type[1][0]}>{type[1][0]}</MenuItem>)}
                    </Select>

                    <InputLabel>Proficiency level</InputLabel>
                    <Select
                        sx={{margin: ".35rem 0", minWidth: "15rem", maxWidth: "15rem"}}
                        onChange={(e) => setChosenProfLevel(e.target.value)}
                    >
                        <MenuItem><em>Choose level</em></MenuItem>

                        {proficiencyLevel.map(type => <MenuItem key={type[0]}
                                                                value={type[1]}>{type[1]}</MenuItem>)}
                    </Select>
                    <Button onClick={handleChosenLanguage}>Add language</Button>

                </FormStep>


            </MultiStepForm>
        </Box>
    )
}

export default CreateNewMonster;