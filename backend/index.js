const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

// Connect to MongoDB
require("./db/conn");

app.use(express.json());
app.use(cors());

// API routes
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");

app.use("/api/products", productRouter);
app.use("/webuser", userRouter);

const port = 4000;

app.listen(port, () => {
    console.log("Server running on port " + port);
});
