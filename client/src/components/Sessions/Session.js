import PreviewLocation from "../DMFacilities/Location/PreviewLocation/PreviewLocation";
import React from "react";
import {useParams} from "react-router-dom";
import {Grid} from "@mui/material";

const Session = props => {
    // TODO ask if someone want to exit

    const {campaignId, scenarioId} = useParams();

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