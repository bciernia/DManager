import {
    Avatar,
    Box,
    Card,
    Dialog,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography
} from "@mui/material";
import React, {useState} from "react";

const CharacterDetails = props => {
    const character = props.character;

    //TODO finish character details page

    const [chosenFeatureAndTrate, setChosenFeatureAndTrate] = useState({});
    const [featureAndTrateDialogOpen, setFeatureAndTrateDialogOpen] = useState(false);

    const handleFeatureDialogClose = () => {
        setFeatureAndTrateDialogOpen(false);
    }

    const previewFeatureAndTrait = (feature) => {
        setChosenFeatureAndTrate(feature);
        setFeatureAndTrateDialogOpen(true);
    }

    return (
        <div>
            <Dialog onClose={handleFeatureDialogClose} open={featureAndTrateDialogOpen}>
                <Box sx={{padding: ".5rem"}}>
                    <Typography variant="h6">
                        {chosenFeatureAndTrate.featureName}
                    </Typography>
                    <Typography variant="body2">
                        {chosenFeatureAndTrate.featureDescription}
                    </Typography>
                    <Divider/>
                    {chosenFeatureAndTrate.featureReach && (
                        <Typography variant="body2">
                            <b>Zasięg:</b> {chosenFeatureAndTrate.featureReach}
                        </Typography>
                    )}
                </Box>
            </Dialog>

            <Box sx={{width: "75rem", height: "50rem", margin: "2rem auto"}}>
                <Grid container spacing={2}>
                    <Grid item md={3} sx={{minHeight: "20rem"}}>
                        <Typography variant="h5">{character.characterName}</Typography>
                        <Typography variant="h5">{character.characterType}</Typography>
                        <Typography variant="h5">{character.characterClass}</Typography>
                        <Typography variant="h5">{character.characterRace}</Typography>
                        <Typography variant="h5">{character.characterAlignment}</Typography>
                    </Grid>
                    <Grid item md={3} sx={{minHeight: "20rem"}}>

                    </Grid>
                    <Grid item md={3} sx={{minHeight: "20rem", position: "relative"}}>
                        <Avatar src={character.characterPhoto}
                                sx={{position: "relative", left: "2.5rem", width: '15rem', height: '15rem'}}/>
                    </Grid>
                </Grid>
                <Typography>{character.characterDescription}</Typography>
                <List sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    flexDirection: "row",
                    maxWidth: "30rem",
                }}>
                    {character.featuresAndTraits.map((feature) =>
                        <ListItem key={feature.tempId}
                                  sx={{margin: ".25rem", display: "flex"}}
                                  disablePadding>
                            <Card sx={{backgroundColor: "whitesmoke", padding: ".25rem", minWidth: 200}}>
                                <Typography
                                    variant="h6">{feature.featureName}</Typography>
                                <Typography variant="body2">
                                    {feature.featureDescription}
                                </Typography>
                                {feature.featureReach && (
                                    <Typography variant="body2">
                                        <b>Zasięg:</b> {feature.featureReach}
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
                </List>
            </Box>
        </div>
    )
}

export default CharacterDetails;