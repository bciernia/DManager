import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Home from "./components/Layout/Home/Home";
import StartNewSession from "./components/Sessions/StartNewSession/StartNewSession";
import SessionHistory from "./components/DMFacilities/SessionHistory/SessionHistory";
import AllTeams from "./components/Teams/Team/AllTeams/AllTeams";
import AddTeam from "./components/Teams/Team/AddTeam/AddTeam";
import TeamDetails from "./components/Teams/Team/TeamDetails";
import Summary from "./components/DMFacilities/Summary/Summary";
import CreateNewCampaign from "./components/DMFacilities/Scenarios/NewCampaign/CreateNewCampaign";
import Session from "./components/Sessions/Session";
import CreateNewScenario from "./components/DMFacilities/Scenarios/CreateNewScenario";
import CharacterDetails from "./components/DMFacilities/NPCs/CharacterDetails";
import ScenarioDetails from "./components/DMFacilities/Scenarios/ScenarioDetails";
import CampaignDetails from "./components/DMFacilities/Scenarios/CampaignDetails";
import CreateNewCharacter from "./components/DMFacilities/Character/CreateNewCharacter";
import CreateNewNpc from "./components/DMFacilities/Character/CreateNewNpc";
import CreateNewMonster from "./components/DMFacilities/Character/CreateNewMonster";
import CreateNewBeast from "./components/DMFacilities/Character/CreateNewBeast";
import CreateNewPlayerCharacter from "./components/DMFacilities/Character/CreateNewPlayerCharacter";

const router = createBrowserRouter([
    {
        path: '/', element: <Home/>, errorElement: <ErrorPage/>, children: [
            {
                path: "newSession", element: <StartNewSession/>,
            },

            {
                path: "campaign", children: [
                    {
                        path: ":campaignId/session/:sessionId", element: <Session/>
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
                        path: 'campaign/newCampaign', element: <CreateNewCampaign/>
                    },

                    {
                        path: 'campaign/:campaignId', element: <CampaignDetails/>
                    },

                    {
                        path: 'scenario/newScenario', element: <CreateNewScenario/>
                    },

                    {
                        path: 'scenario/:scenarioId', element: <ScenarioDetails/>
                    },

                    {
                        path: "campaign/:campaignId/sessions/all", element: <SessionHistory/>
                    },

                    {
                        path: "character/newCharacter", element: <CreateNewCharacter/>,
                    },

                    {
                        path: "character/newCharacter/playerCharacter", element: <CreateNewPlayerCharacter/>,
                    },

                    {
                        path: "character/newCharacter/npc", element: <CreateNewNpc/>,
                    },

                    {
                        path: "character/newCharacter/beast", element: <CreateNewBeast/>,
                    },

                    {
                        path: "character/newCharacter/monster", element: <CreateNewMonster/>,
                    },

                    {
                        path: "npc/:npcId", element: <CharacterDetails/>
                    }
                ]
            }
        ]
    }
])

function App() {
    return <RouterProvider router={router}/>;
}

export default App;
