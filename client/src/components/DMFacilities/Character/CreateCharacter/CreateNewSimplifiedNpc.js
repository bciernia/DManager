import {CharacterClasses} from "../../../../utils/dndUtils/CharacterClasses";
import {CharacterTypes} from "../../../../utils/dndUtils/CharacterTypes";
import {Box, Grid, Typography} from "@mui/material";
import MultiStepForm, {FormStep} from "../../../../utils/Form/MultiStepForm";
import {CharacterInitialValues} from "../../../../utils/dndUtils/CharacterInitialValues";
import DropdownInputField from "../../../../utils/Form/InputTypes/DropdownInputField";
import TextInputField from "../../../../utils/Form/InputTypes/TextInputField";
import {useEffect, useState} from "react";
import {CharacterRaces} from "../../../../utils/dndUtils/CharacterRaces";
import {CharacterAlignments} from "../../../../utils/dndUtils/CharacterAlignments";
import {useNavigate} from "react-router-dom";
import TextareaInputField from "../../../../utils/Form/InputTypes/TextareaInputField";

const CreateNewSimplifiedNpc = () => {
    const characterRaceArray = Object.entries(CharacterRaces);
    const characterAlignmentArray = Object.entries(CharacterAlignments);

    const [isLoading, setIsLoading] = useState(false);

    const [characterPhoto, setCharacterPhoto] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        CharacterInitialValues.characterType = CharacterTypes.simpleNpc;
    }, []);

    const handleFileChange = event => {
        const photo = event.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(photo);
        reader.onload = () => {
            setCharacterPhoto(reader.result);
        }
    }

    const addNewCharacterHandler = (character) => {
        setIsLoading(true);

        fetch(`http://127.0.0.1:3000/characters/newSimplyNPC`, {
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
                navigate(`/dm/`);
            });
    }

    return (
        // TODO form width
        <Box sx={{height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <MultiStepForm initialValues={CharacterInitialValues}
                           onSubmit={(values) => {
                               values.characterPhoto = characterPhoto;
                               addNewCharacterHandler(values);
                           }}
            >
                <FormStep
                    stepName="Character info"
                    onSubmit={() => {
                        console.log('Step1 submit')
                    }}>
                    <Typography variant="h4" sx={{width: "100%", textAlign: "center", marginBottom: "2rem"}}>New simple
                        NPC</Typography>
                    <Grid container>
                        <Grid item md={4.5} sx={{marginRight: "5rem"}}>
                            <TextInputField name="characterName" label="Character name" sx={{margin: ".25rem 0"}}/>
                        </Grid>
                        <Grid item md={6}>
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
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item md={6}>
                            <DropdownInputField name="characterRace" label="Character race"
                                                arrayOfMenuItems={characterRaceArray}/>
                        </Grid>
                        <Grid item md={6}>
                            <DropdownInputField name="characterAlignment" label="Character alignment"
                                                arrayOfMenuItems={characterAlignmentArray}/>
                        </Grid>

                    </Grid>

                    <TextareaInputField name="characterDescription" label="Character description"
                                        sx={{margin: ".5rem 0 1rem"}}/>
                    <TextareaInputField name="featuresAndTraits" label="Character features and traits"/>
                </FormStep>
            </MultiStepForm>
        </Box>
    )
}

export default CreateNewSimplifiedNpc;