import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Home from "./components/Layout/Home/Home";
import StartNewSession from "./components/Sessions/StartNewSession/StartNewSession";
import SessionHistory from "./components/Sessions/SessionHistory/SessionHistory";
import AllTeams from "./components/Teams/Team/AllTeams/AllTeams";
import AddTeam from "./components/Teams/Team/AddTeam/AddTeam";
import TeamDetails from "./components/Teams/Team/TeamDetails";
import Summary from "./components/DMFacilities/Summary/Summary";

const router = createBrowserRouter([
    {
        path: '/', element: <Home/>, errorElement: <ErrorPage/>, children: [
            {
                path: "session", children: [
                    {
                        path: "newSession", element: <StartNewSession/>,
                    },
                    {
                        path: "all", element: <SessionHistory/>
                    }
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
