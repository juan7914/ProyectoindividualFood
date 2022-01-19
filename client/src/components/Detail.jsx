import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getDetail } from "../actions";
import { NavLink } from "react-router-dom";
import styles from "../components/Styles/detail.module.css";

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  const recipe = useSelector((state) => state.detail);
  console.log(recipe);

  return (
    <div className={styles.fondo}>
      <NavLink to="/home">
        <button className={styles.btn2}>Volver</button>
      </NavLink>
      {recipe.length > 0 ? (
        <Fragment>
          <Fragment>
            <h1 className={styles.titulo}>{recipe[0].name}</h1>
            <img
              className={styles.image}
              src={recipe[0].image}
              alt=""
              width="200px"
              height="200px"
            />
          </Fragment>
          <Fragment>
            <p>
              <h5 className={styles.summary}>
                Resume: {recipe[0].resume.replace(/<[^>]*>?/g, "")}
              </h5>
            </p>
            <h5 className={styles.dt}>
              Diet Types:{" "}
              {recipe[0].diets && recipe[0].diets.length
                ? recipe[0].diets.map((diet) => ` ${diet}. `)
                : recipe[0].diets
                ? "No se especificó ningún tipo de dieta para esta receta, lo siento..."
                : recipe[0].DietTypes && recipe[0].DietTypes.length
                ? recipe[0].DietTypes.map((diet) => ` ${diet.name}. `)
                : "No se especificó ningún tipo de dieta para esta receta, lo siento..."}{" "}
            </h5>

            <h5 className={styles.s}>Score: {recipe[0].score}</h5>
            <h5 className={styles.sbs}>
              Healthy level: {recipe[0].healthylevel}
            </h5>
            <p className={styles.hs}>
              Step by step:{" "}
              {!recipe[0].createdInDB
                ? recipe[0].stepbystep.map((step) => step)
                : recipe[0].stepbystep}
            </p>
          </Fragment>
        </Fragment>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
