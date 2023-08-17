import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Home from "./components/Layout/Home/Home";
import StartNewSession from "./components/Sessions/StartNewSession/StartNewSession";
import SessionHistory from "./components/DMFacilities/SessionHistory/SessionHistory";
import AllTeams from "./components/DMFacilities/Teams/AllTeams/AllTeams";
import AddTeam from "./components/DMFacilities/Teams/AddTeam/AddTeam";
import TeamDetails from "./components/DMFacilities/Teams/TeamDetails";
import Summary from "./components/DMFacilities/Summary/Summary";
import CreateNewCampaign from "./components/DMFacilities/Campaign/NewCampaign/CreateNewCampaign";
import Session from "./components/Sessions/Session";
import CreateNewScenario from "./components/DMFacilities/Campaign/NewScenario/CreateNewScenario";
import ScenarioDetails from "./components/DMFacilities/Campaign/ScenarioDetails";
import CreateNewCharacter from "./components/DMFacilities/Character/CreateCharacter/CreateNewCharacter";
import CreateNewNpc from "./components/DMFacilities/Character/CreateCharacter/CreateNewNpc";
import CreateNewMonster from "./components/DMFacilities/Character/CreateCharacter/CreateNewMonster";
import CreateNewBeast from "./components/DMFacilities/Character/CreateCharacter/CreateNewBeast";
import CreateNewPlayerCharacter from "./components/DMFacilities/Character/CreateCharacter/CreateNewPlayerCharacter";
import CharacterDetails from "./components/DMFacilities/Character/CharacterDetails/CharacterDetails";
import ContactUs from "./components/Contact/ContactUs";
import MailSended from "./components/Contact/MailSended/MailSended";
import CampaignsSummary from "./components/DMFacilities/Campaign/CampaignsSummary/CampaignsSummary";
import CharactersSummary from "./components/DMFacilities/Character/CharactersSummary/CharactersSummary";
import CampaignDetails from "./components/DMFacilities/Campaign/CampaignDetails/CampaignDetails";
import EditScenario
    from "./components/DMFacilities/Campaign/CampaignDetails/ScenarioDetailsPartialView/EditScenario/EditScenario";
import AddLocation
    from "./components/DMFacilities/Campaign/CampaignDetails/ScenarioDetailsPartialView/EditScenario/AddLocation/AddLocation";
import AddHandout
    from "./components/DMFacilities/Campaign/CampaignDetails/ScenarioDetailsPartialView/EditScenario/AddHandout/AddHandout";
import EditLocation
    from "./components/DMFacilities/Campaign/CampaignDetails/ScenarioDetailsPartialView/EditScenario/EditLocation/EditLocation";
import AddCharacterToScenario
    from "./components/DMFacilities/Campaign/CampaignDetails/ScenarioDetailsPartialView/EditScenario/AddCharacterToScenario/AddCharacterToScenario";
import Spells from "./components/DMFacilities/Spells/Spells";
import CreateNewSimplifiedNpc from "./components/DMFacilities/Character/CreateCharacter/CreateNewSimplifiedNpc";
import Artifacts from "./components/DMFacilities/Artifacts/Artifacts";

const router = createBrowserRouter([
    {
        path: '/', element: <Home/>, errorElement: <ErrorPage/>, children: [
            {
                path: "newSession", element: <StartNewSession/>,
            },

            {
                path: "campaign", children: [
                    {
                        path: ":campaignId/scenario/:scenarioId/session", element: <Session/>
                    },
                ]
            },

            {
                path: "teams", children: [
                    {
                        path: '', element: <AllTeams/>,
                    },
                    {
                        path: "newTeam", element: <AddTeam/>,
                    },
                    {
                        path: ":teamId", element: <TeamDetails/>,
                    }
                ]
            },

            {
                path: "dm", children: [
                    {
                        path: '', element: <Summary/>
                    },

                    {
                        path: 'teams/:teamId', element: <TeamDetails/>,
                    },

                    {
                        path: 'teams/newTeam', element: <AddTeam/>,
                    },

                    {
                        path: 'campaign', element: <CampaignsSummary />,
                    },

                    {
                        path: 'campaign/newCampaign', element: <CreateNewCampaign/>,
                    },

                    {
                        path: 'campaign/:campaignId', element: <CampaignDetails/>,
                    },

                    {
                        path: 'campaign/:campaignId/scenario/newScenario', element: <CreateNewScenario/>,
                    },

                    {
                        path: 'scenario/:scenarioId', element: <ScenarioDetails/>,
                    },

                    {
                        path: 'campaign/:campaignId/scenario/:scenarioId/edit', element: <EditScenario/>,
                    },

                    {
                        path: 'campaign/:campaignId/scenario/:scenarioId/edit/newLocation', element: <AddLocation/>,
                    },

                    {
                        path: 'campaign/:campaignId/scenario/:scenarioId/edit/location/:locationId', element: <EditLocation/>,
                    },

                    {
                        path:   'campaign/:campaignId/scenario/:scenarioId/edit/newCharacter', element: <AddCharacterToScenario />,
                    },

                    {
                      path:   'campaign/:campaignId/scenario/:scenarioId/edit/newHandout', element: <AddHandout />,
                    },

                    {
                        path: "campaign/:campaignId/sessions/all", element: <SessionHistory/>,
                    },

                    {
                        path: "characters", element: <CharactersSummary/>,
                    },

                    {
                        path: "characters/newCharacter", element: <CreateNewCharacter/>,
                    },

                    {
                        path: "characters/newCharacter/playerCharacter", element: <CreateNewPlayerCharacter/>,
                    },

                    {
                        path: "characters/newCharacter/npc", element: <CreateNewNpc/>,
                    },

                    {
                        path: "characters/newCharacter/simpleNpc", element: <CreateNewSimplifiedNpc/>,
                    },

                    {
                        path: "characters/newCharacter/beast", element: <CreateNewBeast/>,
                    },

                    {
                        path: "characters/newCharacter/monster", element: <CreateNewMonster/>,
                    },

                    {
                        path: "characters/:characterId", element: <CharacterDetails/>,
                    },

                    {
                        path: "spells", element: <Spells />
                    },

                    {
                        path: "artifacts", element: <Artifacts />
                    },

                ]
            },

            {
                path: "contact", element: <ContactUs/>,
            },

            {
                path: "contact/success", element: <MailSended/>,
            },

            {
                path: "administration",
            }

        ]
    }
])

function App() {
    return <RouterProvider router={router}/>;
}

export default App;
