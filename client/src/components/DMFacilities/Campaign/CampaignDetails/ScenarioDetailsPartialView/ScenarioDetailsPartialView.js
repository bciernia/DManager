import {Grid, Typography} from "@mui/material";

const ScenarioDetailsPartialView = props => {
    const scenario = props.scenario;

    return (
        <div>
            <Typography variant="h2">{scenario.scenarioName}</Typography>
            <Typography variant="h4">{scenario.scenarioDescription}</Typography>
            <Grid container justifyContent="flex-start" alignItems="stretch" direction="column">
                <Grid item sx={{backgroundColor: "whitesmoke", margin: ".5rem .5rem"}}>
                    Notes
                </Grid>
                <Grid item sx={{backgroundColor: "whitesmoke", margin: ".5rem .5rem"}}>
                    Characters?
                </Grid>
                <Grid item sx={{backgroundColor: "whitesmoke", margin: ".5rem .5rem"}}>
                    Locations
                </Grid>
                <Grid item sx={{backgroundColor: "whitesmoke", margin: ".5rem .5rem"}}>
                    Handouts
                </Grid>
            </Grid>
        </div>
    )
}

export default ScenarioDetailsPartialView;