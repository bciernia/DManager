import classes from "./Spinner.module.css"

const Spinner = () => (
    <div className={classes["lds-dual-ring--center"]}>
        <div className={classes["lds-dual-ring"]}/>
    </div>);

export default Spinner;