const Feedbackuser = require("../models/FeedbackuserModels");
const mongoose = require("mongoose");

exports.create = async (req, res) => {
    try {
        const userData = new Feedbackuser(req.body);

        if (!userData) {
            return res.status(404).json({ msg: "User data not found" });
        }

        await userData.save();
        res.status(200).json({ msg: "User created successfully" });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

exports.getAll = async (req, res) => {
    try {
        const userData = await Feedbackuser.find();
        if (!userData) {
            return res.status(404).json({ msg: "User data not found" });
        }
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

exports.getOne = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await Feedbackuser.findById(id);
        if (!userExist) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.status(200).json(userExist);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await Feedbackuser.findById(id);
        if (!userExist) {
            return res.status(404).json({ msg: "User not found" });
        }

        const updatedData = await Feedbackuser.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ msg: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await Feedbackuser.findById(id);
        if (!userExist) {
            return res.status(404).json({ msg: "User not exist" });
        }
        await Feedbackuser.findByIdAndDelete(id);
        res.status(200).json({ msg: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
