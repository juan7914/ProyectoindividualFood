import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipes,
  filterRecipesByDiet,
  filterCreated,
  orderByScore,
  orderByAlphabetics,
} from "../actions";
import { NavLink } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import styles from "../components/Styles/home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  // eslint-disable-next-line
  const [orden, setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(9);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
  }
  //Upward Downward --> ordenamos por el score
  function sortByScore(e) {
    e.preventDefault();
    dispatch(orderByScore(e.target.value));
    setCurrentPage(1);
    orden ? setOrden(false) : setOrden(`Ordenado ${e.target.value}`);
  }

  function handleFilterDietTypes(e) {
    dispatch(filterRecipesByDiet(e.target.value));
  }

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }

  function sortByAlpha(e) {
    e.preventDefault();
    dispatch(orderByAlphabetics(e.target.value));
    setCurrentPage(1);
    orden ? setOrden(false) : setOrden(`Ordenado ${e.target.value}`);
  }

  return (
    <div className={styles.imagen}>
      <NavLink to="/recipe">
        <button className={styles.button}>Crea tu receta...</button>
      </NavLink>
      <button
        className={styles.button2}
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Actualiza Pagina
      </button>
      <div>
        <select onChange={(e) => sortByScore(e)} className={styles.select1}>
          <option value=" ">Orden</option>
          <option value="UP">Ascendente</option>
          <option value="DOWN">Decendente</option>
        </select>
        <select onChange={(e) => sortByAlpha(e)} className={styles.select2}>
          <option value=" ">Orden Alfabetico</option>
          <option value="A-Z">A to Z</option>
          <option value="Z-A">Z to A</option>
        </select>
        <select
          onChange={(e) => handleFilterDietTypes(e)}
          className={styles.select3}
        >
          <option value="All">Tipo Dieta</option>
          <option value="gluten free">Gluten free</option>
          <option value="dairy free">Dairy free</option>
          <option value="lacto ovo vegetarian">Lacto ovo vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="paleolithic">Paleolithic</option>
          <option value="primal">Primal</option>
          <option value="pescatarian">Pescatarian</option>
          <option value="fodmap friendly">Foodmap friendly</option>
          <option value="whole 30">Whole 30</option>
        </select>
        <select
          onChange={(e) => handleFilterCreated(e)}
          className={styles.select4}
        >
          <option value="all">Recetas</option>
          <option value="created">Creadas</option>
          <option value="current">Actuales</option>
        </select>

        <Paginado
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}
          paginado={paginado}
        />

        <SearchBar />

        <span className={styles.recipes}>
          {currentRecipes.length > 0 &&
            currentRecipes.map((e) => {
              return (
                <fragment>
                  <NavLink to={"/recipes/" + e.ID} className={styles.a}>
                    <Card
                      key={e.ID}
                      id={e.ID}
                      name={e.name}
                      image={e.image}
                      diets={
                        e.diets
                          ? e.diets
                          : e.DietTypes && e.DietTypes.map((e) => e.name)
                      }
                    />
                  </NavLink>
                </fragment>
              );
            })}
        </span>
      </div>
    </div>
  );
}
