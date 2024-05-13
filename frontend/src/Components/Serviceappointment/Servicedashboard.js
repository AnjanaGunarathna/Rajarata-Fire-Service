// AdminPanel.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Service.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const ServiceDash = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/api/serviceappointments/appointments');
        setAppointments(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAppointments();
  }, []);

  const handleSendEmail = async (id, email) => {
    try {
      const subject = 'Service Appointment Confirmation';
      const message = `Your service appointment has been confirmed. We will contact you shortly.\n\nRegards,\nYour Company Name`;
      await axios.post('/api/service-appointments/send-email', { id, email, subject, message });
      alert(`Email sent to ${email}`);
    } catch (error) {
      console.error(error);
      alert('An error occurred while sending the email.');
    }
  };

  return (
    <div className='service-dash'>
      <h1>Service Appointments</h1>
      <table>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Email</th>
            <th>Date</th>
            <th>About</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment._id}>
              <td>{appointment.companyName}</td>
              <td>{appointment.email}</td>
              <td>{new Date(appointment.date).toLocaleDateString()}</td>
              <td>{appointment.about}</td>
              <td className="actions">
                <button onClick={() => handleSendEmail(appointment._id, appointment.email)}>
                  <FontAwesomeIcon icon={faEnvelope} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceDash;
