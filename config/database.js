const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL, {})
        .then(() => console.log("Database Connected Successfully"))
        .catch((error) => {
            console.log("An Error Occured While Connecting with the Database");
            console.error(error.message);
            process.exit(1);
        });
}

module.exports = dbConnect;