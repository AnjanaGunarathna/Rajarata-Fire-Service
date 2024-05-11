import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/firelogo_big.png'
import insta_icon from '../Assets/instagram_icon.png'
import pinterst_icon from '../Assets/pintester_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>Rajarata Fire Service</p>
      </div>
      <ul className="footer-links">
        <li>Company</li>
        <li>Services</li>
        <li>About</li>
        <li><Link to="/complain">Complain</Link></li>
      </ul>
      <div className="footer-social-icon">
        <div className="footer-icon-container">
            <img src={insta_icon} alt="" style={{height:'40px', width:'40px'}}/>
        </div>
        <div className="footer-icon-container">
            <img src={pinterst_icon} alt="" style={{height:'40px', width:'40px'}}/>
        </div>
        <div className="footer-icon-container">
            <img src={whatsapp_icon} alt="" style={{height:'40px', width:'40px'}}/>
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>© 2015 Rajarata Fire Service (PVT) Ltd. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer
