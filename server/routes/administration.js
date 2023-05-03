const express = require('express');

const administrationRouter = express.Router();

administrationRouter

    .get('/', (req, res) => {
        res.send("administration router");
    })

module.exports = {
    administrationRouter,
}