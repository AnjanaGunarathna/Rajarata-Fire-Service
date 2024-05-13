const mongoose = require('mongoose');

const schemaData = mongoose.Schema({
    employeeId: String,
    name: String,
    contactNo: Number,
    email: String,
    highestTraining: String,
    appointmentDate: String,
}, {
    timestamps: true
});

const Employee = mongoose.model("Employee", schemaData);

module.exports = Employee;