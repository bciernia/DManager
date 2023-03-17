import Card from "./components/UI/Card/Card";
import Menu from "./components/Layout/Menu/Menu";
import Home from "./components/Layout/Home/Home";

function App() {
    return (
        <div className="App">
            <Home>
                <Menu/>
                <Card>
                    <p>Test</p>
                </Card>
            </Home>
        </div>
    );
}

export default App;
