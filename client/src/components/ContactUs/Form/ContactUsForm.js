import {Button, Divider, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import classes from './ContactUsForm.module.css';
import Card from "../../UI/Card/Card";

const ContactUsForm = props => {

    const [fullName, setFullName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [emailSubject, setEmailSubject] = useState('');
    const [emailContent, setEmailContent] = useState('');

    const isNameValid = name => name.length < 2

    const handleSubmit = () => {


        const userMessage = {
            fullName,
            emailAddress,
            emailSubject,
            emailContent,
        }

        props.sendMail(userMessage);
    }

    return (
        <Card>
            <Typography variant="h2" textAlign="center" marginBottom="1rem">Contact us!</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <TextField sx={{width: "80%"}} type="text" label="Full name"
                           inputProps={{maxLength: 30}}
                           onChange={(event) => setFullName(event.target.value)}/>
                <TextField sx={{width: "80%"}} type="email" label="E-mail address"
                           inputProps={{maxLength: 50}}
                           onChange={(event) => setEmailAddress(event.target.value)}/>
                <TextField sx={{width: "80%"}} type="text" label="E-mail subject"
                           inputProps={{maxLength: 50}}
                           onChange={(event) => setEmailSubject(event.target.value)}/>
                <TextField sx={{width: "80%"}} type="text" inputProps={{maxLength: 1000}} multiline minRows={5}
                           maxRows={5} label="E-mail content"
                           onChange={(event) => setEmailContent(event.target.value)}/>
                <div className={classes["characters-counter"]}><p>{emailContent.length}/1000</p></div>
                <Button sx={{backgroundColor: "#F5793B" }} variant="contained" color="inherit"
                        type="submit">Send</Button>
            </form>
        </Card>
    )
}

export default ContactUsForm;