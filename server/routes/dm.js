const express = require('express');
const {ObjectId} = require("mongodb");
const {NpcRecord} = require("../records/npc.record");
const {CampaignRecord} = require("../records/campaign.record");

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

    //ADD NEW CAMPAIGN
    .post('/campaign/newCampaign', async (req, res) => {
        const campaign = req.body;

        const newCampaign = new CampaignRecord({
            campaignName: campaign.campaignName.toString(),
            campaignSetting: campaign.campaignSetting.toString(),
            campaignDescription: campaign.campaignDescription.toString(),
        });

        const newCampaignId = await newCampaign.insert();

        res.status(201).send(newCampaignId);
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

module.exports = {
    dmRouter,
}