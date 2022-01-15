import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipe } from "../actions";
import styles from "../components/Styles/searchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    console.log(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNameRecipe(name));
    setName("");
  }
  return (
    <div>
      <input
        className={styles.input}
        type="text"
        placeholder="Search ..."
        value={name}
        onChange={(e) => handleInputChange(e)}
      />
      <button
        className={styles.button2}
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        <span role="img" aria-label="lupa">
          🔎
        </span>
      </button>
    </div>
  );
}
