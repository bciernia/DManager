const express = require('express');
const {CharacterRecord} = require("../records/character.record");
const {client} = require("../utils/db");

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
            } finally {
                await client.close();
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
            } finally {
                await client.close();
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
                    exp: 0,
                })

                const newCharacterId = await newCharacter.insert();

                res.status(201).send(newCharacterId);

            } catch (e) {
                throw new Error(e);
            } finally {
                await client.close();
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

            } finally {
                await client.close();
            }
        })();
    })

    .delete('/:characterId', (req, res) => {
        const {characterId} = req.params;

        (async () => {
            try {
                const characterToDelete = await CharacterRecord.find(characterId);

                await characterToDelete.delete();

                res.status(204);
            } finally {
                await client.close()
            }
        })();
    })

module.exports = {
    characterRouter,
}