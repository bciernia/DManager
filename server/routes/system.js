const express = require('express');
const {MailCredentials} = require("../secrets/MailCredentials");
const {transporter} = require("../utils/mail");

const systemRouter = express.Router();

systemRouter

    .post('/send-mail', (req, res) => {
        const mail = req.body;

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
    systemRouter,
}