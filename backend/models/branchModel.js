const mongoose = require('mongoose');

const schemaData = mongoose.Schema({
    Branchname: String,
    BranchId: String,
    email: String,
    mobile: String,
    location: String,
}, {
    timestamps: true
});

const Branches = mongoose.model("Branches", schemaData);

module.exports = Branches;
