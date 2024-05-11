import { useParams, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import './Updateorder.css'; // Import CSS file

export default function UpdateOrder() {

  const [name, setName] = React.useState("");
  const [onumber, setONumber] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [tell, setTell] = React.useState("");
  const [ostatus, setOStatus] = React.useState("");
  const [error, setError] = useState("false")
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getOrderDetails();
  }, [])

  const getOrderDetails = async () => {
    console.warn(params)
    let result = await fetch(`http://localhost:4000/order/get/${params.id}`);
    result = await result.json();
    setName(result.name);
    setONumber(result.onumber);
    setAddress(result.address);
    setEmail(result.email);
    setTell(result.tell);
    setOStatus(result.ostatus);
  }

  const UpdateOrder = async () => {
    console.warn(name, onumber, address, email, tell, ostatus)
    let result = await fetch(`http://localhost:4000/order/update/${params.id}`, {
      method: 'put',
      body: JSON.stringify({ name, onumber, address, email, tell, ostatus }),
      headers: {
        'Content-Type': 'Application/json'
      }
    });
    result = await result.json()
    if (result) {
      alert("Update Successfully")
    }
    navigate('/allorder');
  }

  return (
    <div className="order-container">
      <br />
      <br />
      <div className="container">
        <div className="card text-dark mb-3 order-update-order-card">
          <div className="card-body">
            <br />
            <br />
            <form className="row g-3 was-validated">
              <div className="col-md-6">
                <label htmlFor="validationServer01" className="form-label order-form-label"><b>Name:</b></label>
                <input type="name" className="form-control order-input" id="validationServer01" value={name} disabled
                  onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputPassword4" className="form-label order-form-label"><b>Order Number:</b></label>
                <input type="tel" className="form-control order-input" id="inputPassword4" value={onumber} disabled
                  onChange={(e) => setONumber(e.target.value = e.target.value.slice(0, 12))} required />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputAddress" className="form-label order-form-label"><b>Address:</b></label>
                <input type="email" className="form-control order-input" id="inputAddress" placeholder="" value={address} disabled
                  onChange={(e) => setAddress(e.target.value)} required />
              </div>
              <div className="col-md-6">
                <label htmlFor="validationServer01" className="form-label order-form-label"><b>Status:</b></label>
                <select className="form-select order-select order-is-invalid" id="validationServer01" aria-label="Default select example"
                  onChange={(e) => setOStatus(e.target.value)} required>
                  <option value="Placed">Placed</option>
                  <option value="Order Processing...">Order Processing...</option>
                  <option value="Order Confirmed...">Order Confirmed...</option>
                  <option value="On The Way...">On The Way...</option>
                  <option value="Out For Delivery...">Out For Delivery...</option>
                  <option value="Delivered...">Delivered...</option>
                </select>
                <div className="order-invalid-feedback">
                  {error && ostatus.length <= 0 ? <label className="text-danger">Status can't be empty!</label> : ""}
                </div>
              </div>

              <div className="order-update-btn-container">
                <br />
                <button type="button" className="btn order-btn-danger" onClick={UpdateOrder}>UPDATE STATUS</button>
                <br />
                <br />
                <Link to='/allorder' className="order-link">Back to All Orders</Link>
              </div>
            </form>
            <br />
          </div>
        </div>
        <br />
        <br />
      </div>
    </div>
  )
}
