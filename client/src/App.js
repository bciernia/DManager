import Home from "./components/Layout/Home/Home";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
    {
        path: '/', element: <Home isError={false}/>, errorElement: <ErrorPage />
    }
])

function App() {
    return <RouterProvider router={router} />;
}

export default App;
