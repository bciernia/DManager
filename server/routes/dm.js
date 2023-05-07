const express = require('express');
const {ObjectId} = require("mongodb");
const {NpcRecord} = require("../records/npc.record");
const {CampaignRecord} = require("../records/campaign.record");
const {ScenarioRecord} = require("../records/scenario.record");
const {CharacterRecord} = require("../records/character.record");
const {HandoutRecord} = require("../records/handout.record");
const {LocationRecord} = require("../records/location.record");

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
        scenarioToUpdate.scenarioNotes = updatedScenario.scenarioNotes.toString();
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

    //GET ALL LOCATIONS FROM CHOSEN SCENARIO
    .get('/scenario/:scenarioId/location/all', async (req, res) => {
        const {scenarioId} = req.params;
        const locationsFromChosenScenario = await LocationRecord.findAllByScenarioId(scenarioId);

        res.status(200).send(locationsFromChosenScenario);
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

    .delete('/scenario/:scenarioId/handout/:handoutId', async (req, res) => {
        const {handoutId} = req.params;

        const handoutToDelete = await HandoutRecord.find(handoutId);

        await handoutToDelete.delete();

        res.status(204).send();
    })

module.exports = {
    dmRouter,
}