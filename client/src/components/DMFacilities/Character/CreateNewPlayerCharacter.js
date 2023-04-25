import {CharacterInitialValues} from "../../../utils/dndUtils/CharacterInitialValues";
import {
    Box, Button, FormControl, FormControlLabel,
    Grid, InputLabel,
    List,
    ListItem, ListItemText, MenuItem,
    Paper, Radio, RadioGroup, Select, Table,
    TableBody,
    TableCell,
    TableContainer, TableHead,
    TableRow, TextareaAutosize,
    Typography
} from "@mui/material";
import MultiStepForm, {FormStep} from "../../../utils/Form/MultiStepForm";
import {CharacterClasses} from "../../../utils/dndUtils/CharacterClasses";
import {CharacterTypes} from "../../../utils/dndUtils/CharacterTypes";
import {ConditionTypes} from "../../../utils/dndUtils/ConditionTypes";
import {DamageTypes} from "../../../utils/dndUtils/DamageTypes";
import {useEffect, useState} from "react";
import {LanguageProficiencies} from "../../../utils/dndUtils/LanguageProficiencies";
import {ProficiencyLevel} from "../../../utils/dndUtils/ProficiencyLevel";
import DataTableHandler from "../../../utils/Form/Table/DataTableHandler";
import {
    characterInfoValidationSchema,
    characterProficienciesValidationSchema, characterSavingThrowsValidationSchema, characterSkillsValidationSchema,
    characterStatsValidationSchema
} from "../../../utils/Form/ValidationSchemas";
import {SavingThrows} from "../../../utils/dndUtils/SavingThrows";
import TextInputField from "../../../utils/Form/InputTypes/TextInputField";
import DropdownInputField from "../../../utils/Form/InputTypes/DropdownInputField";
import CheckboxInputField from "../../../utils/Form/InputTypes/CheckboxInputField";
import NumberInputField from "../../../utils/Form/InputTypes/NumberInputField";
import {SkillProficiencies} from "../../../utils/dndUtils/SkillProficiencies";
import TextareaInputField from "../../../utils/Form/InputTypes/TextareaInputField";
import {useNavigate} from "react-router-dom";

const CreateNewPlayerCharacter = () => {
    const characterClassesArray = Object.entries(CharacterClasses);
    const characterTypes = Object.entries(CharacterTypes);
    const conditionTypes = Object.entries(ConditionTypes);
    const damageTypes = Object.entries(DamageTypes);
    const languageProficiences = Object.entries(LanguageProficiencies);
    const proficiencyLevel = Object.entries(ProficiencyLevel);
    const savingThrows = Object.entries(SavingThrows);
    const skillProficiencies = Object.entries(SkillProficiencies);

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

    const navigate = useNavigate();

    useEffect(() => {
        CharacterInitialValues.characterType = CharacterTypes.playerCharacter;
    }, []);

    useEffect(() => {
        CharacterInitialValues.languageProficiency = chosenLanguageAndLevel;
        CharacterInitialValues.savingThrows = chosenSavingThrowsAndLevel;
        CharacterInitialValues.skillsProficiency = chosenSkillAndLevel;
        CharacterInitialValues.damageVulnerabilities = characterVulnerabilities;
        CharacterInitialValues.damageImmunities = characterImmunities;
        CharacterInitialValues.damageResistances = characterResistances;

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

        console.log(reader.result);
    }

    const inputChangeHandler = (event, setStateFunction) => {
        setStateFunction(event.target.value);
    }


    const addNewCharacterHandler = (character) => {
        setIsLoading(true);

        fetch(`http://127.0.0.1:3000/character/newCharacter`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(character)
        }).then(res => res.json())
            .catch(() => {
                alert("Something gone wrong!");
            })
            .finally(() => {
                setIsLoading(false);
                navigate(`/dm`);
            });
    }

    return (
        // TODO form width
        <Box sx={{height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <MultiStepForm initialValues={CharacterInitialValues}
                           onSubmit={(values) => {
                               values.languageProficiency = chosenLanguageAndLevel;
                               values.savingThrows = chosenSavingThrowsAndLevel;
                               values.skillsProficiency = chosenSkillAndLevel;
                               values.damageVulnerabilities = characterVulnerabilities;
                               values.damageImmunities = characterImmunities;
                               values.damageResistances = characterResistances;
                               values.conditionImmunities = characterConditionImmunities;
                               values.characterPhoto = characterPhoto;
                               console.log(values)

                               addNewCharacterHandler(values);
                           }}
            >
                {/*TODO finish adding character form*/}
                <FormStep
                    stepName="Character info"
                    onSubmit={() => console.log('Step1 submit')}
                    validationSchema={characterInfoValidationSchema}>
                    <Typography>New player character</Typography>
                    {/*<TextInputField name="characterType" label="" value={CharacterTypes.characterType}*/}
                    {/*                sx={{margin: ".25rem 0"}} isDisabled="true"/>*/}
                    <TextInputField name="characterName" label="Character name" sx={{margin: ".25rem 0"}}/>
                    <TextInputField name="playerName" label="Player name" sx={{margin: ".25rem 0"}}/>

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
                    stepName="Character saving throws"
                    onSubmit={() => {
                        console.log("Step3 submit");
                    }}
                    validationSchema={characterSavingThrowsValidationSchema}
                >

                    <Typography>Character saving throws</Typography>

                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 400}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Saving throw</TableCell>
                                    <TableCell align="right">Proficiency level</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {savingThrows.map((row, index) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row[1]}
                                        </TableCell>
                                        <RadioGroup
                                            defaultValue="0"
                                            onChange={(e) => handleChosenSavingThrows(e.target.value, index)}
                                        >
                                            {proficiencyLevel.map(profLevel => {
                                                return <FormControlLabel value={profLevel[0]}
                                                                         control={<Radio size="small"/>}
                                                                         label={profLevel[1]}/>
                                            })}
                                        </RadioGroup>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </FormStep>
                <FormStep
                    stepName="Character skills"
                    onSubmit={() => {
                        console.log("Step3 submit");
                    }}
                    validationSchema={characterSavingThrowsValidationSchema}
                >

                    <Typography>Character skills</Typography>

                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 400}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Skills throw</TableCell>
                                    <TableCell align="right">Proficiency level</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {skillProficiencies.map((row, index) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row[1][0]}
                                        </TableCell>
                                        <RadioGroup
                                            defaultValue="0"
                                            onChange={(e) => handleChosenSkills(e.target.value, index)}
                                        >
                                            {proficiencyLevel.map(profLevel => {
                                                return <FormControlLabel value={profLevel[0]}
                                                                         control={<Radio size="small"/>}
                                                                         label={profLevel[1]}/>
                                            })}
                                        </RadioGroup>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </FormStep>
                <FormStep
                    stepName="Vulnerabilities, immunities and resistances"
                >
                    <Typography sx={{width: "100%", textAlign: "center"}}>Vulnerabilities, immunities and
                        resistances</Typography>
                    <Grid container direction="row" justifyContent="center"
                          alignItems="center" spacing={1}>
                        <Grid item md={3}>
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
                        <Grid item md={3}>
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
                        <Grid item md={3}>
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
                        <Grid item md={3}>
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
                    stepName="Character language proficiencies"
                >
                    <Typography sx={{width: "100%", textAlign: "center"}}>Character languages</Typography>

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

export default CreateNewPlayerCharacter;