import {Divider, Grid} from "@mui/material";
import classes from './ContactUs.module.css';
import contactUsLogo from '../../assets/logo/contact_us_logo.png';
import ContactUsForm from "./Form/ContactUsForm";

const ContactUs = () => {
    return (
        <div className={classes.container}>
            <Grid container sx={{height: "100%"}}>
                <Grid item xs sx={{
                    display: "flex",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 0
                }}>
                    <img src={contactUsLogo} className={classes.logo}/>
                </Grid>
                <Divider orientation="vertical" flexItem/>
                <Grid item xs sx={{display: "flex", height: "100%", justifyContent: "center", alignItems: "center"}}>
                    <ContactUsForm/>
                </Grid>
            </Grid>
        </div>
    )
}

export default ContactUs;