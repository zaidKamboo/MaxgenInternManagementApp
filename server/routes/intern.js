const getInternsController = require("../Controllers/InternCtrls/getInternsController");
const addInternController = require("../Controllers/InternCtrls/addInternController");
const editInternController = require("../Controllers/InternCtrls/editInternController");
const deleteInternController = require("../Controllers/InternCtrls/deleteInternController");
const router = require("express").Router();

router.get("/getInterns", getInternsController);
router.post("/addIntern", addInternController);
router.post("/editIntern/:id", editInternController);
router.delete("/deleteIntern/:id", deleteInternController);

module.exports = router;
