const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const users = require("../models/userSchema");
const Product = require("../models/productSchema");

// Register a new user
router.post("/register", async (req, res) => {
  const { name, email, company, add, mobile, desc, type } = req.body;

  if (!name || !email || !company || !mobile || !type || !add || !desc) {
    return res.status(422).json("Please fill in all the required fields");
  }

  try {
    const preuser = await users.findOne({ email: email });

    if (preuser) {
      return res.status(422).json("This user is already present");
    }

    const adduser = new users({
      name,
      email,
      company,
      mobile,
      type,
      add,
      desc,
    });

    await adduser.save();

    
    // Send email to the registered user
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'pavinduofficial@gmail.com',
        pass: 'syvn oizt zphe fhfn', // Update with your actual password
      },
    });

    const mailOptions = {
      from: 'pavinduofficial@gmail.com',
      to: email,
      subject: 'Welcome to Rajarata Fire Service - Supplier Registration Confirmation',
      text: `Dear ${name},\n\nWe are delighted to inform you that your registration as a supplier with Rajarata Fire Service has been successfully processed. Welcome aboard! Your contribution as a supplier plays a crucial role in our mission to deliver high-quality products and services to our clients. We look forward to a fruitful and collaborative partnership ahead. Should you have any questions or require further assistance, please do not hesitate to contact us. Thank you for choosing Rajarata Fire Service.\n\nBest regards,\n\nRajarata Fire Service\n0702510900 / 0252223436`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json('Error sending email');
      } else {
        console.log('Email sent:', info.response);
        return res.status(201).json(adduser);
      }
    });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(422).json(error);
  }
});

// Get all user data
router.get("/getdata", async (req, res) => {
  try {
    const userData = await users.find();
    res.status(200).json(userData); // Changed status to 200 for success
  } catch (error) {
    res.status(422).json(error);
  }
});

// Get individual user by ID
router.get("/getuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userindividual = await users.findById(id);
    res.status(200).json(userindividual); // Changed status to 200 for success
  } catch (error) {
    res.status(404).json(error);
  }
});

// Update user data by ID
router.patch("/updateuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateuser = await users.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updateuser); // Changed status to 200 for success
  } catch (error) {
    res.status(422).json(error);
  }
});

// Delete user by ID
router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteuser = await users.findByIdAndDelete(id);
    res.status(200).json(deleteuser); // Changed status to 200 for success
  } catch (error) {
    res.status(422).json(error);
  }
});

// Add product details
router.post("/addProductDetails/:userId", async (req, res) => {
  const { userId } = req.params;
  const { productName, productValue, quantity, date } = req.body;

  if (!productName || !productValue || !quantity || !date) {
    return res.status(422).json("Please fill in all the required fields");
  }

  try {
    const newProduct = new Product({
      userId,
      productName,
      productValue,
      quantity,
      date,
      stock: productValue * quantity,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(422).json(error);
  }
});

// Get product details by user ID
router.get("/getProductDetails/:userId", async (req, res) => {
  try {
    const products = await Product.find({ userId: req.params.userId });
    res.json(products);
  } catch (error) {
    console.error("Error fetching product details", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete product by ID
router.delete("/deleteProduct/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(422).json(error);
  }
});

module.exports = router;
