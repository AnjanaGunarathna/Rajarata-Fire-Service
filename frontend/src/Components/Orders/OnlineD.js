import { useNavigate, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import StripeCheckout from 'react-stripe-checkout';
import React, { useState, useEffect } from "react";
import axios from "axios";
import './OnlineD.css';

export default function OnlineD() {
  const [quantity001, setQuantity001] = useState(1);
  const [inonumber, setInONumber] = useState("");
  const [name, setName] = useState("");
  const [onumber, setONumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [tell, setTell] = useState("");
  const [ostatus, setOStatus] = useState("");
  const [isPaymentSuccessful, setPaymentSuccessful] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    handleOrderNumber();
  }, []);

  const handleOrderNumber = () => {
    var range = "0123456789"
    var otpVal = ""
    for (var i = 0; i < 6; i++) {
      otpVal += range[Math.floor(Math.random() * 10)]
    }
    setInONumber(otpVal)

  }

  async function handleToken(token, addresses) {
    const response = await axios.post('http://localhost:4000/checkout', { token });
    if (response.status === 200) {
      setPaymentSuccessful(true);
      console.log('Payment successful:', response.data);
    } else {
      console.error('Payment failed:', response.data);
    }
  }

  const sendData = (e) => {
    e.preventDefault();

    const newOrder = {
      name,
      onumber,
      address,
      email,
      tell,
      ostatus
    }

    if (name.length === 0 || onumber.length === 0 || address.length === 0 || email.length === 0 || tell.length === 0) {
      setError(true);
      return;
    }

    axios.post("http://localhost:4000/order/add", newOrder)
      .then(() => {
        alert("Order Added")
        setName("");
        setONumber("");
        setAddress("");
        setEmail("");
        setTell("");
        setOStatus("");

        navigate('/')

      })
      .catch((err) => {
        alert("Failed to place the order and send email: " + err);
      })
  }

  const handleDecrement001 = () => {
    if (quantity001 > 1) {
      setQuantity001(prevCount => prevCount - 1);
    }
  }

  const handleIncrement001 = () => {
    if (quantity001 < 5) {
      setQuantity001(prevCount => prevCount + 1);
    }
  }

  return (
    <div className="order-container">
      

      <div className="order-card">
        <div className="order-card-header">
          <ul className="order-nav">
            <li className="order-nav-item">
              <Link to="/online" className="order-nav-link active">Online Pay</Link>
            </li>
            <li className="order-nav-item">
              <Link to="/cashon" className={`order-nav-link ${isPaymentSuccessful ? 'disabled' : ''}`} onClick={(e) => {
                if (isPaymentSuccessful) e.preventDefault();
              }}>Cash on Delivery</Link>
            </li>
          </ul>
        </div>

        <div className="order-card-body"  >
          <h1 className="order-card-title text-danger"><b>PLACE YOUR ORDER</b></h1>
          <form className="order-form" >
            <div className="order-form-row">
              <div className="order-form-col">
                <label htmlFor="validationServer01" className="order-label"><b>Name:</b></label>
                <input type="name" className={`form-control ${error && name.length === 0 ? "is-invalid" : ""}`} id="validationServer01"
                  onChange={(e) => { setName(e.target.value); }} required />
                {error && name.length === 0 && <div className="invalid-feedback">Name can't be empty!</div>}
              </div>
              <div className="order-form-col">
                <label htmlFor="validationServer01" className="order-label"><b>Order Number:</b></label>
                <select className={`form-select ${error && onumber.length === 0 ? "is-invalid" : ""}`} id="validationServer01" aria-label="Default select example" min={0} disabled={!isPaymentSuccessful}
                  onChange={(e) => { setONumber(e.target.value); }} required>
                  <option value=""></option>
                  <option value={inonumber}>{inonumber}</option>
                </select>
                {error && onumber.length === 0 && <div className="invalid-feedback">Order Number can't be empty!</div>}
              </div>
              <div className="order-form-col">
                <label htmlFor="inputCity" className="order-label"><b>Address:</b></label>
                <input type="text" className={`form-control ${error && address.length === 0 ? "is-invalid" : ""}`} id="inputCity" disabled={!isPaymentSuccessful}
                  onChange={(e) => { setAddress(e.target.value); }} required />
                {error && address.length === 0 && <div className="invalid-feedback">Address can't be empty!</div>}
              </div>
              <div className="order-form-col">
                <label htmlFor="inputAddress" className="order-label"><b>Email:</b></label>
                <input type="email" className={`form-control ${error && email.length === 0 ? "is-invalid" : ""}`} id="inputAddress" placeholder="" disabled={!isPaymentSuccessful}
                  onChange={(e) => { setEmail(e.target.value); }} required />
                {error && email.length === 0 && <div className="invalid-feedback">Email can't be empty!</div>}
              </div>
              <div className="order-form-col">
                <label htmlFor="inputPassword4" className="order-label"><b>Contact Number:</b></label>
                <input type="number" className={`form-control ${error && tell.length === 0 ? "is-invalid" : ""}`} id="inputPassword4" min={0} disabled={!isPaymentSuccessful}
                  onChange={(e) => { setTell(e.target.value = e.target.value.slice(0, 10)); }} required />
                {error && tell.length === 0 && <div className="invalid-feedback">Contact Number can't be empty!</div>}
              </div>
            </div>
            <div className="order-form-row">
              <div className="order-form-col">
                <div className="form-check" >
                  <input className="form-check-input" type="checkbox" value="Placed (Online)" id="flexCheckDefault" disabled={!isPaymentSuccessful} onChange={(e) => { setOStatus(e.target.value); }} required />
                  <label className="form-check-label order-label" htmlFor="flexCheckDefault">Confirm Order Details</label>
                  {error && ostatus.length === 0 && <div className="invalid-feedback">Check!</div>}
                </div>
              </div>
            </div>

            <div className="order-form-row">
              <div className="card-body">
                {!isPaymentSuccessful && (
                  <div className="alert alert-info" role="alert">
                    Please complete the payment to enable the order placement.
                  </div>
                )}

                {!isPaymentSuccessful ? (
                  <StripeCheckout
                    stripeKey="pk_test_51NqHFfB36akorYVlnotIxHpXeJGdciivz5tI9LnRpfL5jSXa84tvJltytpXF2bgLRrPFyvOjuo1e5yFaa8nSrOcG00t8mGBxVM"
                    token={handleToken}
                    currency="lkr"
                    amount={100 * 100}  // Amount should be in cents
                    name="Product Test"
                    billingAddress
                    shippingAddress
                  />
                ) : (
                  <div className="alert alert-success" role="alert">
                    Payment successful! You can now place your order.
                  </div>
                )}
              </div>
            </div>

            <div className="order-form-row">
              <button type="submit" className="btn btn-danger order-btn" onClick={sendData} disabled={!isPaymentSuccessful}>PLACE ORDER</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
