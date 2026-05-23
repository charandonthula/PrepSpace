const mongoose = require("mongoose");

const connectDB = async () => {

    try {

        //await mongoose.connect("mongodb://127.0.0.1:27017/prepspaceDB");
        await mongoose.connect(process.env.MONGO_URL)

        console.log("MongoDB Connected");

    } catch (error) {

        console.log(error);

    }

};

module.exports = connectDB;