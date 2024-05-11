const mongoose =  require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({

    name : {
        type : String,
        required: true
    },
    onumber : {
        type : Number,
        required: true
    },
    address : {
        type : String,
        required: true
    },
    email : {
        type : String,
        required: true
    },
    tell : {
        type : Number,
        required: true
    },
    ostatus : {
        type : String,
        required: true
    }

})

const Order = mongoose.model("Order",orderSchema);
module.exports = Order;