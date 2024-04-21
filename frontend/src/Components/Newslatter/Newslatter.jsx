import React from 'react'
import './Newslatter.css'

const Newslatter = () => {
  return (
    <div className='newslatter'>
      <h1>Get In Touch With Us</h1>
      <p>Subcribe to our newletter and stay updated</p>
      <div>
        <input type="email" placeholder='Your email id' />
        <button>Subscribe</button>
      </div>
    </div>
  )
}

export default Newslatter
