const express = require('express');
const {ObjectId} = require("mongodb");
const {NpcRecord} = require("../records/npc.record");
const {CampaignRecord} = require("../records/campaign.record");
const {ScenarioRecord} = require("../records/scenario.record");
const {CharacterRecord} = require("../records/character.record");

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
    .delete('/campaign/:campaignId', async(req, res) => {
        const {campaignId} = req.params;

        const campaignToDelete = await CampaignRecord.find(campaignId);

        await campaignToDelete.delete();

        res.status(204).send();
    })


    //GET ALL SCENARIOS
    .get('/scenario/all', async(req, res) => {
        const scenarios = await ScenarioRecord.findAll();

        res.status(200).send(scenarios);
    })

    //GET CHOSEN SCENARIO
    .get('/scenario/:scenarioId', async(req, res) => {
        const {scenarioId} = req.params;

        const scenario = await ScenarioRecord.find(scenarioId);

        res.status(200).send(scenario);
    })

    //ADD NEW SCENARIO
    .post('/scenario/newScenario', async (req, res) => {
        const scenario = req.body;

        const newScenario = new CampaignRecord({
            ...scenario
        });

        const newScenarioId = await newScenario.insert();

        res.status(201).send(newScenarioId);
    })

    //DELETE SCENARIO
    .delete('/scenario/:scenarioId', async(req, res) => {
        const {scenarioId} = req.params;

        const scenarioToDelete = await ScenarioRecord.find(scenarioId);

        await scenarioToDelete.delete();

        res.status(204).send();
    })

module.exports = {
    dmRouter,
}