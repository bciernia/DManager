//  languageName: [languageName, alphabet, typicalSpeakers, ProficiencyLevel]

import {ProficiencyLevel} from "./ProficiencyLevel";

export const LanguageProficiencies = {
    common: ["Common", "Common", "Humans", ProficiencyLevel],
    dwarvish: ["Dwarvish", "Dwarvish", "Dwarves", ProficiencyLevel],
    elvish: ["Elvish", "Elvish", "Elves", ProficiencyLevel],
    giant: ["Giant", "Dwarvish", "Ogres, Giants", ProficiencyLevel],
    gnomish: ["Gnomish", "Dwarvish", "Gnomes", ProficiencyLevel],
    goblin: ["Goblin", "Dwarvish", "Goblinoids", ProficiencyLevel],
    halgling: ["Halfling", "Common", "Halflings", ProficiencyLevel],
    orc: ["Orc", "Dwarvish", "Orcs", ProficiencyLevel],
    abyssal: ["Abyssal", "Infernal", "Demons", ProficiencyLevel],
    celestial: ["Celestial", "Celestial", "Celestials", ProficiencyLevel],
    draconic: ["Draconic", "Draconic", "Dragons, dragonborn", ProficiencyLevel],
    deepSpeech: ["Deep Speech", "-", "Aboleths, cloakers", ProficiencyLevel],
    infernal: ["Infernal", "Infernal", "Devils", ProficiencyLevel],
    primordial: ["Primordial", "Dwarvish", "Elementals", ProficiencyLevel],
    sylvan: ["Sylvan", "Elvish", "Fey creatures", ProficiencyLevel],
    undercommon: ["Undercommon", "Elvish", "Underworld traders", ProficiencyLevel],
}