import classes from './Home.module.css'
import Sidebar from "../Sidebar/Sidebar";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import {Outlet} from "react-router-dom";

const Home = props => {
    return (
        <section className={classes.layout}>
            <div className={classes["layout-sidebar"]}>
                <Sidebar />
            </div>
            <div className={classes["layout-main"]}>
                <Main>
                    <Outlet />
                </Main>
            </div>
            <div className={classes["layout-footer"]}>
                <Footer />
            </div>
        </section>
    )
}

export default Home;

