import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './CSS/complain.css';


const Complain = () => {
  const form = useRef();
  const [showPopup, setShowPopup] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_22j6ptd', 'template_lsx8dgk', form.current, {
        publicKey: 'LEkGufyTw2Np9LTyo',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          console.log("Message Sent");
          form.current.reset(); // Clear form fields
          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
          }, 3000); // Hide the popup after 3 seconds
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <div className='background'>
    <div className='class'>
      <h1>Submit Your Complain</h1>
      <form className="addclass" ref={form} onSubmit={sendEmail}>
        <div className='inputclass'>
          <label htmlFor="user_name">Name</label>
          <input type="text" id="user_name" name="user_name" />
        </div>
        <div className='inputclass'>
          <label htmlFor="user_email">Email</label>
          <input type="email" id="user_email" name="user_email" />
        </div>
        <div className='inputclass'>
          <label htmlFor="message">Complain</label>
          <textarea id="message" name="message" />
        </div>
        <div className='inputclass'>
          <button type="submit">SUBMIT</button>
        </div>
      </form>
      <div className={`popup-message ${showPopup ? 'show' : ''}`}>
        Sucessfully Sent!
      </div>
    </div>
    </div>
  );
};

export default Complain;
