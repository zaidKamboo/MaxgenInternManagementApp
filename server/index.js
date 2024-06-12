const express = require("express");
const connectToDb = require("./Database");
const Intern = require("./Models/Intern");
const app = express();
const cors = require("cors");
const port = 5000;

connectToDb();
app.use(express.json());
app.use(cors());
app.use("/intern", require("./routes/intern"));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
