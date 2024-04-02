const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    id: Number,
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    gender: { type: String, require: true },
    avatar: { type: String, require: true },
    domain: { type: String, require: true },
    available: { type: Boolean, require: true },
    password: { type: String, require: true },
});

module.exports = mongoose.model("User", userSchema);
