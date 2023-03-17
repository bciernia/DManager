const express = require('express');

const gameRouter = express.Router();

gameRouter

    .get('/test', (req, res) => {
        res.send('TEST');
    })

module.exports = {
    gameRouter,
}