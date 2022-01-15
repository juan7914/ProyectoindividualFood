import React from "react";
import styles from "../components/Styles/card.module.css";

export default function Card({ name, image, diets }) {
  return (
    <React.Fragment>
      <div className={styles.contenedor}>
        <div className={styles.div2}>
          <img
            className={styles.pic}
            src={image}
            alt=""
            width="250px"
            height="200px"
          />
          <h1 className={styles.title}>{name}</h1>
          <h3 className={styles.diettype}>
            Tipo Dieta: {diets && diets.length ? diets : "N/A"}
          </h3>
        </div>
      </div>
    </React.Fragment>
  );
}
