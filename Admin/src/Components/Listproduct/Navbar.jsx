import React from 'react'
import '../AdminNavbar/Navbar.css'
import navlogo from '../../assets/firelogo.png'
import navporfile from '../../assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={navlogo} alt="" className='navlogo' />
      <h1 className='title'>Product Management Dashboard</h1>
    </div>
  )
}

export default Navbar
