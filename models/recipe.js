const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReceptSchema = new Schema({
    title: String,
    image: String,
    description: String,
    preparation: Number,
    ingredience: Array,
    method: String,
});

module.exports = mongoose.model('Recept', ReceptSchema);