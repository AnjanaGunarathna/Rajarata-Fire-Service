// models/ServiceAppointment.js

const mongoose = require('mongoose');

const serviceAppointmentSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  about: {
    type: String,
    required: true
  }
});

const ServiceAppointment = mongoose.model('ServiceAppointment', serviceAppointmentSchema);

module.exports = ServiceAppointment;
