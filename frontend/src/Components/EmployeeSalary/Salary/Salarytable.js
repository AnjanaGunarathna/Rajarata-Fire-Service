import React, { useState, useEffect } from 'react';
import '../Employee.css';
import { MdClose } from 'react-icons/md';

const Salarytable = ({ handleSubmit, handleOnChange, handleclose, rest }) => {
  const [netPayment, setNetPayment] = useState(calculateNetPayment());

  // Define a function to calculate net payment
  function calculateNetPayment() {
    const { basicSalary, otHours, ratePerHour } = rest;
    const basic = parseFloat(basicSalary);
    const ot = parseFloat(otHours);
    const rate = parseFloat(ratePerHour);
    return basic + (ot * rate);
  }

  document.addEventListener('DOMContentLoaded', function() {
    const netPaymentInput = document.getElementById('netPayment');
    netPaymentInput.value = calculateNetPayment(); // Set the value directly from the function
});


  // Update net payment whenever otHours or ratePerHour changes
  useEffect(() => {
    setNetPayment(calculateNetPayment());
  }, [rest.otHours, rest.ratePerHour]);

  // Handle changes in input fields
  // Inside Formtable component

// Handle changes in input fields
const handleChange = (e) => {
  const { name, value } = e.target;
  let newData = { ...rest, [name]: value };
  if (name === "otHours" || name === "ratePerHour") {
    const newNetPayment = calculateNetPayment();
    setNetPayment(newNetPayment);
    newData = { ...newData, netPayment: newNetPayment };
  }
  handleOnChange(newData);
};


  return (
    <div className="emp-add-container">
      <form onSubmit={handleSubmit}>
        <div className="emp-close-btn" onClick={handleclose}><MdClose/></div>
        <label htmlFor="employeeId">Employee ID:</label>
        <input type="text" id="employeeId" name="employeeId" onChange={handleOnChange} value={rest.employeeId} />

        <label htmlFor="basicSalary">Basic Salary:</label>
        <input type="number" id="basicSalary" name="basicSalary" onChange={handleOnChange} value={rest.basicSalary} />

        <label htmlFor="otHours">OT Hours:</label>
        <input type="number" id="otHours" name="otHours" onChange={handleOnChange} value={rest.otHours} />

        <label htmlFor="ratePerHour">Rate Per Hour:</label>
        <input type="number" id="ratePerHour" name="ratePerHour" onChange={handleOnChange} value={rest.ratePerHour} />

        <label htmlFor="netPayment"> Net Payment : </label>
          <input type="text" id="netPayment" name="netPayment" onChange={handleOnChange} /*value={netPayment}*/ />

       

        <button className="emp-btn">Submit</button>
      </form>
    </div>
  );
}
export default Salarytable;



