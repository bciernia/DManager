import * as yup from "yup";

export const characterInfoValidationSchema = yup.object({
    characterName: yup.string().required('Character name is required'),
    playerName: yup.string().required('Player name is required'),
    characterClass: yup.string().required("Character class is required"),
    characterRace: yup.string().required('Character race is required'),
    characterAlignment: yup.string().required('Character alignment is required'),
});

export const characterStatsValidationSchema = yup.object({
    characterLevel: yup.number().min(1, "Level cannot be lower than 1").max(20, "Level cannot be higher than 20").required("Level is required"),
    characterStrength: yup.number().min(1, "Stat has to be higher than 1").max(30, "Stat has to be lower than 30").required("Strength is required"),
    characterDexterity: yup.number().min(1, "Stat has to be higher than 1").max(30, "Stat has to be lower than 30").required("Dexterity is required"),
    characterConstitution: yup.number().min(1, "Stat has to be higher than 1").max(30, "Stat has to be lower than 30").required("Constitution is required"),
    characterIntelligence: yup.number().min(1, "Stat has to be higher than 1").max(30, "Stat has to be lower than 30").required("Intelligence is required"),
    characterWisdom: yup.number().min(1, "Stat has to be higher than 1").max(30, "Stat has to be lower than 30").required("Wisdom is required"),
    characterCharisma: yup.number().min(1, "Stat has to be higher than 1").max(30, "Stat has to be lower than 30").required("Charisma is required"),
    exp: yup.number().min(0, "Character experience can not be lower than 0").max(400000, "Character experience has to be lower than 400000").required("Character experience is required"),
    characterSpeed: yup.number().min(1, "Speed has to be higher than 1ft").max(500, "Speed has to be lower than 500ft").required("Speed is required"),
    characterHP: yup.number().min(1, "Stat has to be higher than 1").max(1000, "Stat has to be lower than 1000").required("Charisma is required"),
    characterInitiative: yup.number().min(1, "Stat has to be higher than 1").max(30, "Stat has to be lower than 30").required("Charisma is required"),
});

export const characterSavingThrowsValidationSchema = yup.object({});

export const characterProficienciesValidationSchema = yup.object({})

export const characterSkillsValidationSchema = yup.object({});

export const mailValidationSchema = yup.object({});

export const monsterValidationSchema = yup.object({
    characterName: yup.string().required('Character name is required'),
    characterRace: yup.string().required('Character race is required'),
    characterAlignment: yup.string().required('Character alignment is required'),
});

export const monsterStatsValidationSchema = yup.object({
    characterStrength: yup.number().min(1, "Stat has to be higher than 1").max(30, "Stat has to be lower than 30").required("Strength is required"),
    characterDexterity: yup.number().min(1, "Stat has to be higher than 1").max(30, "Stat has to be lower than 30").required("Dexterity is required"),
    characterConstitution: yup.number().min(1, "Stat has to be higher than 1").max(30, "Stat has to be lower than 30").required("Constitution is required"),
    characterIntelligence: yup.number().min(1, "Stat has to be higher than 1").max(30, "Stat has to be lower than 30").required("Intelligence is required"),
    characterWisdom: yup.number().min(1, "Stat has to be higher than 1").max(30, "Stat has to be lower than 30").required("Wisdom is required"),
    characterCharisma: yup.number().min(1, "Stat has to be higher than 1").max(30, "Stat has to be lower than 30").required("Charisma is required"),
    exp: yup.number().min(0, "Character experience can not be lower than 0").max(400000, "Character experience has to be lower than 400000").required("Character experience is required"),
    characterSpeed: yup.number().min(1, "Speed has to be higher than 1ft").max(500, "Speed has to be lower than 500ft").required("Speed is required"),
    characterHP: yup.number().min(1, "Stat has to be higher than 1").max(1000, "Stat has to be lower than 1000").required("Charisma is required"),
    characterInitiative: yup.number().min(1, "Stat has to be higher than 1").max(30, "Stat has to be lower than 30").required("Charisma is required"),
});
