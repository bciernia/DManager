import {Box, Typography} from "@mui/material";
import NewCampaignForm from "./Form/NewCampaignForm";

const CreateNewCampaign = () => {
    return (
        <Box sx={{height: "80vh", width: "100%"}}>
            <Typography variant="h2" textAlign="center">Create new campaign </Typography>
            <NewCampaignForm />
        </Box>
    )
}

export default CreateNewCampaign;