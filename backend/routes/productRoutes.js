const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Product = require("../models/Product");
const jwt = require("jsonwebtoken");
const Users = require("../models/Users");

const port = 4000; 

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({storage: storage});

// Upload endpoint for images
router.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/api/products/images/${req.file.filename}`
    });
});

// Add a product
router.post('/add', async (req, res) => {
    try {
        let products = await Product.find({});
        let id;
        if(products.length>0) {
            let lastProduct = products[products.length - 1];
            id = lastProduct.id + 1;
        } else {
            id = 1;
        }
        const product = new Product({
            id:id,
            name: req.body.name,
            image: req.body.image,
            quantity: req.body.quantity,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
        });

        await product.save();
        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Update a product
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { name, image, quantity, new_price, old_price } = req.body;

    try {
        const updatedProduct = await Product.findOneAndUpdate(
            { id },
            { name, image, quantity, new_price, old_price },
            { new: true }
        );

        if (updatedProduct) {
            res.json({ success: true, product: updatedProduct });
        } else {
            res.status(404).json({ success: false, message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Remove a product
router.delete('/remove/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Product.findOneAndDelete({ id });
        res.json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Get new items
router.get('/newitems',async (req,res)=>{
    try {
        let products = await Product.find({});
        let newItems = products.slice(1).slice(-4);
        res.json(newItems);
    } catch (error) {
        console.error('Error fetching new items:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Get all products
router.get('/all', async (req, res) => {
    try {
        let products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error('Error fetching all products:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Get image
router.get('/images/:filename', (req, res) => {
    const { filename } = req.params;
    res.sendFile(path.join(__dirname, `../upload/images/${filename}`));
});

//creating middleware to fetch user
    const fetchUser = async (req,res,next)=>{
        const token = req.header('auth-token');
        if (!token) {
            res.status(401).send({errors:"Please authenticate using valid token "})
        }
        else{
            try {
                const data = jwt.verify(token,'secret_ecom');
                req.user = data.user;
                next();
            } catch (error) {
                res.status(401).send({errors:"Please authenticate using a valid token"})
            }
        }
    }

    router.post('/addtocart', fetchUser, async (req, res) => {
        console.log("added", req.body.itemId);
        try {
            let userData = await Users.findOne({ _id: req.user.id });
            if (userData) {
                let product = await Product.findOne({ id: req.body.itemId });
                if (product && product.quantity > 0) {
                    if (userData.cartData[req.body.itemId] < product.quantity) {
                        userData.cartData[req.body.itemId] = (userData.cartData[req.body.itemId] || 0) + 1;
                        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    
                        // Decrease product quantity in the database by 1
                        product.quantity -= 1;
                        await product.save();
    
                        res.json({ success: true, message: "Product added to cart successfully" });
                    } else {
                        res.status(400).json({ success: false, message: "Product quantity limit reached" });
                    }
                } else {
                    res.status(400).json({ success: false, message: "Out of stock" });
                }
            } else {
                res.status(404).json({ success: false, message: "User not found" });
            }
        } catch (error) {
            console.error("Error adding product to cart:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    });
    

router.post('/removefromcart', fetchUser, async (req, res) => {
    console.log("removed", req.body.itemId);
    try {
      let userData = await Users.findOne({ _id: req.user.id });
      if (userData && userData.cartData[req.body.itemId] > 0) {
        userData.cartData[req.body.itemId] -= 1;
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        let product = await Product.findOne({ id: req.body.itemId });
        if (product) {
          product.quantity += 1; // Increase product quantity in the database by 1
          await product.save();
          res.json({ success: true, message: "Product removed from cart successfully" });
        } else {
          res.status(404).json({ success: false, message: "Product not found" });
        }
      } else {
        res.status(400).json({ success: false, message: "Cart is empty or item not found in the cart" });
      }
    } catch (error) {
      console.error("Error removing product from cart:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });
  
  router.post('/updatecartitemquantity', fetchUser, async (req, res) => {
    console.log('updated', req.body.itemId, 'to quantity', req.body.quantity);
    try {
        let userData = await Users.findOne({ _id: req.user.id });
        let product = await Product.findOne({ id: req.body.itemId });

        const prevQuantity = userData.cartData[req.body.itemId] || 0;
        const quantityDiff = req.body.quantity - prevQuantity;

        // Update user's cart data
        userData.cartData[req.body.itemId] = req.body.quantity;
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });

        // Adjust product quantity
        product.quantity -= quantityDiff; // Adjust product quantity based on quantity difference
        await product.save();

        res.json({ success: true, message: "Quantity updated" });
    } catch (error) {
        console.error("Error updating cart item quantity:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});




//creating end point to get cart data
router.post('/getcart',fetchUser, async (req, res)=>{
    console.log("GetCart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

module.exports = router;
