const express = require('express');
const {CharacterRecord} = require("../records/character.record");
const {client, characters} = require("../utils/db");
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

    //ADD CHARACTER
    .post('/newCharacter', (req, res) => {
        const character = req.body;

        (async () => {
            try {
                console.log(character);
                const newCharacter = new CharacterRecord({
                    ...character
                })

                const newCharacterId = await newCharacter.insert();

                res.status(201).send(newCharacterId);

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

                setTimeout(() => {
                    res.status(204).send();
                }, 5000);

            } catch (e) {
                throw new Error(e);
            }
        })();
    })


module.exports = {
    characterRouter,
}