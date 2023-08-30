import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {
    Box,
    Button,
    Card, Dialog, Divider,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Tab,
    Tabs, TextField,
    Typography
} from "@mui/material";
import {TabContext, TabPanel} from "@mui/lab";
import Timer from "../Layout/Main/SessionStarter/Timer/Timer";
import classes
    from "../DMFacilities/Campaign/CampaignDetails/ScenarioDetailsPartialView/EditScenario/EditScenario.module.css";
import sessionClasses from './Session.module.css';
import PreviewLocation from "../DMFacilities/Location/PreviewLocation/PreviewLocation";
import TextareaInputField from "../../utils/Form/InputTypes/TextareaInputField";
import CharacterDetails from "../DMFacilities/Character/CharacterDetails/CharacterDetails";
import {v4 as uuid} from 'uuid';
import NumberInputField from "../../utils/Form/InputTypes/NumberInputField";

const getScenarioById = (scenarioId) =>
    fetch(`http://127.0.0.1:3000/dm/scenario/${scenarioId}`)
        .then(res => res.json());

const getHandoutsForScenario = (scenarioId) =>
    fetch(`http://127.0.0.1:3000/dm/scenario/${scenarioId}/handout/all`)
        .then(res => res.json());

const getNotesForScenario = (scenarioId) =>
    fetch(`http://127.0.0.1:3000/dm/scenario/${scenarioId}/notes/all`)
        .then(res => res.json());

const getPlayerCharacters = () =>
    fetch(`http://127.0.0.1:3000/characters/all/playerCharacters`)
        .then(res => res.json());

const getSpells = () =>
    fetch(`http://127.0.0.1:3000/dm/spells/all`)
        .then(res => res.json());

const getArtifacts = () =>
    fetch(`http://127.0.0.1:3000/dm/artifacts/all`)
        .then(res => res.json());

const Session = props => {
    // TODO ask if someone want to exit

    const {campaignId, scenarioId} = useParams();

    const [scenario, setScenario] = useState({});
    const [handouts, setHandouts] = useState([]);
    const [spells, setSpells] = useState([]);
    const [notes, setNotes] = useState([]);
    const [artifacts, setArtifacts] = useState([]);
    const [characters, setCharacters] = useState([]);
    const [playerCharacters, setPlayerCharacters] = useState([]);
    const [chosenCharacter, setChosenCharacter] = useState({});
    const [chosenNote, setChosenNote] = useState("");
    const [spellSearchValue, setSpellSearchValue] = useState("");
    const [artifactSearchValue, setArtifactSearchValue] = useState("");

    const [tmpInitiativeTracker, setTmpInitiativeTracker] = useState([]);
    const [initiativeTracker, setInitiativeTracker] = useState([]);
    const [initiativeTrackerDialogOpen, setInitiativeTrackerDialogOpen] = useState(false);

    const [newNoteValue, setNewNoteValue] = useState("");

    const [tabValue, setTabValue] = useState('one');
    const [sideTabValue, setSideTabValue] = useState('one');

    const [spellDialogOpen, setSpellDialogOpen] = useState(false);
    const [chosenSpell, setChosenSpell] = useState({});

    const [artifactDialogOpen, setArtifactDialogOpen] = useState(false);
    const [chosenArtifact, setChosenArtifact] = useState({});

    useEffect(() => {
        Promise.all([
            getScenarioById(scenarioId),
            getHandoutsForScenario(scenarioId),
            getNotesForScenario(scenarioId),
            getPlayerCharacters(),
            getSpells(),
            getArtifacts(),
        ]).then(([scenarioData, handoutsData, notesData, playerCharacters, spellsData, artifactsData]) => {
            setScenario(scenarioData);
            setHandouts(handoutsData.filter(handout => handout.handoutLocation === scenarioId));
            setNotes(notesData);
            setPlayerCharacters(playerCharacters);
            setSpells(spellsData);
            setArtifacts(artifactsData);
            setCharacters(scenarioData.scenarioCharacters);
            if (scenarioData.scenarioCharacters.length > 0) {
                setChosenCharacter(scenarioData.scenarioCharacters[0]);
            }
        });
    }, []);

    const startSession = () => {
        const newSession = {
            campaignId: campaignId,
            sessionName: scenario.scenarioName,
            sessionNotes: notes,
        }

        fetch(`http://127.0.0.1:3000/game/session`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(newSession)
        }).then(res => res.json())
            .catch(() => {
                alert("Something gone wrong!");
            });
    }

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleChangeSideTab = (event, newValue) => {
        setSideTabValue(newValue);
    };

    const removeDeadCharacter = (characterId) => {
        setCharacters(prevCharacters => prevCharacters.filter(character => character.tempId !== characterId));
        setChosenCharacter({});
    }

    const previewArtifact = (artifact) => {
        setChosenArtifact(artifact);
        setArtifactDialogOpen(true);
    }

    const handleArtifactDialogClose = () => {
        setArtifactDialogOpen(false);
    }

    const handleInitiativeTrackerDialogClose = () => {
        setInitiativeTrackerDialogOpen(false);
    }

    const handleInitiativeTrackerDialogOpen = () => {
        setInitiativeTrackerDialogOpen(true);
    }

    const handleInitiativeTrackerDialogOpenAndClearTmpInitiativeTracker = () => {
        setInitiativeTrackerDialogOpen(true);

        setTmpInitiativeTracker([]);
    }

    const addNote = () => {
        if (newNoteValue === "") {
            return;
        }

        const newNote = {
            note: newNoteValue,
        }
        setNotes([...notes, newNote]);
        setNewNoteValue("");
    }

    //TODO SEARCHING FOR NOTE
    // const findNotes = (e) => {
    //     const noteToFind = e.target.value;
    //
    //     console.log(noteToFind);
    //     console.log(notes);
    //
    //     setNotesToShow(notes.map(note => note.note.includes(noteToFind)));
    // }

    const previewSpell = (spell) => {
        setChosenSpell(spell);
        setSpellDialogOpen(true);
    }

    const handleSpellDialogClose = () => {
        setSpellDialogOpen(false);
    }

    const getStatisticBonus = stat => {
        return Math.floor((stat - 10) / 2);
    }

    const addCharacterToTmpInitiativeTracker = (name, hp) => {
        const character = {
            id: uuid(),
            name,
            hp,
            initiative: 0,
        }

        setTmpInitiativeTracker(tmpInitiativeTracker => [...tmpInitiativeTracker, character]);
    }

    const removeCharacterFromInitiativeTracker = characterId => {
        setInitiativeTracker(initiativeTracker.filter(character => character.id !== characterId));
        setTmpInitiativeTracker(initiativeTracker.filter(character => character.id !== characterId));
    }

    const removeCharacterFromTmpInitiativeTracker = characterId => {
        setTmpInitiativeTracker(tmpInitiativeTracker.filter(character => character.id !== characterId));
    }

    const updateCharacterInitiativeNumber = (characterId, initiativeValue) => {
        const initiativeCharacter = tmpInitiativeTracker.find(character => character.id === characterId);

        initiativeCharacter.initiative = initiativeValue;
    }

    const saveInitiativeTracker = () => {
        setInitiativeTracker([...tmpInitiativeTracker.sort((a, b) => b.initiative - a.initiative)]);
        setInitiativeTrackerDialogOpen(false);
    }

    return (
        <>
            <Dialog onClose={handleSpellDialogClose} open={spellDialogOpen}>
                <Box sx={{padding: ".5rem"}}>
                    <Typography variant="h6">
                        {chosenSpell.name}
                    </Typography>
                    <Typography variant="body2">
                        {chosenSpell.description}
                    </Typography>
                    <Divider/>
                    <Typography variant="body2">
                        <b>Komponenty: </b>{chosenSpell.components}
                    </Typography>
                    <Typography variant="body2">
                        <b>Czas rzucania: </b>{chosenSpell.castingTime}
                    </Typography>
                    <Typography variant="body2">
                        <b>Czas trwania: </b>{chosenSpell.duration}
                    </Typography>
                    <Typography variant="body2">
                        <b>Zasięg: </b>{chosenSpell.range}
                    </Typography>
                </Box>
            </Dialog>

            <Dialog onClose={handleArtifactDialogClose} open={artifactDialogOpen}>
                <Box sx={{padding: ".5rem"}}>
                    <Typography variant="h6">
                        {chosenArtifact.name}
                    </Typography>
                    <Typography variant="body2">
                        {chosenArtifact.description}
                    </Typography>
                    <Divider/>
                    <Typography variant="body2">
                        <b>Typ: </b>{chosenArtifact.type}
                    </Typography>
                </Box>
            </Dialog>

            <Dialog onClose={handleInitiativeTrackerDialogClose} open={initiativeTrackerDialogOpen}>
                <Box sx={{width: "35rem", height: "40rem"}}>
                    <Grid container>
                        <Grid item md={5}>
                            <List sx={{
                                display: "flex",
                                flexDirection: "column",
                                height: "35rem",
                                overflow: "auto",
                                overflowX: "hidden",
                            }}>
                                {playerCharacters.map((character) =>
                                    <ListItem key={character.tempId}
                                              sx={{margin: ".25rem", display: "flex"}}
                                              disablePadding>
                                        <Card sx={{backgroundColor: "whitesmoke", minWidth: 200}}>
                                            <ListItemButton onClick={() => {
                                                addCharacterToTmpInitiativeTracker(character.characterName);
                                            }}
                                                            sx={{textAlign: "center"}}>
                                                <ListItemText primary={<Typography
                                                    variant="body2">{character.characterName}</Typography>}/>
                                            </ListItemButton>
                                        </Card>
                                    </ListItem>
                                )}
                                {characters.map((character) =>
                                    <ListItem key={character._id}
                                              sx={{margin: ".25rem", display: "flex"}}
                                              disablePadding>
                                        <Card sx={{backgroundColor: "whitesmoke", minWidth: 200}}>
                                            <ListItemButton onClick={() => {
                                                addCharacterToTmpInitiativeTracker(character.characterName, character.characterHP);
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
                        <Grid item md={1}></Grid>
                        <Grid item md={5}>
                            <List sx={{
                                display: "flex",
                                flexDirection: "column",
                                height: "35rem",
                                overflow: "auto",
                                overflowX: "hidden",
                            }}>
                                {tmpInitiativeTracker.map((character) =>
                                    <ListItem key={character.id} sx={{margin: ".25rem", display: "flex"}}
                                              disablePadding>
                                        <Card sx={{backgroundColor: "whitesmoke", minWidth: 200}}>
                                            <ListItemButton onClick={() => {
                                                removeCharacterFromTmpInitiativeTracker(character.id);
                                            }}
                                                            sx={{textAlign: "center"}}>
                                                <ListItemText primary={<Typography
                                                    variant="body2">{character.name}</Typography>}/>
                                            </ListItemButton>
                                            <div>
                                                <input
                                                    type="number"
                                                    placeholder={character.initiative}
                                                    onChange={(e) => {
                                                        const newValue = parseInt(e.target.value, 10);
                                                        if (!isNaN(newValue)) {
                                                            updateCharacterInitiativeNumber(character.id, newValue);
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </Card>
                                    </ListItem>
                                )}
                            </List>
                        </Grid>
                    </Grid>
                    <Button sx={{width: "100%", backgroundColor: "#F5793B", marginTop: ".5rem"}}
                            variant="contained"
                            color="inherit" onClick={saveInitiativeTracker}>Start fight!</Button>
                </Box>
            </Dialog>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    position: "absolute",
                    right: 0,
                    margin: ".5rem .5rem 0 0"
                }}><Timer startSession={startSession}/></Box>
            <TabContext value={tabValue}>
                <Grid container sx={{height: "91.75vh"}}>
                    <Grid item md={1} sx={{marginRight: ".5rem", backgroundColor: "#ececec"}}>
                        <Tabs
                            value={tabValue}
                            onChange={handleChange}
                            orientation="vertical"
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
                            <Tab value="one" label="Scenario"/>
                            <Tab value="two" label="Characters"/>
                            <Tab value="three" label="Locations"/>
                        </Tabs>
                    </Grid>
                    <Grid item md={9.5} sx={{padding: ".5rem"}}>
                        <TabPanel value="one" index={0}>
                            <Grid container>
                                <Grid item md={12}>
                                    <Typography sx variant="h5"
                                                sx={{margin: ".5rem"}}>{scenario.scenarioName}</Typography>
                                </Grid>
                                <Grid item md={12}>
                                    <Typography sx variant="body2"
                                                sx={{margin: ".5rem"}}>{scenario.scenarioDescription}</Typography>
                                </Grid>
                            </Grid>
                        </TabPanel>
                        <TabPanel value="two" index={1}>
                            <Grid container>
                                <Grid item md={2}>
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
                                <Grid item md={10}>
                                    {chosenCharacter._id &&
                                        <Card sx={{marginLeft: "1rem", padding: ".5rem .5rem", width: 600}}>
                                            <Grid container>
                                                <Grid item xs={4}>
                                                    <div className={classes["img-container"]}>
                                                        <img src={chosenCharacter.characterPhoto} alt="Character photo"
                                                             className={sessionClasses["character-photo"]}/>
                                                    </div>
                                                    <div>
                                                        <Button
                                                            onClick={() => removeDeadCharacter(chosenCharacter.tempId)}>Delete</Button>
                                                        <TextField type="number" value={chosenCharacter.characterHP}
                                                                   onChange={(e) => {
                                                                       setChosenCharacter(character => ({
                                                                           ...chosenCharacter,
                                                                           characterHP: e.target.value
                                                                       }));
                                                                       setCharacters(characters => {
                                                                           return characters.map(character => {
                                                                               if (character.tempId === chosenCharacter.tempId) {
                                                                                   return {
                                                                                       ...chosenCharacter,
                                                                                       characterHP: e.target.value
                                                                                   };
                                                                               } else {
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
                                                        <Box sx={{display: "flex"}}>
                                                            <Typography variant="body2"
                                                                        sx={{marginRight: ".25rem"}}>S {chosenCharacter.characterStrength}<b>({getStatisticBonus(chosenCharacter.characterStrength)})</b></Typography>
                                                            <Typography variant="body2"
                                                                        sx={{marginRight: ".25rem"}}>ZR {chosenCharacter.characterDexterity}<b>({getStatisticBonus(chosenCharacter.characterDexterity)})</b></Typography>
                                                            <Typography variant="body2"
                                                                        sx={{marginRight: ".25rem"}}>KON {chosenCharacter.characterConstitution}<b>({getStatisticBonus(chosenCharacter.characterConstitution)})</b></Typography>
                                                            <Typography variant="body2"
                                                                        sx={{marginRight: ".25rem"}}>INT {chosenCharacter.characterIntelligence}<b>({getStatisticBonus(chosenCharacter.characterIntelligence)})</b></Typography>
                                                            <Typography variant="body2"
                                                                        sx={{marginRight: ".25rem"}}>MDR {chosenCharacter.characterWisdom}<b>({getStatisticBonus(chosenCharacter.characterWisdom)})</b></Typography>
                                                            <Typography variant="body2"
                                                                        sx={{marginRight: ".25rem"}}>CHA {chosenCharacter.characterCharisma}<b>({getStatisticBonus(chosenCharacter.characterCharisma)})</b></Typography>
                                                        </Box>
                                                        <Box> {chosenCharacter.featuresAndTraits.map((feature) =>
                                                            <ListItem key={feature.tempId}
                                                                      sx={{margin: ".25rem", display: "flex"}}
                                                                      disablePadding>
                                                                <Card sx={{
                                                                    backgroundColor: "whitesmoke",
                                                                    padding: ".25rem",
                                                                    minWidth: 200
                                                                }}>
                                                                    <Typography
                                                                        variant="h6">{feature.featureName}</Typography>
                                                                    <Typography variant="body2">
                                                                        {feature.featureDescription}
                                                                    </Typography>
                                                                    {feature.featureReach && (
                                                                        <Typography variant="body2">
                                                                            <b>Bonus
                                                                                ataku:</b> {feature.featureHitBonus}
                                                                        </Typography>
                                                                    )}
                                                                    {feature.featureDmg && (
                                                                        <Typography variant="body2">
                                                                            <b>Obrażenia:</b> {feature.featureDmg}
                                                                        </Typography>
                                                                    )}
                                                                    {feature.featureReach && (
                                                                        <Typography variant="body2">
                                                                            <b>Zasięg:</b> {feature.featureReach}
                                                                        </Typography>
                                                                    )}

                                                                </Card>

                                                            </ListItem>
                                                        )}
                                                            {/*TODO PO DODANIU EDYCJI POPRAWIĆ*/}
                                                            {chosenCharacter.characterName === "Wilk" &&
                                                                <Typography>
                                                                    Ugryzienie, +4, 2k4+2, rzut obronny na siłe ST 11 ->
                                                                    niepowodzenie -> powalenie
                                                                </Typography>}
                                                        </Box>
                                                        <Box>
                                                            {chosenCharacter.spells && chosenCharacter.spells.map(spell =>
                                                                <Typography>{spell.name}</Typography>
                                                            )}
                                                        </Box>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </Card>}
                                </Grid>
                            </Grid>
                        </TabPanel>
                        <TabPanel value="three" index={2}>
                            <Grid container>
                                <Grid item md={10.5}>
                                    <PreviewLocation scenarioId={scenarioId} isInEditingScenario={false}/>
                                </Grid>
                            </Grid>
                        </TabPanel>
                    </Grid>
                </Grid>
            </TabContext>

            <Card sx={{
                backgroundColor: "whitesmoke", padding: ".5rem", position: "absolute",
                top: "15rem",
                right: "2rem",
                height: "42rem",
            }}>
                <TabContext value={sideTabValue}>
                    <Tabs
                        value={sideTabValue}
                        onChange={handleChangeSideTab}
                        textColor="inherit"
                        aria-label="secondary tabs example"
                        variant="standard"
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
                        <Tab value="two" label="Notes"/>
                        <Tab value="three" label="Artifacts"/>
                        <Tab value="four" label="Spells"/>
                        <Tab value="five" label="Initiative"/>
                    </Tabs>

                    <TabPanel value="one" index={0}>
                        {playerCharacters.map((character, index) =>
                            <Card key={index} sx={{marginBottom: ".5rem", height: "6.75rem"}}>
                                <Typography
                                    variant="body1"><b>{character.characterName}</b> ({character.playerName})</Typography>
                                <Divider/>
                                <Typography variant="body1">Klasa pancerza: <b>{character.armorClass}</b></Typography>
                                <Typography variant="body1">Pasywna percepcja: <b>{character.characterPassiveWisdom}</b></Typography>
                            </Card>
                        )}
                    </TabPanel>
                    <TabPanel value="two" index={1}>
                        {chosenNote && (
                            <Box sx={{
                                border: "1px solid black",
                                borderRadius: "5px",
                                padding: ".125rem",
                            }}>
                                <Typography>{chosenNote}</Typography>
                            </Box>
                        )}

                        {/*<Typography variant="body2">Search for note</Typography>*/}
                        {/*<TextField sx={{width: "100%"}} value={foundNote}*/}
                        {/*           onChange={(event) => setFoundNote(event.target.value)}/>*/}
                        <List sx={{
                            display: "flex",
                            flexDirection: "column",
                            overflow: "auto",
                            overflowX: "hidden",
                            maxHeight: "27.5rem",
                        }}>
                            {/*TODO save note to db after adding them*/}
                            {notes?.length === 0 &&
                                <Typography variant="h6" textAlign="center">No notes</Typography>}
                            {notes.map((note, index) =>
                                <ListItem key={index}
                                          sx={{
                                              maxWidth: "16.5rem",
                                              margin: ".25rem",
                                              display: "flex",
                                              justifyContent: "center"
                                          }}
                                          disablePadding

                                >
                                    <Card sx={{backgroundColor: "whitesmoke", width: 320}}>
                                        <ListItemButton onClick={() => setChosenNote(note.note)}
                                                        sx={{textAlign: "center"}}>
                                            <ListItemText sx={{padding: ".25rem"}}
                                                          primary={<Typography
                                                              variant="body2">{note.note}</Typography>}/>
                                        </ListItemButton>

                                    </Card>
                                </ListItem>
                            )}
                        </List>
                        <Box sx={{position: "absolute", bottom: "1rem",}}>
                            <TextField sx={{width: "100%"}} value={newNoteValue}
                                       onChange={(event) => setNewNoteValue(event.target.value)}/>

                            <Button sx={{width: "100%", backgroundColor: "#F5793B"}}
                                    variant="contained"
                                    color="inherit"
                                    onClick={addNote}
                            >Add</Button>
                        </Box>

                    </TabPanel>
                    <TabPanel value="three" index={2}>
                        <TextField sx={{width: "100%"}} value={artifactSearchValue} placeholder="Search for artifact"
                                   onChange={(event) => setArtifactSearchValue(event.target.value)}/>
                        <List sx={{
                            display: "flex",
                            flexDirection: "column",
                            overflow: "auto",
                            overflowX: "hidden",
                            maxHeight: "27.5rem",
                        }}>
                            {/*TODO save note to db after adding them*/}
                            {artifacts?.length === 0 &&
                                <Typography variant="h6" textAlign="center">No artifacts</Typography>}
                            {artifacts.filter(artifact => artifact.name.toLowerCase().includes(artifactSearchValue.toLowerCase())).map((artifact, index) =>
                                <ListItem key={index}
                                          sx={{
                                              maxWidth: "16.5rem",
                                              margin: ".25rem",
                                              display: "flex",
                                              justifyContent: "center"
                                          }}
                                          disablePadding

                                >
                                    <Card sx={{backgroundColor: "whitesmoke", width: 320}}>
                                        <ListItemButton onClick={() => previewArtifact(artifact)}
                                                        sx={{textAlign: "center"}}>
                                            <ListItemText sx={{padding: ".25rem"}}
                                                          primary={<Typography
                                                              variant="body2">{artifact.name}</Typography>}/>
                                        </ListItemButton>

                                    </Card>
                                </ListItem>
                            )}
                        </List>
                    </TabPanel>
                    <TabPanel value="four" index={3}>
                        <TextField sx={{width: "100%"}} value={spellSearchValue} placeholder="Search for spell"
                                   onChange={(event) => setSpellSearchValue(event.target.value)}/>
                        <List sx={{
                            display: "flex",
                            flexDirection: "column",
                            overflow: "auto",
                            overflowX: "hidden",
                            maxHeight: "27.5rem",
                        }}>
                            {/*TODO save note to db after adding them*/}
                            {spells?.length === 0 &&
                                <Typography variant="h6" textAlign="center">No spells</Typography>}
                            {spells.filter(spell => spell.name.toLowerCase().includes(spellSearchValue.toLowerCase())).map((spell, index) =>
                                <ListItem key={index}
                                          sx={{
                                              maxWidth: "16.5rem",
                                              margin: ".25rem",
                                              display: "flex",
                                              justifyContent: "center"
                                          }}
                                          disablePadding

                                >
                                    <Card sx={{backgroundColor: "whitesmoke", width: 320}}>
                                        <ListItemButton onClick={() => previewSpell(spell)}
                                                        sx={{textAlign: "center"}}>
                                            <ListItemText sx={{padding: ".25rem"}}
                                                          primary={<Typography
                                                              variant="body2">{spell.name}</Typography>}/>
                                        </ListItemButton>

                                    </Card>
                                </ListItem>
                            )}
                        </List>
                    </TabPanel>
                    <TabPanel value="five" index={4}>
                        <List sx={{
                            display: "flex",
                            flexDirection: "column",
                            overflow: "auto",
                            overflowX: "hidden",
                            maxHeight: "27.5rem",
                        }}>
                            {initiativeTracker.map(character =>
                                <ListItem key={character.id}
                                          sx={{
                                              maxWidth: "16.5rem",
                                              margin: ".25rem",
                                              display: "flex",
                                              justifyContent: "center"
                                          }}
                                          disablePadding
                                >
                                    <Card sx={{backgroundColor: "whitesmoke", width: 320}}>
                                        <ListItemButton
                                            onClick={() => removeCharacterFromInitiativeTracker(character.id)}>
                                            <ListItemText sx={{padding: ".25rem"}}
                                                          primary={<Typography
                                                              variant="body2">{character.name} {character.initiative}</Typography>}/>
                                        </ListItemButton>
                                        <input placeholder={character.hp} />

                                    </Card>
                                </ListItem>
                            )}
                        </List>
                        <Box sx={{position: "absolute", bottom: ".5rem", right: ".25rem"}}>
                            <Button sx={{width: "100%", backgroundColor: "#F5793B", marginBottom: ".25rem"}}
                                    variant="contained"
                                    color="inherit" onClick={handleInitiativeTrackerDialogOpen}>Update initiative
                                tracker</Button>
                            <Button sx={{width: "100%", backgroundColor: "#F5793B", marginBottom: ".25rem"}}
                                    variant="contained"
                                    color="inherit"
                                    onClick={handleInitiativeTrackerDialogOpenAndClearTmpInitiativeTracker}>Create new
                                initiative
                                tracker</Button>
                        </Box>
                    </TabPanel>
                </TabContext>
            </Card>
        </>
    )
}

export default Session;