const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const cors = require("cors");

// USING MIDDLEWARES
app.use(bodyParser.json());

// CONNECTING TO DB
mongoose
    .connect(
        "mongodb+srv://zaidkamboo100:VfQHBqm705m8DPgU@cluster0.eig9lvn.mongodb.net/"
    )
    .then((res) => console.log("Connected to Db successfully."))
    .catch((error) => console.log(error.message));

app.use(cors());
// ALL ROUTES
app.use("/api", require("./Routes/userRoutes"));
app.use("/api/teams", require("./Routes/teamRoutes"));
app.get("/", (req, res) => {
    res.send("HEllo World");
});
// APP LISTENING
app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
});
