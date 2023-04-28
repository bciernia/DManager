import {Divider, Grid} from "@mui/material";
import classes from './ContactUs.module.css';
import contactUsLogo from '../../assets/images/contact_us_logo.png';
import ContactUsForm from "./Form/ContactUsForm";
import {useState} from "react";

const ContactUs = () => {
    const [userMessage, setUserMessage] = useState({});

    const sendMail = (message) => {
        setUserMessage(message);
    }

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
                    <ContactUsForm sendMail={sendMail}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default ContactUs;