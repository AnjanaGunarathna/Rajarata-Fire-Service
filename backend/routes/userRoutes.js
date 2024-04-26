const express = require('express');
const router = express.Router();
const Users = require("../models/Users");
const jwt = require("jsonwebtoken");

// Creating endpoint for registering the user
router.post('/signup', async (req, res) => {
    try {
        let check = await Users.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, error: "Existing user found with the same email address" })
        }
        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }
        const user = new Users({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
            contactNumber: req.body.contactNumber,
            address: req.body.address,
            cartData: cart,
        })

        await user.save();

        const data = {
            user: {
                id: user.id
            }
        }

        const token = jwt.sign(data, 'secret_ecom');
        res.json({ success: true, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server Error" });
    }
})

// Creating endpoint for user login
router.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success:true, token });
        }
        else {
            res.json({ success:false, errors:"Wrong Password" });
        } 
    } 
    else {
        res.json({ success:false, errors:"Wrong Email ID" });
    }
})

module.exports = router;
