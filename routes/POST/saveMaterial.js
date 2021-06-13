const saveMaterial = require("express").Router();
const modelMaterial = require("../../models/material");
const ApiError = require("../../controller/error/appError");

saveMaterial.post("/save-material", (req,res) => {
    const {name} = req.body;
    const surovina = new modelMaterial({
        name:name
    })
    surovina.save((err,document) => {
        if(err){
            next(ApiError.badRequest('Bohužel nedošlo k uložení suroviny'));
            return res.json({
            })
        }else{
            return res.status(201).json({
                msg: `Došlo k úspěšnému uložení receptu ${JSON.stringify(document)}`
            })
        }
    })
})
saveMaterial.get("/save-material", (req,res) => {
    res.send("Ano, navštívil jsi /save-material GETEM")
})

module.exports = saveMaterial;

