const express = require('express');
const {ObjectId} = require("mongodb");
const {NpcRecord} = require("../records/npc.record");
const {CampaignRecord} = require("../records/campaign.record");

const dmRouter = express.Router();

dmRouter

    //Get all npcs
    .get('/npc/all', (req, res) => {
        (async () => {
            try {
                const npcs = await NpcRecord.findAll();

                res.status(200).send(npcs);

            } catch (e) {
                throw new Error(e);
            }
        })();
    })

    //GET NPC'S BY TYPE
    .get('/npc/:npcType', (req,res) => {
        const {npcType} = req.params;

        (async () => {
            try{
                const npcs = await NpcRecord.findAllByNpcType(npcType);

                res.status(200).send(npcs);
            } catch (e){
                throw new Error(e);
            }
        })();
    })

    //Add new npc
    .post('/npc/addNpc', (req, res) => {
        const npc = req.body;

        (async () => {
            try {
                const newNpc = new NpcRecord({
                    npcName: npc.npcName.toString(),
                    npcRace: npc.npcRace.toString(),
                    npcType: npc.npcType.toString(),
                    npcAlignment: npc.npcAlignment.toString(),
                    npcDescription: npc.npcDescription.toString(),

                    npcStrength: Number(npc.npcStrength),
                    npcDexterity: Number(npc.npcDexterity),
                    npcConstitution: Number(npc.npcConstitution),
                    npcIntelligence: Number(npc.npcIntelligence),
                    npcWisdom: Number(npc.npcWisdom),
                    npcCharisma: Number(npc.npcCharisma),
                    npcPassiveWisdom: Number(npc.npcPassiveWisdom),
                    npcSpeed: Number(npc.npcSpeed),
                    npcHP: Number(npc.npcHP),
                    armorClass: Number(npc.armorClass),

                    npcSkills: npc.npcSkills.toString(),
                    npcExp: Number(npc.npcExp),
                })

                const newNpcId = await newNpc.insert();

                res.status(201).send(newNpcId);

            } catch (e) {
                throw new Error(e);
            }
        })();
    })

    //UPDATE NPC
    .put('/npc/:npcId', (req, res) => {
        const {npcId} = req.params;
        const updatedNpc = req.body;

        (async () => {
            try {
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

            } catch (e) {
                throw new Error(e);
            }
        })();
    })

    //DELETE NPC
    .delete('/npc/:npcId', (req, res) => {
        const {npcId} = req.params;

        (async () => {
            try {
                const npcToDelete = await NpcRecord.find(npcId);

                await npcToDelete.delete();

                res.status(204);
            }catch (e) {
                throw new Error(e);
            }
        })();
    })

    //ADD NEW CAMPAIGN
    .post('/campaign/newCampaign', (req, res) => {
        const campaign = req.body;

        (async () => {
            try {
                const newCampaign = new CampaignRecord({
                    campaignName: campaign.campaignName.toString(),
                    campaignSetting: campaign.campaignSetting.toString(),
                    campaignDescription: campaign.campaignDescription.toString(),
                });

                const newCampaignId = await newCampaign.insert();

                res.status(201).send(newCampaignId);

            } catch (e) {
                throw new Error(e);
            }

        })();
    })

    .get('/campaign/all', (req, res) => {
        (async () => {
            try {
                const campaigns = await CampaignRecord.findAll();

                res.status(200).send(campaigns);

            } catch (e) {
                throw new Error(e);
            }
        })();
    })

module.exports = {
    dmRouter,
}