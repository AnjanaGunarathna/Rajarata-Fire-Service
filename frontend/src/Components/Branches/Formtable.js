import React from 'react'
import "./Branchstyle.css"
import { MdClose } from 'react-icons/md'

const Formtable = ({handleSubmit,handleOnChange, handleclose, rest }) => {
  return (
    <div className= "braddContainer">
        
        <form onSubmit={handleSubmit}>
        <div className="brclose-btn" onClick={handleclose}><MdClose/></div>
          <label htmlFor="Branchname">Branch Name : </label>
          <input type="text" id="Branchname" name="Branchname" onChange={handleOnChange} value={rest.Branchname}/>

          <label htmlFor="BranchId">Branch ID : </label>
          <input type="text" id="BranchId" name="BranchId" onChange={handleOnChange} value={rest.BranchId}/>

          <label htmlFor="email">Email : </label>
          <input type="email" id="email" name="email" onChange={handleOnChange} value={rest.email}/>

          <label htmlFor="mobile">Mobile : </label>
          <input type="number" id="mobile" name="mobile" onChange={handleOnChange} value={rest.mobile}/>

          <label htmlFor="location">Location : </label>
          <input type="text" id="location" name="location" onChange={handleOnChange} value={rest.location}/>

          <button className = "brbtn">Submit</button>
        </form>
      </div>
  )
}

export default Formtable
