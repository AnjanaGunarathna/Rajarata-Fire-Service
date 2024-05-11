import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/firelogo.png'
import navporfile from '../../assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={navlogo} alt="" className='navlogo' />
      <h1 className='title'>Management Dashboard</h1>
      <div className="logoutadmin">
        {localStorage.getItem('auth-token') ? <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/') }}>Logout</button> : null}
      </div>
    </div>
  )
}

export default Navbar
