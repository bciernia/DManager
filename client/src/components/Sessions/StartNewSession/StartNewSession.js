import React, {useEffect, useState} from "react";
import Card from "../../UI/Card/Card";
import {Button, List, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";
import Spinner from "../../UI/Spinner/Spinner";
import {useNavigate} from "react-router-dom";

const getAllCampaigns = () =>
    fetch(`http://127.0.0.1:3000/dm/campaign/all`)
        .then(res => res.json());

const getScenariosFromChosenCampaign = (campaignId) =>
    fetch(`http://127.0.0.1:3000/dm/campaign/${campaignId}/scenario/all`)
        .then(res => res.json());

const StartNewSession = props => {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [campaignsArray, setCampaignsArray] = useState([]);
    const [chosenCampaign, setChosenCampaign] = useState({});
    const [chosenScenario, setChosenScenario] = useState({});
    const [scenariosFromChosenCampaign, setScenariosFromChosenCampaign] = useState([]);

    useEffect(() => {
        getAllCampaigns()
            .then(campaigns => {
                setCampaignsArray(campaigns);
            });
    }, []);

    useEffect(() => {
        if (chosenCampaign._id) {
            setIsLoading(true);
            getScenariosFromChosenCampaign(chosenCampaign._id.toString())
                .then(scenarios => setScenariosFromChosenCampaign(scenarios));
        }
        setIsLoading(false);
    }, [chosenCampaign])

    const changeChosenCampaign = (campaign) => {
        setChosenCampaign(campaign);
        setChosenScenario({});
    }

    return (
        <>
            <Card>
                <List sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignContent: "center",
                }}>
                    {campaignsArray?.length === 0 ?
                        <Typography variant="h6" textAlign="center">No campaigns</Typography> :
                        <Typography variant="h6" textAlign="center">Choose campaign to play</Typography>}
                    {campaignsArray.map((campaign) =>
                        <ListItem key={campaign._id}
                                  sx={{margin: ".25rem", display: "flex", justifyContent: "center"}}
                                  disablePadding>
                            <ListItemButton onClick={() => changeChosenCampaign(campaign)}
                                            sx={{textAlign: "center"}}>
                                <ListItemText primary={<Typography
                                    variant="body2">{campaign.campaignName}</Typography>}/>
                            </ListItemButton>
                        </ListItem>
                    )}
                </List>
            </Card>
            {chosenCampaign._id && <Card>
                {isLoading && <Spinner/>}
                <List sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignContent: "center",
                }}>
                    {scenariosFromChosenCampaign.length === 0 ?
                        <Typography variant="h6" textAlign="center">No scenarios in chosen campaign</Typography>
                        : <Typography variant="h6" textAlign="center">Choose scenario to play</Typography>}
                    {scenariosFromChosenCampaign.map((scenario) =>
                        <ListItem key={scenario._id}
                                  sx={{margin: ".25rem", display: "flex", justifyContent: "center"}}
                                  disablePadding>
                            <ListItemButton onClick={() => setChosenScenario(scenario)}
                                            sx={{textAlign: "center"}}>
                                <ListItemText primary={<Typography
                                    variant="body2">{scenario.scenarioName}</Typography>}/>
                            </ListItemButton>
                        </ListItem>
                    )}
                </List>
            </Card>}
            <Button onClick={() => navigate(`/campaign/${chosenCampaign._id.toString()}/scenario/${chosenScenario._id.toString()}/session`)}>START SESSION</Button>
        </>
    )
}

export default StartNewSession