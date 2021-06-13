const mongoose = require('mongoose');
const Recept = require('../models/recipe');
const meals = require('./meals');


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
    await Recept.deleteMany({});
    meals.forEach(meal => {
        const recipe = new Recept({          
            title: meal.title,
            image: meal.image,
            description: meal.description,
            preparation: meal.preparation,
            method: meal.method,  
            ingredients: meal.ingredients            
     }) 
     recipe.save((err,document) => {
        if(err) throw new Error("Došlo k chybě");
        })
       })
    }


seedDB();