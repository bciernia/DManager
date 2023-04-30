import {Button, Divider, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import classes from './ContactUsForm.module.css';
import Card from "../../../UI/Card/Card";
import {useField} from "formik";
import {useNavigate} from "react-router-dom";

const ContactUsForm = props => {

    const navigate = useNavigate();

    const [fullName, setFullName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [emailSubject, setEmailSubject] = useState('');
    const [emailContent, setEmailContent] = useState('');

    const [nameTouched, setNameTouched] = useState(false);
    const [mailTouched, setMailTouched] = useState(false);
    const [subjectTouched, setSubjectTouched] = useState(false);
    const [contentTouched, setContentTouched] = useState(false);

    const isNameValid = name => name.length < 2 || name.length > 50;
    const isMailValid = mail => mail.length < 2 || mail.length > 50;
    const isMailSubjectValid = mail => mail.length < 2 || mail.length > 50;
    const isMailContentValid = content => content.length < 1 || content.length > 1000;

    const handleSubmit = event => {
        event.preventDefault();

        if (isNameValid(fullName) || isMailValid(emailAddress) || isMailSubjectValid(emailSubject) || isMailContentValid(emailContent)) {
            return;
        }

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
            <form className={classes.form} onSubmit={(event) => handleSubmit(event)}>
                <TextField sx={{width: "80%"}} type="text" label="Full name"
                           error={nameTouched && isNameValid(fullName)}
                           helperText={(nameTouched && isNameValid(fullName)) ? "Name must have more than 2 characters and less than 50" : ""}
                           inputProps={{maxLength: 30}}
                           onBlur={() => setNameTouched(true)}
                           required
                           onChange={(event) => setFullName(event.target.value)}/>
                <TextField sx={{width: "80%"}} type="email" label="E-mail address"
                           inputProps={{maxLength: 50}}
                           error={mailTouched && isMailValid(emailAddress)}
                           helperText={(mailTouched && isMailValid(emailAddress)) ? "E-mail address is required" : ""}
                           onBlur={() => setMailTouched(true)}
                           required
                           onChange={(event) => setEmailAddress(event.target.value)}/>
                <TextField sx={{width: "80%"}} type="text" label="E-mail subject"
                           error={subjectTouched && isMailSubjectValid(emailSubject)}
                           helperText={(subjectTouched && isMailSubjectValid(emailSubject)) ? "E-mail subject is required and can not be longer than 50 characters" : ""}
                           onBlur={() => setSubjectTouched(true)}
                           required
                           inputProps={{maxLength: 50}}
                           onChange={(event) => setEmailSubject(event.target.value)}/>
                <TextField sx={{width: "80%"}} type="text" inputProps={{maxLength: 1000}} multiline
                           rows={5} label="E-mail content"
                           error={contentTouched && isMailContentValid(emailContent)}
                           helperText={(contentTouched && isMailContentValid(emailContent)) ? "E-mail content is required and can not be longer than 1000 characters " : ""}
                           onBlur={() => setContentTouched(true)}
                           required
                           onChange={(event) => setEmailContent(event.target.value)}/>
                <div className={classes["characters-counter"]}><p>{emailContent.length}/1000</p></div>
                <Button sx={{backgroundColor: "#F5793B"}} variant="contained" color="inherit"
                        type="submit">Send</Button>
            </form>
        </Card>
    )
}

export default ContactUsForm;