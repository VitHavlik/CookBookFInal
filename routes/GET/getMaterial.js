const getMaterials = require("express").Router()
const materials = require("../../models/material");
const ApiError = require("../../controller/error/appError");

getMaterials.get("/get-materials", (req, res) => {
    materials.find({}, (err, docs) => {
        if(err){
            next(ApiError.badRequest('Bohužel se nepodařilo získat žádné dokumenty'));
            return res.json({
                documents:[]
            })
        }else{
            return res.status(201).json({
                msg:"Úspěšně se nám poařilo získat suroviny",
                documents:docs
            })
        } 
    })
})

module.exports = getMaterials;