const mongoose = require("mongoose");

function connectToDb() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connected to DB");
        })
        .catch((err) => {
            console.error("DB connection failed:", err.message);
            process.exit(1);
        });
}

module.exports = connectToDb;