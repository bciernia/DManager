import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import beastImg from '../../../assets/newCharacterTypePhotos/beast.jpg'
import monsterImg from '../../../assets/newCharacterTypePhotos/monster.jpg'
import playerCharacterImg from '../../../assets/newCharacterTypePhotos/playerCharacter.jpg'
import npcImg from '../../../assets/newCharacterTypePhotos/npc.jpg'
import classes from './CreateNewCharacter.module.css'
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const CreateNewCharacter = () => {
    const [chosenTypeLabel, setChosenTypeLabel] = useState('Character type'); //napis
    const [chosenType, setChosenType] = useState('');// dla obiektu

    const navigate = useNavigate()

    const handleRadio = (characterTypeLabel, characterType) => {
        setChosenTypeLabel(characterTypeLabel);
        setChosenType(characterType);
    }

    const goToAddNewNpcView = () => {
        if(chosenType === ''){
            alert("You have to chose character type");
            return;
        }

        navigate(`${chosenType}`);
    }

    return (
        <div>
            <Box sx={{width: "100%", height: "100%"}}>
                <Grid container
                      spacing={1}
                >
                    <Grid item md={12}>
                        <Typography>Choose type of new character</Typography>
                    </Grid>
                    <Grid item md={12}>
                        <Typography>{chosenTypeLabel}</Typography>
                    </Grid>
                    <Grid item md={12}>
                        <Button onClick={goToAddNewNpcView}>
                            Create
                        </Button>
                    </Grid>
                    <Grid item md={6}>
                        <label>
                            <input type="radio" name="test"
                                   className={classes.createNewCharacterRadioBtn}
                                   onChange={() => handleRadio('Player character', 'playerCharacter')}
                            />
                            <img src={playerCharacterImg}/>
                        </label>
                    </Grid>

                    <Grid item md={6}>
                        <label>
                            <input type="radio" name="test" value="small"
                                   className={classes.createNewCharacterRadioBtn}
                                   onChange={() => handleRadio('Monster', 'monster')}
                            />
                            <img src={monsterImg}/>
                        </label>

                    </Grid>

                    <Grid item md={6}>
                        <label>
                            <input type="radio" name="test" value="small"
                                   className={classes.createNewCharacterRadioBtn}
                                   onChange={() => handleRadio('Beast', 'beast')}
                            />
                            <img src={beastImg}/>
                        </label>
                    </Grid>

                    <Grid item md={6}>
                        <label>
                            <input type="radio" name="test" value="small"
                                   className={classes.createNewCharacterRadioBtn}
                                   onChange={() => handleRadio('Non-player character', 'npc')}
                            />
                            <img src={npcImg}/>
                        </label>
                    </Grid>
                </Grid>

            </Box>
        </div>
    )
}

export default CreateNewCharacter;