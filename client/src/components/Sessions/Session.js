import PreviewLocation from "../DMFacilities/Location/PreviewLocation/PreviewLocation";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {
    Box, Button,
    Card,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Tab,
    Tabs, TextField,
    Typography
} from "@mui/material";
import PreviewHandout
    from "../DMFacilities/Campaign/CampaignDetails/ScenarioDetailsPartialView/EditScenario/AddHandout/PreviewHandout/PreviewHandout";
import Timer from "../Layout/Main/SessionStarter/Timer/Timer";
import {TabContext, TabPanel} from "@mui/lab";
import classes
    from "../DMFacilities/Campaign/CampaignDetails/ScenarioDetailsPartialView/EditScenario/EditScenario.module.css";

const getScenarioById = (scenarioId) =>
    fetch(`http://127.0.0.1:3000/dm/scenario/${scenarioId}`)
        .then(res => res.json());

const getHandoutsForScenario = (scenarioId) =>
    fetch(`http://127.0.0.1:3000/dm/scenario/${scenarioId}/handout/all`)
        .then(res => res.json());

const getNotesForScenario = (scenarioId) =>
    fetch(`http://127.0.0.1:3000/dm/scenario/${scenarioId}/notes/all`)
        .then(res => res.json());

const Session = props => {
    // TODO ask if someone want to exit

    const {campaignId, scenarioId} = useParams();

    const [scenario, setScenario] = useState({});
    const [handouts, setHandouts] = useState([]);
    const [notes, setNotes] = useState([]);
    const [characters, setCharacters] = useState([]);
    const [chosenCharacter, setChosenCharacter] = useState({});

    const [value, setValue] = React.useState('one');

    useEffect(() => {
        Promise.all([
            getScenarioById(scenarioId),
            getHandoutsForScenario(scenarioId),
            getNotesForScenario(scenarioId),
        ]).then(([scenarioData, handoutsData, notesData]) => {
            setScenario(scenarioData);
            setHandouts(handoutsData.filter(handout => handout.handoutLocation === scenarioId));
            setNotes(notesData);
            setCharacters(scenarioData.scenarioCharacters);
        });
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const removeDeadCharacter = (characterId) => {
        setCharacters(prevCharacters => prevCharacters.filter(character => character.tempId !== characterId));
        setChosenCharacter({});
    }

    return (
        <>
            <TabContext value={value}>
                <Grid container>
                    <Grid item md={3}>
                        <Grid container>
                            <Grid item md={12}>
                                <Typography variant="h6" sx={{marginLeft: ".5rem"}}>Scenario name</Typography>
                            </Grid>
                            <Grid item md={12}>
                                <Typography sx variant="h5" sx={{margin: ".5rem"}}>{scenario.scenarioName}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={6}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            textColor="inherit"
                            aria-label="secondary tabs example"
                            variant="fullWidth"
                            sx={{
                                ".Mui-selected": {
                                    color: "#F5793B",
                                },
                            }}
                            TabIndicatorProps={{
                                style: {
                                    backgroundColor: "#F5793B",
                                }
                            }}
                        >
                            <Tab value="one" label="Players"/>
                            <Tab value="two" label="Characters"/>
                            <Tab value="three" label="Locations"/>
                        </Tabs>
                    </Grid>
                    <Grid item md={3}>
                        <Box
                            sx={{display: "flex", justifyContent: "flex-end", margin: ".5rem .5rem 0 0"}}><Timer/></Box>
                    </Grid>
                </Grid>
                <Divider/>
                <Grid container>
                    <Grid item md={2}>
                        <Typography variant="h6" sx={{marginLeft: ".5rem"}}>Scenario description</Typography>
                        <Typography variant="body2"
                                    sx={{marginLeft: " .5rem"}}>{scenario.scenarioDescription}</Typography>
                        <Typography variant="h6" sx={{marginLeft: ".5rem"}}>Scenario handouts</Typography>
                        <Box sx={{marginLeft: ".5rem"}}>{handouts.map(handout =>
                            <PreviewHandout
                                handout={handout}/>)}</Box>
                    </Grid>
                    <Grid item md={7}>
                        <TabPanel value="one" index={0}>
                            <Grid container>

                            </Grid>
                        </TabPanel>
                        <TabPanel value="two" index={1}>
                            <Grid container>
                                <Grid item={2}>
                                    <List sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        height: "35rem",
                                        overflow: "auto",
                                        overflowX: "hidden",
                                    }}>
                                        {characters?.length === 0 &&
                                            <Typography variant="h6" textAlign="center">No characters</Typography>}
                                        {characters.map((character) =>
                                            <ListItem key={character.tempId}
                                                      sx={{margin: ".25rem", display: "flex"}}
                                                      disablePadding>
                                                <Card sx={{backgroundColor: "whitesmoke", minWidth: 200}}>
                                                    <ListItemButton onClick={() => {
                                                        setChosenCharacter(character);
                                                    }}
                                                                    sx={{textAlign: "center"}}>
                                                        <ListItemText primary={<Typography
                                                            variant="body2">{character.characterName}</Typography>}/>
                                                    </ListItemButton>
                                                </Card>
                                            </ListItem>
                                        )}
                                    </List>
                                </Grid>
                                <Grid item={10}>
                                    {chosenCharacter._id &&
                                    <Card sx={{marginLeft: "1rem", padding: ".5rem .5rem", width: 600}}>
                                        <Grid container>
                                            <Grid item xs={4}>
                                                <div className={classes["img-container"]}>
                                                    <img src={chosenCharacter.characterPhoto} alt="Character photo"
                                                         className={classes["character-photo"]}/>
                                                </div>
                                                <div>
                                                    <Button onClick={() => removeDeadCharacter(chosenCharacter.tempId)}>Delete</Button>
                                                    <TextField type="number" value={chosenCharacter.characterHP} onChange={(e) => {
                                                        setChosenCharacter(character => ({...chosenCharacter, characterHP: e.target.value}));
                                                        setCharacters(characters => {
                                                            return characters.map(character => {
                                                                if(character.tempId === chosenCharacter.tempId){
                                                                    return {...chosenCharacter, characterHP: e.target.value};
                                                                }else{
                                                                    return character;
                                                                }
                                                            })
                                                        })
                                                    }}/>
                                                </div>
                                            </Grid>
                                            <Divider orientation="vertical" flexItem/>
                                            <Grid item xs={7.95}>
                                                <Box sx={{margin: "0 .25rem"}}>
                                                    <Typography
                                                        variant="h6">{chosenCharacter.characterName}</Typography>
                                                    <Typography
                                                        variant="body">{chosenCharacter.characterDescriptionForScenario}</Typography>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Card>}
                                </Grid>
                            </Grid>
                        </TabPanel>
                        <TabPanel value="three" index={2}>
                            <PreviewLocation scenarioId={scenarioId} isInEditingScenario={false}/>
                        </TabPanel>
                    </Grid>

                    <Grid item md={3}>
                        <List sx={{
                            display: "flex",
                            flexDirection: "column",
                            height: "35rem",
                            overflow: "auto",
                            overflowX: "hidden",
                        }}>
                            {/*TODO save note to db after adding them*/}
                            {notes?.length === 0 &&
                                <Typography variant="h6" textAlign="center">No notes</Typography>}
                            {notes.map((note) =>
                                <ListItem key={note._id}
                                          sx={{margin: ".25rem", display: "flex", justifyContent: "center"}}
                                          disablePadding>
                                    <Card sx={{backgroundColor: "whitesmoke", width: 320}}>
                                        <ListItemText sx={{padding: ".25rem"}}
                                                      primary={<Typography variant="body2">{note.note}</Typography>}/>
                                    </Card>
                                </ListItem>
                            )}
                        </List>
                    </Grid>
                </Grid>

            </TabContext>
        </>
    )
}

export default Session;