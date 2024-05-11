const router = require("express").Router();
let Order = require("../models/order");
const nodemailer = require('nodemailer');


// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'fireservicerajarata@gmail.com',
      pass: 'beuo cams mlfb yhxn'
    }
  });
  


//Create Order..
router.route("/add").post((req,res)=>{

    const name = req.body.name;
    const onumber = Number(req.body.onumber);
    const address = req.body.address;
    const email = req.body.email;
    const tell = Number(req.body.tell);
    const ostatus = req.body.ostatus;
   


    const newOrder = new Order({
        name,
        onumber,
        address,
        email, 
        tell,
        ostatus

    })

    const mailOptions = {
        from: 'fireservicerajarata@gmail.com',
        to: email,
        subject: 'Order Confirmation',
        text: `Hi ${name},\n\nYour order with number ${onumber} has been successfully placed. We will notify you once it ships.\n\nBest,\nYour Company`
      };
    
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.status(500).send('Error sending email');
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).send('Order added and email sent');
        }
      });

    newOrder.save().then(()=>{
        res.json(" Added")
    }).catch((err)=>{
        console.log(err);
    })

})


//Read..
router.route("/all").get((req,res)=>{

    Order.find().then((order)=>{
        res.json(order)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/allorder").get((req,res)=>{

    Order.find().then((order)=>{
        res.json(order)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/allreport").get((req,res)=>{

    Order.find().then((order)=>{
        res.json(order)
    }).catch((err)=>{
        console.log(err)
    })
})


//Delete Order..
router.route("/delete/:id").delete(async (req, res) => {
    let orderId = req.params.id;

    await Order.findByIdAndDelete(orderId)
    .then(() => {
        res.status(200).send({status: "Order Deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete order", error: err.message});
    })
})

router.route("/get/:id").get(async (req, resp) => {
    let result = await Order.findById({_id:req.params.id})
    
    if(result){
        resp.send(result)
    }else{
        resp.send({"result":"No Record Found."})
    }
})  





router.route("/update/:id").put(async (req, resp) => {
    let result = await Order.findByIdAndUpdate({_id:req.params.id},{$set: req.body})
    
   resp.send(result)
})  

module.exports = router;