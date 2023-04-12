const express = require('express');
const {CharacterRecord} = require("../records/character.record");
const {client} = require("../utils/db");
const {ObjectId} = require("mongodb");

const characterRouter = express.Router();

characterRouter

    //GET ALL CHARACTERS
    .get('/all', (req, res) => {
        (async () => {
            try {
                const characters = await CharacterRecord.findAll();

                res.status(200).send(characters);

            } catch (e) {
                throw new Error(e);
            }
        })();
    })

    //GET CHARACTER BY ID
    .get('/:characterId', (req, res) => {
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

    //GET CHARACTER BY TEAM ID
    .get('/characterTeam/:teamId', (req, res) => {
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

    //ADD NEW CHARACTER
    .post('/', (req, res) => {
        const character = req.body;

        (async () => {
            try {
                const newCharacter = new CharacterRecord({
                    name: character.name,
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
    .put('/:characterId', (req, res) => {
        const {characterId} = req.params;
        const newCharacter = req.body;

        (async () => {
            try {
                const characterToUpdate = await CharacterRecord.find(characterId);
                characterToUpdate.name = newCharacter.name;
                characterToUpdate.exp = newCharacter.exp;

                await characterToUpdate.update();

                res.status(200).send(characterToUpdate);

            } catch (e) {
                throw new Error(e);
            }
        })();
    })

    //DELETE CHARACTER
    .delete('/:characterId', (req, res) => {
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
    characterRouter,
}