import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Home from "./components/Layout/Home/Home";

const router = createBrowserRouter([
    {
        path: '/', element: <Home />, errorElement: <ErrorPage />,
    }
])

function App() {
    return <RouterProvider router={router} />;
}

export default App;
