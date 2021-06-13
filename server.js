const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const db = require("./databaze/connect");
const getMaterials = require("./routes/GET/getMaterial");
const saveMaterial = require("./routes/POST/saveMaterial");
const getRecipes = require("./routes/GET/getRecipe");
const saveRecipes = require("./routes/POST/saveRecipe");
const getRecipeId = require("./routes/GET/getRecipeId");
const deleteRecipe = require("./routes/DELETE/deleteRecipe");
const cors = require("cors");
const apiErrorHandler = require('./controller/error/api-error-handler');
db.connect();

/**
 * Middleware
 * Povolme přijímat JSON z frontendu
 */
 app.use(express.json({extended:false}));
 app.use(express.text({extended:false}));
 app.use(apiErrorHandler);
/**
 * Routy - GET
 */
app.use("/",cors(),getMaterials);
app.use("/",cors(),getRecipes);
app.use("/",cors(),getRecipeId);
/**
 * Routy - POST
 */
app.use("/", saveMaterial);
app.use("/", saveRecipes);
/**
 * Routy - Delete
 */
app.use("/", deleteRecipe);

app.get("/", (request,response) => {
    response.send("Hlavní stránka");
});

app.listen(PORT, (err) => {
    console.log(`Server běží na ${PORT}!`)
});