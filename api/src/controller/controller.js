const axios = require("axios").default;
const { Recipe, DietType } = require("../db");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { API_KEY } = process.env;

// voy a traer la informacion de mi Api que por logica viene de forma asicronica
const getApiInfo = async () => {
  const ApiUrl = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );

  const apiInfo = ApiUrl.data.results.map((obj) => {
    return {
      ID: obj.id,
      name: obj.title,
      resume: obj.summary,
      score: obj.spoonacularScore,
      healthylevel: obj.healthScore,
      stepbystep: obj.analyzedInstructions.map((obj) => {
        obj.steps.map((obj2) => {
          obj2.step;
        });
      }),
      image: obj.image,
      createdInDB: obj.createdInDB,
      diets: obj.diets.map((diet) => diet),
    };
  });
  return apiInfo;
};

// voy a traer la informacion de mi base de datos que tambie viene de forma asincronica
const getDBInfo = async () => {
  return await Recipe.findAll({
    include: {
      model: DietType,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

// vamos a unir la informacion de la api con la informacion de nuestra base de datos
const getAllRecipes = async () => {
  const apiInfo = await getApiInfo();
  const DBInfo = await getDBInfo();
  return apiInfo.concat(DBInfo);
};

// esta funcion nos sirve para traer todas las recetas o en su defecto traer la receta que nos llegue por query; sera usada en la ruta get ('/') y get(?query)
async function showAllRecipes(req, res) {
  const name = req.query.name;
  const info = await getAllRecipes();

  if (name) {
    let recipeName = await info.filter((recipe) => recipe.name.includes(name));
    if (recipeName.length > 0) res.status(200).send(recipeName);
    else res.status(404).json({ message: "No recipes with that name." });
  } else res.status(200).json(info);
}

// Esta funcion asincronica me sirve para buscar la receta por ID  Y estara en la ruta que por parametro me solicita el id  get('/:id')
async function showRecipesById(req, res) {
  const id = req.params.id.trim();
  const info = await getAllRecipes();

  if (id) {
    let recipeId = await info.filter(
      (recipe) => recipe.ID.toString() === id.toString()
    );
    if (recipeId.length > 0) res.status(200).send(recipeId);
    else res.status(404).json({ message: "No recipes with that ID." });
  }
}

// Esta funcion me trae toda la informacion de la api la filtro para  sacar el tipo de dieta y la incluyo al modelo DietType para poder consultar todos c/u de los tipos de dietas.
async function showDietTypes(req, res) {
  const allData = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch/?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );

  const diet = allData.data.results.map((element) => element.diets);

  const diet2 = [];

  diet.map((d2) => {
    for (var i = 0; i < d2.length; i++) {
      diet2.push(d2[i]);
    }
  });
  diet2.flat();

  diet2.forEach((element) => {
    if (element) {
      DietType.findOrCreate({
        where: { name: element },
      });
    }
  });
  const allDiet = await DietType.findAll();

  res.json(allDiet);
}
// con esta funcion creamos una nueva receta y la ingresamos  oagregamos a nuestrea base de datos esta funcion de utiliza en la ruta post('/')
async function postRecipe(req, res) {
  let { name, resume, score, healthylevel, stepbystep, image, createdInDb } =
    req.body;

  try {
    let diet = req.body.diets;

    const newRecipe = await Recipe.create({
      name,
      resume,
      score,
      healthylevel,
      stepbystep,
      image,
      diet,
      createdInDb,
    });

    // let array = Array.isArray(diets) ? diets : [diets]
    let dietDB = await DietType.findAll({
      where: {
        name: {
          [Op.in]: diet,
        },
      },
    });

    newRecipe.addDietType(dietDB);
    //dietDB.map((element) => newRecipe.addDietType(element));
    res.status(200).send("Recipe successfully uploaded");
  } catch (error) {
    console.log(error);
  }
}

// const createRecipe = async (req, res) => {
//   let { name, summary, score, healthScore, steps, createdInDb } = req.body;

//   try {
//     let diet = req.body.diet;

//     let recipeCreated = await Recipe.create({
//       name,
//       summary,
//       score,
//       healthScore,
//       steps,
//       createdInDb,
//     });

//     let dietDb = await Type.findAll({
//       where: { name: diet },
//     });
//     recipeCreated.addType(dietDb);
//     res.send("Receta creada exitosamente.");
//   } catch (e) {
//     res.status(404).send(e);
//     console.log(e);
//   }
// };

module.exports = { showAllRecipes, showRecipesById, showDietTypes, postRecipe };
