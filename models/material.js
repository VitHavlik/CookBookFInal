const mongoose = require("mongoose");
const material = new mongoose.Schema({
    name: {
       type:String,
    },
    amount: {
        type:Number,
    },
    unit: {
        type:String
    }
});
module.exports = mongoose.model("Material", material);