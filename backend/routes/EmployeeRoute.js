const express = require('express');
const empModel = require('../models/employeeModel');

const router = express.Router();

// Read
router.get("/empall", async (req, res) => {
    try {
        const data = await empModel.find({});
        res.json({ success: true, data: data });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Create
router.post("/create", async (req, res) => {
    try {
        const data = new empModel(req.body);
        await data.save();
        res.send({ success: true, message: "data saved successfully", data: data });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// Update
router.put("/update/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { employeeId, name, contactNo, email, highestTraining } = req.body;
        await empModel.findByIdAndUpdate(id, { employeeId, name, contactNo, email, highestTraining });
        res.send({ success: true, message: "data updated successfully" });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// Delete
router.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await empModel.findByIdAndDelete(id);
        res.send({ success: true, message: "data deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
