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

    const [selectedCampaignListItem, setSelectedCampaignListItem] = useState(0);
    const [selectedScenarioListItem, setSelectedScenarioListItem] = useState(0);

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

    const handleCampaignListItemClick = (event, index) => {
        setSelectedCampaignListItem(index);
    };

    const handleScenarioListItemClick = (event, index) => {
        setSelectedScenarioListItem(index);
    };

    const changeChosenCampaign = (campaign) => {
        setChosenCampaign(campaign);
        setChosenScenario({});
        setSelectedScenarioListItem(0);
    }

    const startSession = () => {
        if(!chosenCampaign._id){
            alert("You have to choose campaign");
            return;
        }

        if(!chosenScenario._id){
            alert("You have to choose scenario");
            return;
        }

        navigate(`/campaign/${chosenCampaign._id.toString()}/scenario/${chosenScenario._id.toString()}/session`);
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
                    {campaignsArray.map((campaign, index) =>
                        <ListItem key={campaign._id}
                                  sx={{margin: ".25rem", display: "flex", justifyContent: "center"}}
                                  disablePadding>
                            <ListItemButton selected={selectedCampaignListItem === index + 1}
                                            onClick={(event) => {
                                                changeChosenCampaign(campaign)
                                                handleCampaignListItemClick(event, index + 1)
                                            }}
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
                    {scenariosFromChosenCampaign.map((scenario, index) =>
                        <ListItem key={scenario._id}
                                  sx={{margin: ".25rem", display: "flex", justifyContent: "center"}}
                                  disablePadding>
                            <ListItemButton selected={selectedScenarioListItem === index+1}
                                            onClick={(event) => {
                                                setChosenScenario(scenario);
                                                handleScenarioListItemClick(event, index + 1)
                                            }}
                                            sx={{textAlign: "center"}}>
                                <ListItemText primary={<Typography
                                    variant="body2">{scenario.scenarioName}</Typography>}/>
                            </ListItemButton>
                        </ListItem>
                    )}
                </List>
            </Card>}
            <Button
                onClick={startSession}>START
                SESSION</Button>
        </>
    )
}

export default StartNewSession