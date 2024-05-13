// AboutUs.js

import React from 'react';
import './CSS/AboutUs.css';
import AjithKumaraImage from '../Components/Assets/owner.png';

const AboutUs = () => {
    return (
      <div className="about-us">
        <div className="about-card">
          <div className="about-image">
            <img src={AjithKumaraImage} alt="Ajith Kumara" />
            <div className="director-info">
              <h3>Mr. Ajith Kumara (Rsp. Usp)</h3>
              <p>Managing Director</p>
              <p>Retired Air Force Fire (S.P.1) (Member of NIOSH)</p>
              <p>Member In 19, Peace Keeping Battalion</p>
              <p>UN Missing United Nation Completed in HAITI.</p>
            </div>
          </div>
          <div className="about-text">
            <h2>About Us</h2>
            <p>Mr. Ajith Kumara started Rajarata Fire Service as a very small business. Subsequently, he went on to start Rajarata Fire Protection Service in Sri Lanka in the same 2015 year. Today Rajarata Fire Service (PVT) Ltd is an industry leader and the preferred choice for fire protection services. Rajarata Fire Service has a qualified and trained team of engineers and technical staff. The workshop is centrally located and situated in Anuradhapura. The state-of-the-art facility is fully equipped to handle large-scale fire protection, detection, and suppression systems. Also, Rajarata Fire Service is a member of the National Fire Protection Authority and a CIDA-registered company.</p>
          </div>
        </div>
        <div className="vision-card">
          <h2>Our Vision</h2>
          <p>To be the customer's first choice of life risk management offering a comprehensive and unique portfolio of products and services, aimed at saving lives and protecting property from fire at all times.</p>
        </div>
      </div>
    );
  };
export default AboutUs;
