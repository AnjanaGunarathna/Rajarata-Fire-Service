const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://rajaratafire:fire200130003314@fireservice.domjhqq.mongodb.net/RajarataFire", {
    
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});
