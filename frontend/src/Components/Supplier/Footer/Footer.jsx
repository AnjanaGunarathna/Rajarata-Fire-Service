import React from 'react'
import './Footer.css'
import footer_logo from '../../Assets/firelogo_big.png'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>Rajarata Fire Service</p>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>© 2015 Rajarata Fire Service (PVT) Ltd. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer
