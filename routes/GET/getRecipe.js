const getRecepts = require("express").Router()
const recepts = require("../../models/recipe");
const ApiError = require("../../controller/error/appError");

getRecepts.get("/get-recipes", (req, res) => {
    recepts.find({}, (err, docs) => {
        if(err){
            next(ApiError.badRequest('Nepodařilo se smazat žádný recept'));
            return res.json({
                documents:[]
            })
        }else{
            return res.status(201).json({
                msg:"Úspěšně se nám poařilo získat recepty",
                documents:docs,
            })
        } 
     }) 
})

module.exports = getRecepts;