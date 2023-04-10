const express = require('express');
const {CharacterRecord} = require("../records/character.record");
const {TeamRecord} = require("../records/team.record");

const teamRouter = express.Router();

teamRouter

    .get('/', (req, res) => {
        res.send('ALL TEAMS');
    })

    .post('/newTeam', (req, res) => {
        const team = req.body;

        (async () => {
            try {
                const newTeam = new TeamRecord({
                    name: team.name,
                    gameSystem: team.gameSystem,
                })

                const newTeamId = await newTeam.insert();

                res.status(201).send(newTeamId);

            } catch (e) {
                throw new Error(e);
            }
        })();
    })

module.exports = {
    teamRouter,
}