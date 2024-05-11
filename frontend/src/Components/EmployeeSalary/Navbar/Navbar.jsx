import React from 'react'
import './Navbar.css'
import navlogo from '../../Assets/firelogo_big.png'


const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={navlogo} alt="" className='navlogo' />
      <h1 className='title'>Employee and Financial Management</h1>
    </div>
  )
}

export default Navbar
