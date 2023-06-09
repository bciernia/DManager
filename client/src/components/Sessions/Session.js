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
            CURRENT SESSION
            <Grid container>
                <Grid item md={4}>
                    <PreviewLocation scenarioId={scenarioId} isInEditingScenario={false}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default Session;