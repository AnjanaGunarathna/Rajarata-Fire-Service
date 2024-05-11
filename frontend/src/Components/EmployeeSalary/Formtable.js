import React from 'react';
import './Employee.css';
import { MdClose } from 'react-icons/md';

const Formtable = ({ handleSubmit, handleOnChange, handleclose, rest }) => {
  return (
    <div className="emp-add-container">
      <form onSubmit={handleSubmit}>
        <div className="emp-close-btn" onClick={handleclose}><MdClose/></div>

        <label htmlFor="employeeId">Employee ID : </label>
        <input type="text" id="employeeId" name="employeeId" onChange={handleOnChange} value={rest.employeeId}/>

        <label htmlFor="name">Name : </label>
        <input type="text" id="name" name="name" onChange={handleOnChange} value={rest.name}/>

        <label htmlFor="email">Email : </label>
        <input type="email" id="email" name="email" onChange={handleOnChange} value={rest.email}/>

        <label htmlFor="contactNo">Contact No : </label>
        <input type="number" id="contactNo" name="contactNo" onChange={handleOnChange} value={rest.contactNo}/>

        <label htmlFor="highestTraining">Highest Training : </label>
        <input type="text" id="highestTraining" name="highestTraining" onChange={handleOnChange} value={rest.highestTraining}/>

        <label htmlFor="appointmentDate">Appointment Date:</label>
        <input type="text" id="appointmentDate" name="appointmentDate" onChange={handleOnChange} value={rest.appointmentDate} />

        <button className="emp-btn">Submit</button>
      </form>
    </div>
  );
};

export default Formtable;
