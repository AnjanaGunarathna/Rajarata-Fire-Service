const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("./db/conn");

app.use(express.json());
app.use(cors());

// API routes
const productRouter = require("./routes/productRoutes");
app.use("/api/products", productRouter);

const port = 4000;

app.listen(port, (err) => {
    if (err) {
        console.error("Error starting server:", err);
    } else {
        console.log("Server running on port " + port);
    }
});