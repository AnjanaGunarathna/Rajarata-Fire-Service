const mongoose = require('mongoose');

const schemaData = mongoose.Schema({
    employeeId: String,
    basicSalary: Number,
    otHours: Number,
    ratePerHour: Number,
    netPayment: Number,
}, {
    timestamps: true
});

const Salary = mongoose.model("Salary", schemaData);

module.exports = Salary;
