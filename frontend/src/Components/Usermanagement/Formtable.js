import React from 'react';
import "./Userstyle.css";
import { MdClose } from 'react-icons/md';

const Formtable = ({ handleSubmit, handleOnChange, handleclose, rest }) => {
  return (
    <div className="adduseContainer">
      <form onSubmit={handleSubmit}>
        <div className="useclose-btn" onClick={handleclose}><MdClose/></div>
        <label htmlFor="name">Name : </label>
        <input type="text" id="name" name="name" onChange={handleOnChange} value={rest.name}/>

        <label htmlFor="email">Email : </label>
        <input type="email" id="email" name="email" onChange={handleOnChange} value={rest.email}/>

        <label htmlFor="password">Password : </label>
        <input type="password" id="password" name="password" onChange={handleOnChange} value={rest.password}/>

        <label htmlFor="contactNumber">Contact No : </label>
        <input type="text" id="contactNumber" name="contactNumber" onChange={handleOnChange} value={rest.contactNumber}/>

        <label htmlFor="address">Address : </label>
        <input type="text" id="address" name="address" onChange={handleOnChange} value={rest.address}/>

        <button className="usebtn">Submit</button>
      </form>
    </div>
  );
}

export default Formtable;
