import React from "react";
import { NavLink } from "react-router-dom";
//import kitchen from "../components/pics/kitchen.mp4";
import styles from "../components/Styles/landingPage.module.css";
import { useDispatch } from "react-redux";
import { getRecipes } from "../actions/index.js";

const LandingPage = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  return (
    <div className={styles.LP_container}>
      <div>
        <h1 className={styles.titulo}>Vegan-Food</h1>
      </div>
      <NavLink to="/home" className="">
        <button className={styles.LP_btn}>Ingresar</button>
      </NavLink>
    </div>
  );
};

export default LandingPage;
