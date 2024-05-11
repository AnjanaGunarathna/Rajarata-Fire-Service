import React from 'react';
import './Newslatter.css';

const ServiceAppointment = () => {
  return (
    <div className='service-appointment'>
      <h1>Schedule a Service...</h1>
      <div>
        <input type="text" placeholder='Company Name' />
      </div>
      <div>
        <input type="email" placeholder='Your Email Address' />
      </div>
      <div>
        <textarea placeholder='Tell us about your service needs'></textarea>
      </div>
      <div>
        <button>Schedule</button>
      </div>
    </div>
  );
};

export default ServiceAppointment;