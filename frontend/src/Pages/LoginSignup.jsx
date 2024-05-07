import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
  const navigate = useNavigate(); // Use useNavigate hook to navigate

  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    contactNumber: "",
    address: ""
  });
  const [errors, setErrors] = useState({});

  const changHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Reset the error message when the user starts typing again
    setErrors({ ...errors, [e.target.name]: '' });
  }

  const validateForm = () => {
    const { email, password, contactNumber } = formData;
    const errors = {};

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email address is invalid';
    }

    if (!password.trim()) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (state === 'Sign Up') {
      if (!formData.username.trim()) {
        errors.username = 'Username is required';
      }
      if (!contactNumber.trim()) {
        errors.contactNumber = 'Contact number is required';
      } else if (!/^\d{10}$/.test(contactNumber)) {
        errors.contactNumber = 'Contact number must be 10 digits';
      }
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  const login = async () => {
    console.log("Login Function Executed", formData);
    if (!validateForm()) return;

    let responseData;
    await fetch('http://localhost:4000/webuser/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data)

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      if (formData.email === 'rajaratafire@gmail.com') {
        navigate("/admin"); // Navigate to admin page
      } else {
        navigate("/");
      }
    } else {
      alert(responseData.errors)
    }
  }

  const signup = async () => {
    console.log("Signup Function Executed", formData);
    if (!validateForm()) return;

    let responseData;
    await fetch('http://localhost:4000/webuser/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data)

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      if (formData.email === 'rajaratafire@gmail.com') {
        navigate("/admin"); // Navigate to admin page
      } else {
        navigate("/");
      }
    } else {
      alert(responseData.error)
    }
  }

  return (
    <div>
      <div className='loginsignup'>
        <div className="loginsignup-container">
          <h1>{state}</h1>
          <div className="loginsignup-fields">
            {state === "Sign Up" ?
              <>
                <input name='username' value={formData.username} onChange={changHandler} type='text' placeholder='Your Name' className={errors.username && 'error'} />
                {errors.username && <div className="error-message">{errors.username}</div>}
                <input name='email' value={formData.email} onChange={changHandler} type='email' placeholder='Email Address' className={errors.email && 'error'} />
                {errors.email && <div className="error-message">{errors.email}</div>}
                <input name='password' value={formData.password} onChange={changHandler} type='password' placeholder='Password' className={errors.password && 'error'} />
                {errors.password && <div className="error-message">{errors.password}</div>}
                <input name='contactNumber' value={formData.contactNumber} onChange={changHandler} type='text' placeholder='Contact Number' className={errors.contactNumber && 'error'} />
                {errors.contactNumber && <div className="error-message">{errors.contactNumber}</div>}
                <input name='address' value={formData.address} onChange={changHandler} type='text' placeholder='Address' />
              </>
              :
              <>
                <input name='email' value={formData.email} onChange={changHandler} type='email' placeholder='Email Address' className={errors.email && 'error'} />
                {errors.email && <div className="error-message">{errors.email}</div>}
                <input name='password' value={formData.password} onChange={changHandler} type='password' placeholder='Password' className={errors.password && 'error'} />
                {errors.password && <div className="error-message">{errors.password}</div>}
              </>
            }
          </div>
          <button onClick={() => { state === "Login" ? login() : signup() }}>Continue</button>
          {state === "Sign Up" ?
            <p className='loginsignup-login'>Already have an account? <span onClick={() => { setState("Login") }}>Login here</span></p>
            :
            <p className='loginsignup-login'>Create an account? <span onClick={() => { setState("Sign Up") }}>Click here</span></p>}
          <div className="loginsignup-agree">
            <input type="checkbox" name='' id='' />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup;
