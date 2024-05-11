import { useNavigate, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import './CashOnD.css';

export default function CashOnD() {
    const [inonumber, setInONumber] = useState("");
    const [name, setName] = useState("");
    const [onumber, setONumber] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [tell, setTell] = useState("");
    const [ostatus, setOStatus] = useState("");
    const [error, setError] = useState(false);
    const location = useLocation();
    const data = location.state;
    const navigate = useNavigate();

    useEffect(() => {
        handleOrderNumber();
    }, []);

    const handleOrderNumber = () => {
        var range = "0123456789";
        var otpVal = "";
        for (var i = 0; i < 6; i++) {
            otpVal += range[Math.floor(Math.random() * 10)];
        }
        setInONumber(otpVal);
    }

    function sendData(e) {
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
                alert("Order Added");
                setName("");
                setONumber("");
                setAddress("");
                setEmail("");
                setTell("");
                setOStatus("");
                navigate('/');
            })
            .catch((err) => {
                alert(err);
            });
    }

    return (
        <div className="order-container">
           

            <div className="order-card">
                <div className="order-card-header">
                    <ul className="order-nav">
                        <li className="order-nav-item">
                            <Link to="/online" className="order-nav-link">Online Pay</Link>
                        </li>
                        <li className="order-nav-item">
                            <Link to="/cashon" className="order-nav-link active" aria-current="true">Cash on Delivery</Link>
                        </li>
                    </ul>
                </div>

                <div className="order-card-body">
                    <h1 className="order-card-title">PLACE YOUR ORDER</h1>
                    <form className="order-form" onSubmit={sendData}>
                        <div className="order-form-row">
                            <div className="order-form-col">
                                <label htmlFor="order-name" className="order-label"><b>Name:</b></label>
                                <input
                                    type="name"
                                    id="order-name"
                                    className={`order-input ${error && name.length === 0 ? "order-input-invalid" : ""}`}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                {error && name.length === 0 && <span className="order-error">Name can't be empty!</span>}
                            </div>
                            <div className="order-form-col">
                                <label htmlFor="order-number" className="order-label"><b>Order Number:</b></label>
                                <select
                                    id="order-number"
                                    className={`order-input ${error && onumber.length === 0 ? "order-input-invalid" : ""}`}
                                    onChange={(e) => setONumber(e.target.value)}
                                    required
                                >
                                    <option value=""></option>
                                    <option value={inonumber}>{inonumber}</option>
                                </select>
                                {error && onumber.length === 0 && <span className="order-error">Order Number can't be empty!</span>}
                            </div>
                        </div>
                        <div className="order-form-row">
                            <div className="order-form-col">
                                <label htmlFor="order-address" className="order-label"><b>Address:</b></label>
                                <input
                                    type="text"
                                    id="order-address"
                                    className={`order-input ${error && address.length === 0 ? "order-input-invalid" : ""}`}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                                {error && address.length === 0 && <span className="order-error">Address can't be empty!</span>}
                            </div>
                            <div className="order-form-col">
                                <label htmlFor="order-email" className="order-label"><b>Email:</b></label>
                                <input
                                    type="email"
                                    id="order-email"
                                    className={`order-input ${error && email.length === 0 ? "order-input-invalid" : ""}`}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                {error && email.length === 0 && <span className="order-error">Email can't be empty!</span>}
                            </div>
                        </div>
                        <div className="order-form-row">
                            <div className="order-form-col">
                                <label htmlFor="order-tell" className="order-label"><b>Contact Number:</b></label>
                                <input
                                    type="number"
                                    id="order-tell"
                                    className={`order-input ${error && tell.length === 0 ? "order-input-invalid" : ""}`}
                                    onChange={(e) => setTell(e.target.value.slice(0, 10))}
                                    required
                                />
                                {error && tell.length === 0 && <span className="order-error">Contact Number can't be empty!</span>}
                            </div>
                        </div>
                        <div className="order-form-row">
                            <div className="order-form-col">
                                <div className="form-check">
                                    <input
                                        className={`form-check-input ${error && ostatus.length === 0 ? "order-input-invalid" : ""}`}
                                        type="checkbox"
                                        value="Placed (COD)"
                                        id="flexCheckDefault"
                                        onChange={(e) => setOStatus(e.target.value)}
                                        required
                                    />
                                    <label className="form-check-label order-label" htmlFor="flexCheckDefault">Confirm Order Details</label>
                                    {error && ostatus.length === 0 && <span className="order-error">Check!</span>}
                                </div>
                            </div>
                        </div>
                        <div className="order-form-row">
                            <button type="submit" className="order-btn">PLACE ORDER</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
