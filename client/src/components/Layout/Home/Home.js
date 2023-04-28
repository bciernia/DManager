import classes from './Home.module.css'
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import {Outlet} from "react-router-dom";

const Home = props => {
    return (
        <section className={classes["main-section"]}>
            <div>
                <Navbar />
            </div>
            <div className={classes["content-wrap"]}>
                <Outlet />
            </div>
            <div>
                <Footer />
            </div>
        </section>
    )
}

export default Home;

