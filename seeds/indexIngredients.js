const mongoose = require('mongoose');
const Ingredient = require('../models/material');
const ingredients = require('./Ingredients');

mongoose.connect('mongodb://cookbook:unicorncollage@cluster0-shard-00-00.ch8px.mongodb.net:27017,cluster0-shard-00-01.ch8px.mongodb.net:27017,cluster0-shard-00-02.ch8px.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-q9esqz-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    await Ingredient.deleteMany({});
    ingredients.forEach(ingredient => {
        const material = new Ingredient({
            name: ingredient.name,
            amount: ingredient.amount,
            unit: ingredient.unit,
        })
        material.save((err,document) => {
            if(err) throw new Error("Došlo k chybě");
        })
    })
}


seedDB();