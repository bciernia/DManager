import PreviewLocation from "../DMFacilities/Location/PreviewLocation/PreviewLocation";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Card, Grid, List, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";
import PreviewHandout
    from "../DMFacilities/Campaign/CampaignDetails/ScenarioDetailsPartialView/EditScenario/AddHandout/PreviewHandout/PreviewHandout";

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


    useEffect(() => {
        Promise.all([
            getScenarioById(scenarioId),
            getHandoutsForScenario(scenarioId),
            getNotesForScenario(scenarioId),
        ]).then(([scenarioData, handoutsData, notesData]) => {
            setScenario(scenarioData);
            setHandouts(handoutsData.filter(handout => handout.handoutLocation === scenarioId));
            setNotes(notesData);
        })
    }, []);

    return (
        <div>
            <div><Typography variant="h5">{scenario.scenarioName}</Typography></div>
            <div>
                <Typography variant="h6">Scenario handouts</Typography>
                {handouts.map(handout => <PreviewHandout handout={handout}/>)}
            </div>
            <Grid container>
                <Grid item md={2.5}>
                    <Typography variant="h5"
                                sx={{marginBottom: ".5rem"}}>Notes</Typography>
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
                <Grid item md={3.5}>
                    <PreviewLocation scenarioId={scenarioId} isInEditingScenario={false}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default Session;