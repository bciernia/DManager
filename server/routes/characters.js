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

module.exports = {
    characterRouter,
}