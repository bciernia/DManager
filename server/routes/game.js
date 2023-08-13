const express = require('express');
const {ScenarioRecord} = require("../records/scenario.record");
const {CampaignRecord} = require("../records/campaign.record");
const {SessionRecord} = require("../records/session.record");

const gameRouter = express.Router();

gameRouter

    //GET ALL SESSIONS
    .get('/', (req, res) => {
        res.send('TEST');
    })

    .post('/session', async (req, res) => {
        const session = req.body;

        const newSession = new SessionRecord({
            ...session
        });
        const newSessionId = await newSession.insert();

        res.status(201).send(newSessionId);
    })

    .put('/session/:sessionId', async (req, res) => {
        const {sessionId} = req.params;
        const updatedSession = req.body;

        const sessionToUpdate = await SessionRecord.find(sessionId);
        sessionToUpdate.sessionName = updatedSession.scenarioName.toString();
        sessionToUpdate.sessionTime = updatedSession.sessionTime;
        sessionToUpdate.sessionNotes = updatedSession.sessionNotes;
        sessionToUpdate.sessionCharacters = updatedSession.sessionCharacters;

        await sessionToUpdate.update();

        res.status(200).send(sessionToUpdate);
    })

module.exports = {
    gameRouter,
}