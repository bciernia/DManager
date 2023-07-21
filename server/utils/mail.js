const nodemailer = require('nodemailer');
const {Credentials} = require('../secrets/Credentials');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: Credentials.login,
        pass: Credentials.password,
    }
});

module.exports = {
    transporter,
}