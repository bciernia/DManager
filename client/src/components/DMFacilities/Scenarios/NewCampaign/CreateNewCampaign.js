import {Box, Typography} from "@mui/material";
import NewCampaignForm from "./NewCampaignForm";

const CreateNewCampaign = () => {
    return (
        <Box sx={{height: "100vh", width: "100%"}}>
            <Typography variant="h2" textAlign="center">Create new campaign </Typography>
            <NewCampaignForm />
        </Box>
    )
}

export default CreateNewCampaign;