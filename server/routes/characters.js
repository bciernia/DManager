const express = require('express');
const {CharacterRecord} = require("../records/character.record");
const {client, characters} = require("../utils/db");
const {ObjectId} = require("mongodb");

const characterRouter = express.Router();

characterRouter

    //GET ALL CHARACTERS
    .get('/all', async (req, res) => {
        const characters = await CharacterRecord.findAll();

        res.status(200).send(characters);
    })

    //GET CHARACTER BY ID
    .get('/:characterId', async (req, res) => {
        const {characterId} = req.params;

        const character = await CharacterRecord.find(characterId);

        res.status(200).send(character);
    })

    //ADD CHARACTER
    .post('/newCharacter', async (req, res) => {
        const character = req.body;

        const newCharacter = new CharacterRecord({
            ...character
        })

        const newCharacterId = await newCharacter.insert();

        res.status(201).send(newCharacterId);
    })

    //DELETE CHARACTER
    .delete('/:characterId', async (req, res) => {
        const {characterId} = req.params;

        const characterToDelete = await CharacterRecord.find(characterId);

        await characterToDelete.delete();

        res.status(204).send();
    })


module.exports = {
    characterRouter,
}