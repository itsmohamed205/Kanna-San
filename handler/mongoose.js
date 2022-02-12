const {
    mongooseConnectionString
} = require("../config.json");
const mongoose = require("mongoose");

module.exports = () => {
    if (!mongooseConnectionString) return;

    mongoose.connect(mongooseConnectionString, {
        useFindAndModify: true,
        useUnifiedTopology: true,
    });
console.log("Database is working successfully")
};