// routes/serviceAppointmentRoutes.js

const express = require('express');
const ServiceAppointment = require('../models/ServiceAppointment');
const nodemailer = require('nodemailer');
const router = express.Router();

// Send email function
const sendEmail = async (email, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rajaratafir@gmail.com', // Your email address
      pass: 'rajarata123' // Your email password
    }
  });

  const mailOptions = {
    from: 'rajaratafir@gmail.com',
    to: email,
    subject: subject,
    text: message
  };

  await transporter.sendMail(mailOptions);
};

// Schedule service appointment
router.post('/schedule', async (req, res) => {
  try {
    const { companyName, email, date, about } = req.body;
    const newServiceAppointment = new ServiceAppointment({
      companyName,
      email,
      date,
      about
    });
    await newServiceAppointment.save();
    res.status(201).send('Service appointment scheduled successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Fetch all service appointments
router.get('/appointments', async (req, res) => {
  try {
    const appointments = await ServiceAppointment.find();
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Send email
router.post('/send-email', async (req, res) => {
  try {
    const { id, email, subject, message } = req.body;
    await sendEmail(email, subject, message);
    res.status(200).send(`Email sent to ${email}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
