const express = require('express');
const router = express.Router();
const Salary = require('../models/SalaryModel');

// Read
router.get("/salaryall", async (req, res) => {
    try {
        const data = await Salary.find({});
        res.json({ success: true, data: data });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Create
router.post("/create", async (req, res) => {
    try {
        const data = new Salary(req.body);
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
        const { _id, ...rest } = req.body;
        await Salary.findByIdAndUpdate(id, rest);
        res.send({ success: true, message: "data updated successfully" });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// Delete
router.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await Salary.findByIdAndDelete(id);
        res.send({ success: true, message: "data deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Generate Report
router.post('/generate-report', async (req, res) => {
    try {
        const salaries = await Salary.find({}, 'employeeId netPayment');
        res.json({ success: true, data: salaries });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
