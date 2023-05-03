import {Divider, Grid} from "@mui/material";
import classes from './ContactUs.module.css';
import contactUsLogo from '../../../assets/images/contact_us_logo.png';
import ContactUsForm from "./Form/ContactUsForm";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const ContactUs = () => {
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const sendMail = (message) => {
        setIsLoading(true);
        fetch('http://127.0.0.1:3000/send-mail', {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(message)
        }).then(res => res.json())
            .finally(() => {
                setIsLoading(false);
                navigate('success');
            });
    }

    return (
        <div className={classes.container}>
            <Grid container sx={{
                height: "100%",
            }}>
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
                    <ContactUsForm isLoading={isLoading} sendMail={sendMail}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default ContactUs;