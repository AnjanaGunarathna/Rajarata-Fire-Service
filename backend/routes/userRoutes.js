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


router.get('/profile', async (req, res) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, 'secret_ecom');
      const user = await Users.findById(decoded.user.id);
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }
      res.json({ success: true, user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Server Error" });
    }
  });
  
  // Update user profile
  router.put('/profile/update', async (req, res) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, 'secret_ecom');
      const user = await Users.findByIdAndUpdate(decoded.user.id, req.body, { new: true });
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }
      res.json({ success: true, user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Server Error" });
    }
  });





 // Get all users
 router.get('/alluser', async (req, res) => {
    try {
      const data = await Users.find({});
      res.json({ success: true, data: data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });
  
  // Create
  router.post('/create', async (req, res) => {
    try {
      const data = new Users(req.body);
      await data.save();
      res.send({ success: true, message: 'data save successfully', data: data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });
  
  // Update
  router.put('/update', async (req, res) => {
    try {
      const { _id, ...rest } = req.body;
      const data = await Users.updateOne({ _id: _id }, rest);
      res.send({ success: true, message: 'data update successfully', data: data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });
  
  // Delete
  router.delete('/delete/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const data = await Users.deleteOne({ _id: id });
      res.send({ success: true, message: 'data deleted successfully', data: data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });


  

module.exports = router;
