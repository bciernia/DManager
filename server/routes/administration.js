const express = require('express');
const nodemailer = require("nodemailer");
const {MailCredentials} = require('../secrets/MailCredentials');

const administrationRouter = express.Router();

administrationRouter

    .post('/', (req, res) => {
        const mail = req.body;

        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: MailCredentials.login,
                pass: MailCredentials.password,
            }
        });

        const mailOptions = {
            from: `${mail.fullName} <${mail.emailAddress}>`,
            to: MailCredentials.login,
            subject: mail.emailSubject,
            text: mail.emailContent,
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                console.log(error);
                res.send("error");
            }else{
                res.status(200).send(info);
            }
        })

    })

module.exports = {
    administrationRouter,
}