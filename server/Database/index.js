const mongoose = require("mongoose");

// DEMO PROJ PASS CLUSTER RuVT3jiVMTjgHS5N
const connectToDb = () => {
    mongoose
        .connect(
            "mongodb+srv://zaidkamboo100:RuVT3jiVMTjgHS5N@cluster0.eig9lvn.mongodb.net/"
        )
        .then(() => {
            console.log("Connected to Db...");
        })
        .catch((err) => console.log(err?.message));
};

module.exports = connectToDb;
