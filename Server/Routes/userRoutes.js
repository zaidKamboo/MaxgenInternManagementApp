const express = require("express");
const router = express.Router();
const UserModel = require("../Models/UserModel");
const bcrypt = require("bcryptjs");

router.get("/users", async (req, res) => {
    try {
        let users = await UserModel.find();
        return res.status(200).json({
            alert: "Fetched users successfully...",
            users,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({ alert: "Error" + error.message });
    }
});

router.post("/users", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const {
            first_name,
            last_name,
            email,
            gender,
            avatar,
            domain,
            available,
            password,
        } = req?.body;
        const secPass = await bcrypt.hash(password, salt);
        const user = await UserModel.create({
            first_name,
            last_name,
            email,
            gender,
            avatar,
            domain,
            available,
            password: secPass,
        });

        return res.status(200).json({
            alert: "User registered successfully.",
            user,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({ message: "ERROR", alert: error.message });
    }
});

router.post("/users/login", async (req, res) => {
    try {
        const { email, password } = req?.body;
        let user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                alert: "Please try to login with correct credentials",
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                alert: "Please try to login with correct credentials",
            });
        }
        return res.status(201).json({
            success: true,
            user,
            alert: "Logged in successfully.",
        });
    } catch (error) {
        return res.status(500).json({ alert: error.message, success: false });
    }
});

router.get("/users/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let user = await UserModel.findById(id);
        return res.status(200).json({
            alert: "Fetched user successfully...",
            user,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({ alert: "Error" + error.message });
    }
});

router.put("/users/:id", async (req, res) => {
    try {
        let { id } = req.params;
        let {
            first_name,
            last_name,
            email,
            password,
            gender,
            avatar,
            domain,
            available,
            passNo,
        } = req.body;
        let user;
        if (passNo) {
            user = await UserModel.findByIdAndUpdate(id, {
                $set: {
                    first_name,
                    last_name,
                    email,
                    gender,
                    avatar,
                    domain,
                    available,
                },
            });
        } else {
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(password, salt);
            user = await UserModel.findByIdAndUpdate(id, {
                $set: {
                    first_name,
                    last_name,
                    email,
                    password: secPass,
                    gender,
                    avatar,
                    domain,
                    available,
                },
            });
        }
        if (!user) {
            return res
                .status(404)
                .json({ success: false, alert: "User not found." });
        }
        return res.status(200).json({
            success: true,
            user,
            alert: "Updated Details successfully.",
        });
    } catch (error) {
        return res
            .status(500)
            .json({ alert: error.message, success: false, error });
    }
});

router.delete("/users/:id", async (req, res) => {
    try {
        let { id } = req.params;
        let user = await UserModel.findByIdAndDelete(id);
        if (!user) {
            return res
                .status(404)
                .json({ success: false, alert: "User not found." });
        }
        return res.status(200).json({
            success: true,
            user,
            alert: "User Deleted successfully.",
        });
    } catch (error) {
        return res
            .status(500)
            .json({ alert: error.message, success: false, error });
    }
});

module.exports = router;
