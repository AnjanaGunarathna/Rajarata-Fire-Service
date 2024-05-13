const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const upload = require('express-fileupload')
const bodyParser = require("body-parser");
const uuid = require('uuid').v4
const stripe = require("stripe")("sk_test_51NqHFfB36akorYVl66XfLD8NSaoMvad28vPp0at2SXWbA6A28DaLvsWZFAlE5dGQJkWtPCyIeub9MZYh12bHvIvL009W00Mftn")
const dotenv = require("dotenv")




// Connect to MongoDB
require("./db/conn");

app.use(express.json());
app.use(cors());

// API routes
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const supplierRouter = require("./routes/router");
const feedbackRouter = require("./routes/FeedbackuserRoute");
const projectuserRouter = require("./routes/projectUserRoutes");
const postRouter = require("./routes/postRoutes");
const employeeRouter = require("./routes/EmployeeRoute");
const employeeSalary = require("./routes/SalaryRoutes");
const branchRouter = require("./routes/branchRoute");
const orderRouter = require("./routes/orders.js");
const serviceappointments = require("./routes/serviceAppointmentRoutes.js");

app.use("/api/products", productRouter);
app.use("/webuser", userRouter);
app.use("/supplierdetails", supplierRouter);
app.use("/feedbackuser", feedbackRouter);
app.use("/api/posts", postRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/salary", employeeSalary);
app.use("/api/branch", branchRouter);
app.use("/order",orderRouter);
app.use("/api/serviceappointments", serviceappointments);


//----------payment gateway------------------------------------

app.post('/checkout', async(req,res) => {
    console.log(req.body) 

    let error,status

    try{

      const{product01,token} = req.body

      const customer = await stripe.customers.create({
        email: token.email,
        source:token.id
      })
      const key = uuid()
      const charge = await stripe.charges.create(
        {
          amount: product01.price * quantity001 * 100,
          currency: "lkr",
          customer: customer.id,
          receipt_email: token.email,
          shipping:{
            name:token.card.name,
            address:{
              line1:token.card.address_line1,
              line2:token.card.address_line2,
              city:token.card.address_city,
              country:token.card.address_country,
              postal_code:token.card.address_zip,
            },
          },
        },
        {
          key,
        }
      );

      console.log("Charge:",{charge});
      status = "success";

    }catch(error){
      console.log(error)
      status = "failure";
    }
    res.json({error,status});
  
})



const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log("Server running on port " + port);
});
