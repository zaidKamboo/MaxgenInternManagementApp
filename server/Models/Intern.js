const mongoose = require("mongoose");

const internSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        startDate: { type: String, required: true },
        endDate: { type: String, required: true },
        domain: { type: String, required: true },
        duration: { type: String, required: true },
        technologies: {
            type: [
                {
                    type: "String",
                    required: true,
                },
            ],
            default: [],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Intern", internSchema);
// react 21 may web html,css,js & react  amogh -DURATION-3months
// 25 feb pyton full stack kanchan -DURATION-6months
// 6 th may full stack java Nikhil Deshmukh.. -3months..
// 6th Jun - MERN Stack Arbaj Shaikh- 6 months...
// 10 april - MERN Stack Swapnil Dange- 3 months
//  11 june - JAVA FULL stack -m4 months Anuradha
