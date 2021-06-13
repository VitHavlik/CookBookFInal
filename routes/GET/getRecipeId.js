const getReceptId = require("express").Router()
const recepts = require("../../models/recipe");
const ApiError = require("../../controller/error/appError");

getReceptId.get("/get-recipes/:id", async(req, res) => {
    const recipe = await recepts.findById(req.params.id);
    recipe.save({}, (err, docs) => {
        if(err){
            next(ApiError.badRequest('Bohužel se nepodařilo získat žádný recept'));
            return res.json({
                documents:[]
            })
        }else{
            return res.status(201).json({
                msg:"Úspěšně se podařilo najít recept",
                documents:docs,
            })
        } 
     }) 
})

module.exports = getReceptId;



