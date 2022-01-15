const { Router } = require("express");
//const express = require("express");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
  showAllRecipes,
  showRecipesById,
  showDietTypes,
  postRecipe,
} = require("../controller/controller");

const router = Router();
//router.use(express.json());

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/recipes", showAllRecipes);
router.get("/recipes/:id", showRecipesById);
router.get("/types", showDietTypes);
router.post("/recipe", postRecipe);

module.exports = router;
