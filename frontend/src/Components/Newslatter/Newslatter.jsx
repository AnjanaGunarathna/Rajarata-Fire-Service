import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Calendar from 'react-calendar';
import 'react-datepicker/dist/react-datepicker.css';
import './Newslatter.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Import axios for making HTTP requests

const ServiceAppointment = () => {
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [serviceNeeds, setServiceNeeds] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [error, setError] = useState('');

  const onChange = date => {
    const today = new Date();
    if (date < today) {
      setError('Please select a future date.');
      return;
    }
    setError('');
    setDate(date);
    setShowCalendar(false);
  };

  const handleSubmit = async () => {
    try {
      if (!companyName.trim()) {
        setError('Please enter company name.');
        return;
      }
      if (!email.trim()) {
        setError('Please enter email address.');
        return;
      }
      if (!serviceNeeds.trim()) {
        setError('Please tell us about your service needs.');
        return;
      }
      if (!date) {
        setError('Please select a date.');
        return;
      }

      // Send appointment data to backend
      await axios.post('http://localhost:4000/api/serviceappointments/schedule', {
        companyName: companyName,
        email: email,
        date: date,
        about: serviceNeeds
      });

      // Reset form fields
      setCompanyName('');
      setEmail('');
      setServiceNeeds('');
      setStartDate(new Date());
      setDate(new Date());
      setError('');
      
      alert('Service appointment scheduled successfully.');
    } catch (error) {
      console.error(error);
      alert('Error scheduling service appointment. Please try again later.');
    }
  };

  return (
    <div className='service-appointment'>
      <h1>Schedule a Service...</h1>
      <div>
        <input
          type="text"
          placeholder='Company Name'
          value={companyName}
          onChange={e => setCompanyName(e.target.value)}
        />
      </div>
      <div>
        <input
          type="email"
          placeholder='Your Email Address'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className='date-picker'>
        <input
          type="text"
          placeholder='Select Date'
          value={date.toDateString()}
          onClick={() => setShowCalendar(true)}
        />
        <FontAwesomeIcon icon={faCalendarAlt} onClick={() => setShowCalendar(true)} />
        {showCalendar && (
          <Calendar
            onChange={onChange}
            value={date}
            minDate={new Date()}
          />
        )}
        {error && <p className="error">{error}</p>}
      </div>
      <div>
        <textarea
          placeholder='Tell us about your service needs'
          value={serviceNeeds}
          onChange={e => setServiceNeeds(e.target.value)}
        ></textarea>
      </div>

      <div className='service-button'>
        <button className='service-button' onClick={handleSubmit}>Schedule</button>
      </div>
    </div>
  );
};

export default ServiceAppointment;
