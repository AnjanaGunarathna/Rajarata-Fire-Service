const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    fname:{
        type: String,
        required: true
    },
    lname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    feedback:{
        type: String,
        required: true
    },

    rating:{
        type: String,
        required: true
    },

    team:{
        type: String,
        required: true
    },


})


const Feedbackuser = mongoose.model("Feedbackuser", userSchema);

module.exports = Feedbackuser;
