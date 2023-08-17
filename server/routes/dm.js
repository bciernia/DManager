const express = require('express');
const {ObjectId} = require("mongodb");
const {NpcRecord} = require("../records/npc.record");
const {CampaignRecord} = require("../records/campaign.record");
const {ScenarioRecord} = require("../records/scenario.record");
const {CharacterRecord} = require("../records/character.record");
const {HandoutRecord} = require("../records/handout.record");
const {LocationRecord} = require("../records/location.record");
const {NoteRecord} = require("../records/note.record");
const {SpellRecord} = require("../records/spell.record");
const {ArtifactRecord} = require("../records/artifact.record");

const dmRouter = express.Router();

dmRouter

    //UPDATE NPC
    .put('/npc/:npcId', async (req, res) => {
        const {npcId} = req.params;
        const updatedNpc = req.body;

        const npcToUpdate = await NpcRecord.find(npcId);
        npcToUpdate.npcName = updatedNpc.npcName.toString();
        npcToUpdate.npcRace = updatedNpc.npcRace.toString();
        npcToUpdate.npcType = updatedNpc.npcType.toString();
        npcToUpdate.npcAlignment = updatedNpc.npcAlignment.toString();
        npcToUpdate.npcDescription = updatedNpc.npcDescription.toString();
        npcToUpdate.npcStrength = Number(updatedNpc.npcStrength);
        npcToUpdate.npcDexterity = Number(updatedNpc.npcDexterity);
        npcToUpdate.npcConstitution = Number(updatedNpc.npcConstitution);
        npcToUpdate.npcIntelligence = Number(updatedNpc.npcIntelligence);
        npcToUpdate.npcWisdom = Number(updatedNpc.npcWisdom);
        npcToUpdate.npcCharisma = Number(updatedNpc.npcCharisma);
        npcToUpdate.npcSpeed = Number(updatedNpc.npcSpeed);
        npcToUpdate.npcPassiveWisdom = Number(updatedNpc.npcPassiveWisdom);
        npcToUpdate.npcHP = Number(updatedNpc.npcHP);
        npcToUpdate.armorClass = Number(updatedNpc.armorClass);
        npcToUpdate.npcSkills = updatedNpc.npcSkills.toString();
        npcToUpdate.npcExp = Number(updatedNpc.npcExp);

        await npcToUpdate.update();

        res.status(200).send(npcToUpdate);

    })

    //GET ALL CAMPAIGNS
    .get('/campaign/all', async (req, res) => {
        const campaigns = await CampaignRecord.findAll();

        res.status(200).send(campaigns);
    })

    //GET CHOSEN CAMPAIGN
    .get(`/campaign/:campaignId`, async (req, res) => {
        const {campaignId} = req.params;

        const campaign = await CampaignRecord.find(campaignId);

        res.status(200).send(campaign);
    })

    //ADD NEW CAMPAIGN
    .post('/campaign/newCampaign', async (req, res) => {
        const campaign = req.body;

        const newCampaign = new CampaignRecord({
            ...campaign,
        });

        const newCampaignId = await newCampaign.insert();

        res.status(201).send(newCampaignId);
    })

    //DELETE CAMPAIGN
    .delete('/campaign/:campaignId', async (req, res) => {
        const {campaignId} = req.params;

        const campaignToDelete = await CampaignRecord.find(campaignId);

        await campaignToDelete.delete();

        res.status(204).send();
    })

    //GET ALL SCENARIOS
    .get('/scenario/all', async (req, res) => {
        const scenarios = await ScenarioRecord.findAll();

        res.status(200).send(scenarios);
    })

    //GET CHOSEN SCENARIO
    .get('/scenario/:scenarioId', async (req, res) => {
        const {scenarioId} = req.params;

        const scenario = await ScenarioRecord.find(scenarioId);

        res.status(200).send(scenario);
    })

    //GET SCENARIOS FROM CHOSEN CAMPAIGN
    .get('/campaign/:campaignId/scenario/all', async (req, res) => {
        const {campaignId} = req.params;

        const scenariosFromChosenCampaign = await ScenarioRecord.findAllByCampaignId(campaignId);

        res.status(200).send(scenariosFromChosenCampaign);
    })

    //ADD NEW SCENARIO
    .post('/:campaignId/scenario/newScenario', async (req, res) => {
        const {campaignId} = req.params;
        const scenario = req.body;

        const newScenario = new ScenarioRecord({
            ...scenario
        });
        const newScenarioId = await newScenario.insert();

        const campaignToUpdate = await CampaignRecord.find(campaignId);

        campaignToUpdate.campaignScenarios.push(newScenarioId);

        await campaignToUpdate.update();

        res.status(201).send(newScenarioId);
    })

    //UPDATE SCENARIO
    .put('/scenario/:scenarioId', async (req, res) => {
        const {scenarioId} = req.params;
        const updatedScenario = req.body;

        const scenarioToUpdate = await ScenarioRecord.find(scenarioId);
        scenarioToUpdate.scenarioName = updatedScenario.scenarioName.toString();
        scenarioToUpdate.scenarioDescription = updatedScenario.scenarioDescription.toString();
        scenarioToUpdate.scenarioNotes = updatedScenario.scenarioNotes;
        scenarioToUpdate.scenarioSchedule = updatedScenario.scenarioSchedule;
        scenarioToUpdate.scenarioCharacters = updatedScenario.scenarioCharacters;
        scenarioToUpdate.cenarioLocations = updatedScenario.scenarioLocations;
        scenarioToUpdate.scenarioHandouts = updatedScenario.scenarioHandouts;

        await scenarioToUpdate.update();

        res.status(200).send(scenarioToUpdate);
    })

    //DELETE SCENARIO
    .delete('/scenario/:scenarioId', async (req, res) => {
        const {scenarioId} = req.params;

        const scenarioToDelete = await ScenarioRecord.find(scenarioId);

        await scenarioToDelete.delete();

        res.status(204).send();
    })

    //ADD NEW LOCATION TO SCENARIO
    .post('/scenario/:scenarioId/newLocation', async (req, res) => {
        const {scenarioId} = req.params;

        const location = req.body;

        location.locationRooms.forEach(room => room.roomId = new ObjectId())

        const newLocation = new LocationRecord({
            ...location
        })

        newLocation.locationRooms.forEach(room => {
            room.roomId = new ObjectId();
        });

        const newLocationId = await newLocation.insert();

        const scenarioToUpdate = await ScenarioRecord.find(scenarioId);

        scenarioToUpdate.scenarioLocations.push(newLocationId);

        await scenarioToUpdate.update();

        res.status(201).send(newLocationId);
    })

    //UPDATE LOCATION
    .put('/location/:locationId', async (req, res) => {
        const {locationId} = req.params;
        const updatedLocation = req.body;

        const locationToUpdate = await LocationRecord.find(locationId);
        locationToUpdate.locationName = updatedLocation.locationName;
        locationToUpdate.locationDescription = updatedLocation.locationDescription;
        locationToUpdate.locationMap = updatedLocation.locationMap;
        locationToUpdate.locationRooms = updatedLocation.locationRooms;

        await locationToUpdate.update();

        res.status(200).send(locationToUpdate);
    })

    //DELETE LOCATION
    .delete('/scenario/:scenarioId/:locationId', async (req, res) => {
        const {scenarioId, locationId} = req.params;

        const locationToDelete = await LocationRecord.find(locationId);
        const scenarioWhereIsDeletedLocation = await ScenarioRecord.find(scenarioId);

        scenarioWhereIsDeletedLocation.scenarioLocations = scenarioWhereIsDeletedLocation.scenarioLocations
            .filter(location => location.toString() !== locationId)

        await scenarioWhereIsDeletedLocation.update();
        await locationToDelete.delete();

        res.status(204).send();
    })

    //GET ALL LOCATIONS FROM CHOSEN SCENARIO
    .get('/scenario/:scenarioId/location/all', async (req, res) => {
        const {scenarioId} = req.params;
        const locationsFromChosenScenario = await LocationRecord.findAllByScenarioId(scenarioId);

        res.status(200).send(locationsFromChosenScenario);
    })

    //GET LOCATION BY ID
    .get('/scenario/:scenarioId/location/:locationId', async (req, res) => {
        const {locationId} = req.params;
        const location = await LocationRecord.find(locationId);

        res.status(200).send(location);
    })

    //ADD NEW HANDOUT TO SCENARIO
    .post('/scenario/:scenarioId/newHandout', async (req, res) => {
        const {scenarioId} = req.params;

        const handout = req.body;

        const newHandout = new HandoutRecord({
            ...handout
        });

        const newHandoutId = await newHandout.insert();

        const scenarioToUpdate = await ScenarioRecord.find(scenarioId);

        scenarioToUpdate.scenarioHandouts.push(newHandoutId);

        await scenarioToUpdate.update();

        res.status(201).send(newHandoutId);
    })

    //GET CHOSEN HANDOUT
    .get('/handout/:handoutId', async (req, res) => {
        const {handoutId} = req.params;

        const handout = await HandoutRecord.find(handoutId);

        res.status(200).send(handout);
    })

    //GET HANDOUTS FROM CHOSEN SCENARIO
    .get('/scenario/:scenarioId/handout/all', async (req, res) => {
        const {scenarioId} = req.params;

        const handoutsFromChosenScenario = await HandoutRecord.findAllByScenarioId(scenarioId);

        res.status(200).send(handoutsFromChosenScenario);
    })

    //DELETE HANDOUT BY HANDOUT ID
    .delete('/scenario/:scenarioId/handout/:handoutId', async (req, res) => {
        const {handoutId} = req.params;

        const handoutToDelete = await HandoutRecord.find(handoutId);

        await handoutToDelete.delete();

        res.status(204).send();
    })

    //ADD NEW NOTE TO SCENARIO
    .post('/scenario/:scenarioId/newNote', async (req, res) => {
        const {scenarioId} = req.params;

        const note = req.body;

        const newNote = new NoteRecord({
            ...note
        });

        const newNoteId = await newNote.insert();

        const scenarioToUpdate = await ScenarioRecord.find(scenarioId);

        scenarioToUpdate.scenarioNotes.push(newNoteId);

        await scenarioToUpdate.update();

        res.status(201).send(newNoteId);
    })

    //UPDATE NOTE AND RETURN ALL FOR SCENARIO
    .put('/scenario/:scenarioId/notes/:noteId', async (req, res) => {
        const {scenarioId, noteId} = req.params;
        const updatedNote = req.body;

        const noteToUpdate = await NoteRecord.find(noteId);
        noteToUpdate.note = updatedNote.note;

        await noteToUpdate.update();

        const notesFromChosenScenario = await NoteRecord.findAllByScenarioId(scenarioId);

        res.status(200).send(notesFromChosenScenario);
    })

    //GET CHOSEN NOTE
    .get('/handout/:noteId', async (req, res) => {
        const {noteId} = req.params;

        const note = await NoteRecord.find(noteId);

        res.status(200).send(note);
    })

    //GET NOTES FROM CHOSEN SCENARIO
    .get('/scenario/:scenarioId/notes/all', async (req, res) => {
        const {scenarioId} = req.params;

        const notesFromChosenScenario = await NoteRecord.findAllByScenarioId(scenarioId);

        res.status(200).send(notesFromChosenScenario);
    })

    //DELETE NOTE BY NOTE ID
    .delete('/scenario/:scenarioId/notes/:noteId', async (req, res) => {
        const {scenarioId ,noteId} = req.params;

        const noteToDelete = await NoteRecord.find(noteId);

        await noteToDelete.delete();

        const scenario = await ScenarioRecord.find(scenarioId);
        const newScenarioNotes = scenario.scenarioNotes.filter(note => note.toString() !== noteId);
        scenario.scenarioNotes = newScenarioNotes;

        await scenario.update();

        res.status(204).send();
    })

    //GET CHARACTERS FROM THIS SCENARIO
    .get('/scenario/:scenarioId/characters/all', async (req, res) => {
        const {scenarioId} = req.params;

        const scenario = await ScenarioRecord.find(scenarioId);

        const scenarioCharacterIdsArray = scenario.scenarioCharacters.map(character => character._id);

        const characters = await CharacterRecord.findAllByIds(scenarioCharacterIdsArray);

        res.status(200).send(characters);
    })

    //UPDATE SCENARIO CHARACTERS
    .put('/scenario/:scenarioId/updateCharacters', async (req, res) => {
        const {scenarioId} = req.params;

        const updatedCharacters = req.body;

        const scenarioToUpdate = await ScenarioRecord.find(scenarioId);

        scenarioToUpdate.scenarioCharacters = updatedCharacters;

        await scenarioToUpdate.update();

        res.status(200).send(scenarioToUpdate);
    })

    .get('/spells/all', async (req, res) => {
        const spells = await SpellRecord.findAll();

        res.status(200).send(spells);
    })

    //ADD NEW SPELL
    .post('/spells/newSpell', async (req, res) => {
        const spell = req.body;

        const newSpell = new SpellRecord({
            ...spell
        });

        const newSpellId = await newSpell.insert();

        res.status(201).send(newSpellId);
    })

    //ADD NEW ARTIFACT
    .post('/artifacts/newArtifact', async (req, res) => {
        const artifact = req.body;

        const newArtifact = new ArtifactRecord({
            ...artifact
        });

        const newArtifactId = await newArtifact.insert();

        res.status(201).send(newArtifactId);
    })

module.exports = {
    dmRouter,
}