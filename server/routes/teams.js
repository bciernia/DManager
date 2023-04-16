const express = require('express');
const {CharacterRecord} = require("../records/character.record");
const {TeamRecord} = require("../records/team.record");
const {ObjectId} = require("mongodb");

const teamRouter = express.Router();

teamRouter

    //Get all teams
    .get('/', (req, res) => {
        (async () => {
            try {
                const teams = await TeamRecord.findAll();

                res.status(200).send(teams);

            } catch (e) {
                throw new Error(e);
            }
        })();
    })

    //Add new team
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

    //DELETE TEAM
    .delete('/:teamId', (req, res) => {
        const {teamId} = req.params;

        (async () => {
            try {
                const teamToDelete = await TeamRecord.find(teamId);

                await teamToDelete.delete();

                res.status(204);
            }catch (e) {
                throw new Error(e);
            }
        })();
    })

    //CHARACTERS

    //GET ALL CHARACTERS FROM CURRENT TEAM
    .get('/:teamId/characters', (req, res) => {
        const {teamId} = req.params;

        (async () => {
            try {
                const character = await CharacterRecord.findAllByTeamId(teamId);

                res.status(200).send(character);

            } catch (e) {
                throw new Error(e);
            }
        })();
    })

    //GET CHARACTER FROM CURRENT TEAM
    .get('/:teamId/characters/:characterId', (req, res) => {
        const {characterId} = req.params;

        (async () => {
            try {
                const character = await CharacterRecord.find(characterId);

                res.status(200).send(character);

            } catch (e) {
                throw new Error(e);
            }
        })();
    })

    //ADD CHARACTER TO TEAM
    .post('/:teamId/characters/newCharacter', (req, res) => {
        const character = req.body;

        (async () => {
            try {
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

            } catch (e) {
                throw new Error(e);
            }
        })();
    })

    //UPDATE CHARACTER
    .put('/:teamId/characters/:characterId', (req, res) => {
        const {characterId} = req.params;
        const newCharacter = req.body;

        (async () => {
            try {
                const characterToUpdate = await CharacterRecord.find(characterId);
                characterToUpdate.characterName = newCharacter.characterName;
                characterToUpdate.exp = newCharacter.exp;

                await characterToUpdate.update();

                res.status(200).send(characterToUpdate);

            } catch (e) {
                throw new Error(e);
            }
        })();
    })

    //DELETE CHARACTER
    .delete('/:teamId/characters/:characterId', (req, res) => {
        const {characterId} = req.params;

        (async () => {
            try {
                const characterToDelete = await CharacterRecord.find(characterId);

                await characterToDelete.delete();

                res.status(204);
            } catch (e) {
                throw new Error(e);
            }
        })();
    })

module.exports = {
    teamRouter,
}