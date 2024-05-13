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

        <li><Link to="/services" style={{ textDecoration: 'none', color: 'black' }}>Services</Link></li>
        <li><Link to="/about" style={{ textDecoration: 'none', color: 'black' }}>About Us</Link></li>
        <li><Link to="/complain" style={{ textDecoration: 'none', color: 'black' }}>Complain</Link></li>
      </ul>
      <div className="footer-social-icon">
        <div className="footer-icon-container">
        <a href="https://www.instagram.com">
            <img src={insta_icon} alt="" style={{height:'40px', width:'40px'}}/>
            </a>
        </div>
        <div className="footer-icon-container">
        <a href="https://www.pinterest.com">
            <img src={pinterst_icon} alt="" style={{height:'40px', width:'40px'}}/>
            </a>
        </div>
        <div className="footer-icon-container">
          <a href="https://api.whatsapp.com/send?phone=%2B94777404097&data=ARCvU0Vqv9-D5U577UjVIAgEW2Rhcw7wUAFzNUTVSUAdgYfp867z1RV-2nDyJ93k1phCJIcIKFifOQ1P8gVeG7oz07kfxMBPEMV0GEeQuy92_mXPtJbTn7MxxRyGTFpM3yTFTe1p3JsnCSTH-0IBfcyGhg&source=FB_Page&app=facebook&entry_point=page_cta&fbclid=IwAR2GUiMO8SToKyQxB8FJXz6LzCbMG1SApPuPO4dkh0985nwdCERBYFbPrBE">
            <img src={whatsapp_icon} alt="" style={{height:'40px', width:'40px'}}/>
            </a>
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
