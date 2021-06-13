const deleteRecept = require("express").Router()
const recepts = require("../../models/recipe");
const ApiError = require("../../controller/error/appError");

deleteRecept.post("/get-recipes/:id/delete", async(req, res) => {
    const { id } = req.params;
    await recepts.findByIdAndDelete(id);
    ({}, (err, docs) => {
        if(err){
            next(ApiError.badRequest('Nepodařilo se smazat žádný recept'));
            return res.json({
                documents:[]
            })
        }else{
            return res.status(201).json({
                msg:"Úspěšně jste smazali recept",
                documents:docs,
            })
        } 
     }) 
})

module.exports = deleteRecept;