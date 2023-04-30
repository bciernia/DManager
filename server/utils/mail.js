const nodemailer = require('nodemailer');
const {MailCredentials} = require('../secrets/MailCredentials');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: MailCredentials.login,
        pass: MailCredentials.password,
    }
});

module.exports = {
    transporter,
}