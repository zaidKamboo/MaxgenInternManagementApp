const express = require("express");
const router = express.Router();
const TeamModel = require("../Models/TeamModel");

router.get("/getAllTeams", async (req, res) => {
    try {
        const teams = await TeamModel.find().populate({
            path: "members",
            select: "first_name avatar",
        });
        return res.status(200).json({
            alert: "Fetched Teams successfully.",
            success: true,
            teams,
        });
    } catch (error) {
        return res.status(500).json({ alert: error.message, success: false });
    }
});
router.get("/getTeam/:id", async (req, res) => {
    try {
        let { id } = req.params;
        let team = await TeamModel.findById(id);
        return res
            .status(200)
            .json({ alert: "Fetched team successfully.", team, success: true });
    } catch (error) {
        return res.status(500).json({ alert: error?.message, success: false });
    }
});
router.get("/getUserTeam/:id", async (req, res) => {
    try {
        let { id } = req.params;
        const teams = await TeamModel.find({ members: id });
        return res.status(200).json({
            alert: "Fetched teams successfully.",
            teams,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({ alert: error?.message, success: false });
    }
});

router.post("/createTeam", async (req, res) => {
    try {
        const { name, members } = req.body;
        const team = await TeamModel.create({ name, members });
        return res
            .status(200)
            .json({ alert: "Team created successfully.", team, success: true });
    } catch (error) {
        return res.status(500).json({ alert: error.message, success: false });
    }
});

module.exports = router;
