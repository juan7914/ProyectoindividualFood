import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Detail from "./components/Detail";
import RecipeCreator from "./components/RecipeCreator";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/recipe" element={<RecipeCreator />} />
          <Route path="/recipes/:id" element={<Detail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
