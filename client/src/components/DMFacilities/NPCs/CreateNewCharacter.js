// import {useState} from "react";
// import {CharacterInitialValues} from "../../../utils/dndUtils/CharacterInitialValues";
// import {
//     Box, Breadcrumbs,
//     Button, Divider,
//     FormControl,
//     FormGroup,
//     FormLabel, Grid,
//     InputLabel,
//     MenuItem,
//     Select, TextareaAutosize,
//     TextField,
//     Typography
// } from "@mui/material";
// import {CharacterClasses} from "../../../utils/dndUtils/CharacterClasses";
// import {CharacterTypes} from "../../../utils/dndUtils/CharacterTypes";
// import {ConditionTypes} from "../../../utils/dndUtils/ConditionTypes";
// import {DamageTypes} from "../../../utils/dndUtils/DamageTypes";
// import FormControlContext from "@mui/material/FormControl/FormControlContext";
// import {Form} from "react-router-dom";
//
// const CreateNewCharacter = () => {
//     const characterInitialValues = CharacterInitialValues;
//     const characterClassesArray = Object.entries(CharacterClasses);
//     const characterTypesArray = Object.entries(CharacterTypes);
//     const conditionTypesArray = Object.entries(ConditionTypes);
//     const damageTypesArray = Object.entries(DamageTypes);
//
//     const [characterValues, setCharacterValues] = useState(characterInitialValues);
//
//     const submitForm = event => {
//         event.preventDefault();
//
//         console.log(characterValues);
//     }
//     const [characterValues, setCharacterValues] = useState(characterInitialValues);
//
//     const handleChange = (event, propToChange) => {
//         setCharacterValues({
//             ...characterValues,
//             [propToChange]: event.target.value,
//         });
//     }
//
//     return (
//         <Box>
//             <Typography variant="h3">Create new character</Typography>
//             <Divider sx={{width: "100%", margin: ".5rem 0"}}/>
//             <Form>
//                 <Grid container spacing={1}>
//                     {/*CHARACTER INFO GRID*/}
//                     <Grid item md={4}>
//                         <FormGroup sx={{m: 1, minWidth: 100, width: "27.5rem"}}>
//                             <Typography variant="h4">Character info</Typography>
//                             <Divider sx={{width: "100%", margin: ".5rem 0"}}/>
//
//                             <FormControl variant="filled">
//                                 <InputLabel id="character-type-label">Type</InputLabel>
//                                 <Select
//                                     labelId="character-type-label"
//                                     id="characterType"
//                                     value={characterValues.characterType}
//                                     onChange={(event) => handleChange(event, "characterType")}
//                                 >
//                                     <MenuItem value="">
//                                         <em>None</em>
//                                     </MenuItem>
//                                     {characterTypesArray.map(type => <MenuItem key={type[0]}
//                                                                                value={type[0]}>{type[1]}</MenuItem>)}
//                                 </Select>
//                             </FormControl>
//
//                             <TextField
//                                 required
//                                 autoFocus
//                                 margin="dense"
//                                 id="characterName"
//                                 label="Name"
//                                 type="text"
//                                 fullWidth
//                                 variant="filled"
//                                 value={characterValues.characterName}
//                                 onChange={(event) => handleChange(event, "characterName")}
//                             />
//
//                             <FormControl variant="filled">
//                                 <InputLabel id="character-class-label">Class</InputLabel>
//                                 <Select
//                                     labelId="character-class-label"
//                                     id="characterClass"
//                                     value={characterValues.characterClass}
//                                     onChange={(event) => handleChange(event, "characterClass")}
//                                 >
//                                     <MenuItem value="">
//                                         <em>None</em>
//                                     </MenuItem>
//                                     {characterClassesArray.map(type => <MenuItem key={type[0]}
//                                                                                  value={type[0]}>{type[1]}</MenuItem>)}
//                                 </Select>
//                             </FormControl>
//
//                             <TextField
//                                 required
//                                 autoFocus
//                                 margin="dense"
//                                 id="playerName"
//                                 label="Player name"
//                                 type="text"
//                                 fullWidth
//                                 variant="filled"
//                                 onChange={(event) => handleChange(event, "playerName")}
//                             />
//                             <TextField
//                                 margin="dense"
//                                 id="characterBackstory"
//                                 label="Character backstory"
//                                 multiline
//                                 maxRows={15}
//                                 variant="filled"
//                             >
//
//                             </TextField>
//
//                         </FormGroup>
//                     </Grid>
//                     <Grid item md={4}>
//                         <FormGroup sx={{m: 1, minWidth: 100, width: "27.5rem"}}>
//                             <Typography variant="h4">Character info</Typography>
//                             <Divider sx={{width: "100%", margin: ".5rem 0"}}/>
//
//                         </FormGroup>
//                     </Grid>
//                     <Grid item md={4}>
//                         <FormGroup sx={{m: 1, minWidth: 100, width: "27.5rem"}}>
//                             <Typography variant="h4">Character info</Typography>
//                             <Divider sx={{width: "100%", margin: ".5rem 0"}}/>
//
//                         </FormGroup>
//                     </Grid>
//                 </Grid>
//                 <Button sx={{marginTop: "1rem"}} variant="outlined" color="success"
//                         onClick={(event) => submitForm(event)}>Submit character</Button>
//             </Form>
//         </Box>
//     )
// }
//
// export default CreateNewCharacter;