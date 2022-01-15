import React from "react";
import styles from "../components/Styles/paginado.module.css";

export default function Paginado({ recipesPerPage, allRecipes, paginado }) {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i + 1);
  }
  return (
    <nav>
      <ul className={styles.paginado}>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li
              className="number"
              key={number}
              onClick={() => paginado(number)}
            >
              {number}
            </li>
          ))}
      </ul>
    </nav>
  );
}
