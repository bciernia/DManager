import * as yup from "yup";
import {CharacterClasses} from "../dndUtils/CharacterClasses";
import {CharacterTypes} from "../dndUtils/CharacterTypes";
import {ConditionTypes} from "../dndUtils/ConditionTypes";
import {DamageTypes} from "../dndUtils/DamageTypes";

const characterClassesArray = Object.entries(CharacterClasses).map(item => item[0]);
const characterTypesArray = Object.entries(CharacterTypes).map(item => item[0]);
const conditionTypesArray = Object.entries(ConditionTypes).map(item => item[0]);
const damageTypesArray = Object.entries(DamageTypes).map(item => item[0]);


export const characterInfoValidationSchema = yup.object({
    characterName: yup.string().required('Character name is required'),
    playerName: yup.string().required('Player name is required'),
    characterClass: yup.string().required("Character class is required").oneOf(characterClassesArray),
    // characterRace: yup.string().required('Character race is required'),
    // characterBackground: yup.string().required('Character background is required'),
    characterBackstory: yup.string().max(1000, "Backstory cannot be longer than 1000 characters"),
    // characterAllies: yup.string().length(250,"Character allies cannot be longer than 250 characters"),
    // characterIdeals: yup.string().length(250,"Character ideals cannot be longer than 250 characters"),
    // characterPersonalityTraits: yup.string().length(250,"Character personality traits cannot be longer than 250 characters"),
    // characterBonds: yup.string().length(250,"Character bonds cannot be longer than 250 characters"),
    // characterFlaws: yup.string().length(250,"Character flaws cannot be longer than 250 characters"),
    // characterTreasure: yup.string().length(250,"Character treasures cannot be longer than 250 characters"),
    // characterLevel: yup.number().min(1, "Level has to be higher than 1").max(20, "Level can not be higher than 20"),
    // exp: yup.number().min(0, "Character experience has to be higher than 0"),
});

export const characterStatsValidationSchema = yup.object({
    characterStrength: yup.number().min(1, "Stat has to be higher than 1").max(30, "Stat has to be lower than 30").required("Strength is required"),
    characterDexterity: yup.number().min(1, "Stat has to be higher than 1").max(30, "Stat has to be lower than 30").required("Dexterity is required"),
    characterConstitution: yup.number().min(1, "Stat has to be higher than 1").max(30, "Stat has to be lower than 30").required("Constitution is required"),
    characterIntelligence: yup.number().min(1, "Stat has to be higher than 1").max(30, "Stat has to be lower than 30").required("Intelligence is required"),
    characterWisdom: yup.number().min(1, "Stat has to be higher than 1").max(30, "Stat has to be lower than 30").required("Wisdom is required"),
    characterCharisma: yup.number().min(1, "Stat has to be higher than 1").max(30, "Stat has to be lower than 30").required("Charisma is required"),
});