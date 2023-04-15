import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Home from "./components/Layout/Home/Home";
import StartNewSession from "./components/Sessions/StartNewSession/StartNewSession";
import SessionHistory from "./components/DMFacilities/SessionHistory/SessionHistory";
import AllTeams from "./components/Teams/Team/AllTeams/AllTeams";
import AddTeam from "./components/Teams/Team/AddTeam/AddTeam";
import TeamDetails from "./components/Teams/Team/TeamDetails";
import Summary from "./components/DMFacilities/Summary/Summary";
import CreateNewCampaign from "./components/DMFacilities/Scenarios/CreateNewCampaign";
import Session from "./components/Sessions/Session";
import CreateNewScenario from "./components/DMFacilities/Scenarios/CreateNewScenario";

const router = createBrowserRouter([
    {
        path: '/', element: <Home/>, errorElement: <ErrorPage/>, children: [
            {
                path: "newSession", element: <StartNewSession/>,
            },

            {
                path: "campaign", children: [
                    {
                        path: ":campaignId/session/:sessionId", element: <Session />
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
                        path: ":teamId", element: <TeamDetails />,
                    }
                ]
            },

            {
                path: "dm", children: [
                    {
                        path: '', element: <Summary />
                    },

                    {
                        path: 'newCampaign', element: <CreateNewCampaign />
                    },

                    {
                        path: 'newScenario', element: <CreateNewScenario />
                    },

                    {
                        path: "campaign/:campaignId/sessions/all", element: <SessionHistory/>
                    },
                ]
            }
        ]
    }
])

function App() {
    return <RouterProvider router={router}/>;
}

export default App;
