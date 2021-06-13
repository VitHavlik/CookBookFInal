const mongoose = require('mongoose');
const dotenv = require("dotenv");

class dbConnect {
    connect() {
        dotenv.config();
        mongoose.connect(process.env.DB_CONNECT, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }, (err) => {
           if(err) throw new Error('K databázi se nelze připojit');
           console.log('Úspěšně připojeno k databázy');
        })
    }
}

module.exports = new dbConnect();