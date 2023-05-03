const express = require('express');

const gameRouter = express.Router();

gameRouter

    //GET ALL SESSIONS
    .get('/', (req, res) => {
        res.send('TEST');
    })

module.exports = {
    gameRouter,
}