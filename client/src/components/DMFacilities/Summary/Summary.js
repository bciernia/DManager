import {
    Box,
    Button,
    Card,
    Divider, FormControlLabel,
    Grid, InputLabel,
    List,
    ListItem,
    ListItemButton,
    ListItemText, Switch
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import AllTeams from "../Teams/AllTeams/AllTeams";
import classes from "./Summary.module.css";
import Character from "../Character/Character";
import AllCharacters from "../Character/AllCharacters";

const Summary = () => {
    const [isChecked, setIsChecked] = useState(false);

    const navigate = useNavigate();

    const goToAddNewCampaignScreen = () => {
        navigate(`campaign/newCampaign`)
    }

    const goToAddNewScenarioScreen = () => {
        navigate(`scenario/newScenario`)
    }

    const goToAddNewTeamView = () => {
        navigate(`teams/newTeam`);
    }

    const goToAddNewNpcView = () => {
        navigate('character/newCharacter');
    }

    const isSwitchChecked = () => {
        setIsChecked(!isChecked);
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            flexWrap: 'wrap',
            margin: "0 .5rem",
        }}>
            <Grid container spacing={2}>
                <Grid item md={6}>
                    <Card sx={{
                        marginTop: '.5rem',
                        width: '100%',
                        height: '25rem',
                        backgroundColor: '#ffeeee',
                    }}>
                        <Grid container spacing={2} paddingTop={1}>
                            <Grid item md={4}>
                                <Button onClick={goToAddNewCampaignScreen} sx={{float: "left"}}>Add campaign</Button>
                            </Grid>
                            <Grid item md={5}>
                                <FormControlLabel
                                    label="Filter scenarios by campaign"
                                    control={
                                        <Switch checked={isChecked} onChange={isSwitchChecked} name="gilad"/>
                                    }
                                />
                            </Grid>
                            <Grid item md={3}>
                                <Button onClick={goToAddNewScenarioScreen} sx={{float: "right"}}>Add scenario</Button>
                            </Grid>
                            <Divider sx={{width: "100%"}}/>
                            <Box sx={{width: "50%", maxWidth: 400, bgcolor: 'background.paper'}}>
                                <nav aria-label="main mailbox folders">
                                    <List sx={{
                                        width: '100%',
                                        position: 'relative',
                                        overflow: 'auto',
                                        maxHeight: 340,
                                    }}>
                                        <ListItem disablePadding>
                                            <ListItemButton sx={{textAlign: "center"}}>
                                                <ListItemText primary="Campaign name" secondary={'Game system'}
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton sx={{textAlign: "center"}}>
                                                <ListItemText primary="Inbox"/>
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton sx={{textAlign: "center"}}>
                                                <ListItemText primary="Inbox"/>
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton sx={{textAlign: "center"}}>
                                                <ListItemText primary="Inbox"/>
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton sx={{textAlign: "center"}}>
                                                <ListItemText primary="Inbox"/>
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton sx={{textAlign: "center"}}>
                                                <ListItemText primary="Inbox"/>
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton sx={{textAlign: "center"}}>
                                                <ListItemText primary="Inbox"/>
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton sx={{textAlign: "center"}}>
                                                <ListItemText primary="Inbox"/>
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton sx={{textAlign: "center"}}>
                                                <ListItemText primary="Inbox"/>
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton sx={{textAlign: "center"}}>
                                                <ListItemText primary="Tse"/>
                                            </ListItemButton>
                                        </ListItem>

                                    </List>
                                </nav>
                            </Box>
                            <Box sx={{width: "50%", maxWidth: 400, bgcolor: 'background.paper'}}>
                                <nav aria-label="main mailbox folders">
                                    <List sx={{
                                        width: '100%',
                                        position: 'relative',
                                        overflow: 'auto',
                                        maxHeight: 340,
                                    }}>
                                        <ListItem disablePadding>
                                            <ListItemButton sx={{textAlign: "center"}}>
                                                <ListItemText primary="Campaign name" secondary={'Game system'}
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton sx={{textAlign: "center"}}>
                                                <ListItemText primary="Inbox"/>
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton sx={{textAlign: "center"}}>
                                                <ListItemText primary="Inbox"/>
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton sx={{textAlign: "center"}}>
                                                <ListItemText primary="Inbox"/>
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton sx={{textAlign: "center"}}>
                                                <ListItemText primary="Inbox"/>
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton sx={{textAlign: "center"}}>
                                                <ListItemText primary="Inbox"/>
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton sx={{textAlign: "center"}}>
                                                <ListItemText primary="Inbox"/>
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton sx={{textAlign: "center"}}>
                                                <ListItemText primary="Inbox"/>
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton sx={{textAlign: "center"}}>
                                                <ListItemText primary="Inbox"/>
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton sx={{textAlign: "center"}}>
                                                <ListItemText primary="Tse"/>
                                            </ListItemButton>
                                        </ListItem>

                                    </List>
                                </nav>
                            </Box>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card sx={{
                        marginTop: '.5rem',
                        width: '100%',
                        height: '25rem',
                        backgroundColor: '#ffff00',
                        overflow: 'auto',
                    }}>
                        <div className={classes["section-headline"]}><Button sx={{position: "fixed"}} onClick={goToAddNewTeamView}>Add new team</Button></div>
                        <Divider sx={{height: "2rem"}} variant="fullWidth"/>
                        <AllTeams/>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card sx={{maxWidth: "85vw", marginTop: '.5rem', width: '100%', height: '25rem', backgroundColor: '#ffff00', overflowX: "auto" }}>
                        <div className={classes["section-headline"]}> <Button onClick={goToAddNewNpcView}>Add new character</Button></div>
                        <Divider sx={{height: "1.25rem"}} variant="fullWidth"/>
                        <Box sx={{
                            padding: ".5rem",
                            display: 'flex',
                            flexWrap: 'nowrap',
                            alignContent: 'center',
                            gap: ".5rem",
                        }}>
                            <AllCharacters />
                        </Box>
                    </Card>
                </Grid>

            </Grid>
        </Box>
    )
}

export default Summary;