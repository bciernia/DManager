const express = require('express');
const {CharacterRecord} = require("../records/character.record");
const {client, characters} = require("../utils/db");
const {ObjectId} = require("mongodb");
const {MonsterRecord} = require("../records/monster.record");
const {NpcRecord} = require("../records/npc.record");

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

    //GET ALL PLAYER CHARACTERS
    .get('/all/playerCharacters', async (req, res) => {
        const characters = await CharacterRecord.findAllPlayerCharacters();

        res.status(200).send(characters);
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

    //ADD SIMPLE NPC
    .post('/newSimplyNPC', async (req, res) => {
        const character = req.body;

        const newCharacter = new CharacterRecord({
            ...character
        })

        const newCharacterId = await newCharacter.insert();

        res.status(201).send(newCharacterId);
    })

    //ADD MONSTER
    .post('/newMonster', async (req, res) => {
        const monster = req.body;

        const newMonster = new MonsterRecord({
            ...monster
        })

        const newMonsterId = await newMonster.insert();

        res.status(201).send(newMonsterId);
    })

    //ADD NPC
    .post('/newNpc', async (req, res) => {
        const npc = req.body;

        const newNpc = new NpcRecord({
            ...npc
        })

        const newNpcId = await newNpc.insert();

        res.status(201).send(newNpcId);
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