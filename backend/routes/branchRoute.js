const express = require('express');
const router = express.Router();
const userModel = require('../models/branchModel');

// Read
router.get("/allbranch", async (req, res) => {
    try {
        const data = await userModel.find({});
        res.json({ success: true, data: data });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Create data: save data in MongoDB
router.post("/create", async (req, res) => {
    try {
        const data = new userModel(req.body);
        await data.save();
        res.send({ success: true, message: "Data saved successfully", data: data });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// Update data
router.put("/update", async (req, res) => {
    try {
        const { _id, ...rest } = req.body;
        const data = await userModel.findByIdAndUpdate(_id, rest, { new: true });
        if (!data) {
            return res.status(404).send({ success: false, message: 'Data not found' });
        }
        res.send({ success: true, message: "Data updated successfully", data: data });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Delete
router.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await userModel.findByIdAndDelete(id);
        if (!data) {
            return res.status(404).send({ success: false, message: 'Data not found' });
        }
        res.send({ success: true, message: "Data deleted successfully", data: data });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
