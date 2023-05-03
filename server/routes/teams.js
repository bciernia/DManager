const express = require('express');
const {CharacterRecord} = require("../records/character.record");
const {TeamRecord} = require("../records/team.record");
const {ObjectId} = require("mongodb");

const teamRouter = express.Router();

teamRouter

    //Get all teams
    .get('/', async (req, res) => {
        const teams = await TeamRecord.findAll();

        res.status(200).send(teams);
    })

    //Add new team
    .post('/newTeam', async (req, res) => {
        const team = req.body;

        const newTeam = new TeamRecord({
            name: team.name,
            gameSystem: team.gameSystem,
        })

        const newTeamId = await newTeam.insert();

        res.status(201).send(newTeamId);
    })

    //DELETE TEAM
    .delete('/:teamId', async (req, res) => {
        const {teamId} = req.params;
        const teamToDelete = await TeamRecord.find(teamId);

        await teamToDelete.delete();

        res.status(204);
    })

    //CHARACTERS

    //GET ALL CHARACTERS FROM CURRENT TEAM
    .get('/:teamId/characters', async (req, res) => {
        const {teamId} = req.params;

        const character = await CharacterRecord.findAllByTeamId(teamId);

        res.status(200).send(character);
    })

    //GET CHARACTER FROM CURRENT TEAM
    .get('/:teamId/characters/:characterId', async (req, res) => {
        const {characterId} = req.params;

        const character = await CharacterRecord.find(characterId);

        res.status(200).send(character);
    })

    //ADD CHARACTER TO TEAM
    .post('/:teamId/characters/newCharacter', async (req, res) => {
        const character = req.body;

        const newCharacter = new CharacterRecord({
            ...character,
            characterPhoto: character.characterPhoto,
            characterName: character.characterName,
            characterClass: character.characterClass,
            playerName: character.playerName,
            exp: 0,
            isAlive: true,
            teamId: new ObjectId(character.teamId),
        })

        const newCharacterId = await newCharacter.insert();

        res.status(201).send(newCharacterId);
    })

    //UPDATE CHARACTER
    .put('/:teamId/characters/:characterId', async (req, res) => {
        const {characterId} = req.params;
        const newCharacter = req.body;

        const characterToUpdate = await CharacterRecord.find(characterId);
        characterToUpdate.characterName = newCharacter.characterName;
        characterToUpdate.exp = newCharacter.exp;

        await characterToUpdate.update();

        res.status(200).send(characterToUpdate);
    })

    //DELETE CHARACTER
    .delete('/:teamId/characters/:characterId', async (req, res) => {
        const {characterId} = req.params;

        const characterToDelete = await CharacterRecord.find(characterId);

        await characterToDelete.delete();

        res.status(204);
    })

module.exports = {
    teamRouter,
}