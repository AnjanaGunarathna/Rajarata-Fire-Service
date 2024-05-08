import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adddata } from "../../Context/ContextProvider";
import "./Home.css";
import Navbar from "./Navbar/Navbar";
import Adminfooter from "./Footer/Footer"

const Register = () => {
    const { udata, setUdata } = useContext(adddata);
    const navigate = useNavigate(); // Replaced useHistory with useNavigate

    const [inpval, setINP] = useState({
        name: "",
        email: "",
        company: "",
        mobile: "",
        type: "",
        add: "",
        desc: "",
    });
    const [errors, setErrors] = useState({});

    const setdata = (e) => {
        const { name, value } = e.target;
        setINP((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear previous errors for the field being interacted with
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateMobile = (mobile) => {
        return mobile.length === 10;
    };

    const validateField = (name, value) => {
        switch (name) {
            case "email":
                if (!validateEmail(value)) {
                    return "Please enter a valid email address";
                }
                break;
            case "mobile":
                if (!validateMobile(value)) {
                    return "Please enter a valid 10-digit mobile number";
                }
                break;
            default:
                if (!value.trim()) {
                    return "Please fill in all fields";
                }
                break;
        }
        return ""; // No error message if validation passes
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        const errorMessage = validateField(name, value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMessage,
        }));
    };

    const addinpdata = async (e) => {
        e.preventDefault();
        const { name, email, company, add, mobile, desc, type } = inpval;
    
        // Validate inputs
        const newErrors = {};
        for (const key in inpval) {
            const errorMessage = validateField(key, inpval[key]);
            if (errorMessage) {
                newErrors[key] = errorMessage;
            }
        }
    
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
    
        // Proceed with form submission
        const res = await fetch("http://localhost:4000/supplierdetails/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                company,
                type,
                mobile,
                add,
                desc,
            }),
        });
    
        const data = await res.json();
    
        if (res.status === 404 || !data) {
            alert("Error");
            console.log("error");
        } else {
            alert("Data added");
            navigate("/suppliermanagement"); // Changed from history.push("/")
            setUdata(data);
            console.log("Data added");
    
            // Send email through API endpoint
            fetch("http://localhost:4000/supplierdetails/router", { // Change to your server URL
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    to_email: email,
                    message: `Dear ${name},

                    We are delighted to inform you that your registration as a supplier with Rajarata Fire Service has been successfully processed. Welcome aboard!
                    Your contribution as a supplier plays a crucial role in our mission to deliver high-quality products and services to our clients. We look forward to a fruitful and collaborative partnership ahead.
                    Should you have any questions or require further assistance, please do not hesitate to contact us. Thank you for choosing Rajarata Fire Service.
                    
                    Best regards,
                    

                    Rajarata Fire Service
                    0702510900`,
                        }),
            })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error("Error sending email:", error));
        }
    };
    
    return (
        <div>
        <Navbar/>
        <div className="container mt-5">
            <div className="w-40">
                <center>
                    <h1 style={{ fontWeight: 400 }}>Supplier Registration</h1>
                </center>
                <br></br>
                <br></br>
                <center>
                    <form>
                        <div className="row">
                            <div className="mb-3 col-lg-6 col-md-6 col-12">
                                <label htmlFor="exampleInputEmail1" className="form-label">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={inpval.name}
                                    onChange={setdata}
                                    onBlur={handleBlur}
                                    name="name"
                                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                    id="Supplier.email"
                                    aria-describedby="emailHelp"
                                />
                                {errors.name && <p className="error-message">{errors.name}</p>}
                            </div>
                            <div className="mb-3 col-lg-6 col-md-6 col-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={inpval.email}
                                    onChange={setdata}
                                    onBlur={handleBlur}
                                    name="email"
                                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                    id="exampleInputPassword1"
                                />
                                {errors.email && (
                                    <p className="error-message">{errors.email}</p>
                                )}
                            </div>
                            <div className="mb-3 col-lg-6 col-md-6 col-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">
                                    Company
                                </label>
                                <input
                                    type="text"
                                    value={inpval.company}
                                    onChange={setdata}
                                    onBlur={handleBlur}
                                    name="company"
                                    className={`form-control ${errors.company ? "is-invalid" : ""
                                        }`}
                                    id="exampleInputPassword1"
                                />
                                {errors.company && (
                                    <p className="error-message">{errors.company}</p>
                                )}
                            </div>
                            <div className="mb-3 col-lg-6 col-md-6 col-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">
                                    Mobile
                                </label>
                                <input
                                    type="number"
                                    value={inpval.mobile}
                                    onChange={setdata}
                                    onBlur={handleBlur}
                                    name="mobile"
                                    className={`form-control ${errors.mobile ? "is-invalid" : ""
                                        }`}
                                    id="exampleInputPassword1"
                                />
                                {errors.mobile && (
                                    <p className="error-message">{errors.mobile}</p>
                                )}
                            </div>
                            <div className="mb-3 col-lg-6 col-md-6 col-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">
                                    Product Type
                                </label>
                                <input
                                    type="text"
                                    value={inpval.type}
                                    onChange={setdata}
                                    onBlur={handleBlur}
                                    name="type"
                                    className={`form-control ${errors.type ? "is-invalid" : ""}`}
                                    id="exampleInputPassword1"
                                />
                                {errors.type && <p className="error-message">{errors.type}</p>}
                            </div>
                            <div className="mb-3 col-lg-6 col-md-6 col-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    value={inpval.add}
                                    onChange={setdata}
                                    onBlur={handleBlur}
                                    name="add"
                                    className={`form-control ${errors.add ? "is-invalid" : ""}`}
                                    id="exampleInputPassword1"
                                />
                                {errors.add && <p className="error-message">{errors.add}</p>}
                            </div>
                            <div className="mb-3 col-lg-12 col-md-12 col-12">
                                <label htmlFor="exampleInputPassword1" className="form-label">
                                    Description
                                </label>
                                <textarea
                                    name="desc"
                                    value={inpval.desc}
                                    onChange={setdata}
                                    className={`form-control ${errors.desc ? "is-invalid" : ""}`}
                                    id=""
                                    cols="30"
                                    rows="5"
                                ></textarea>
                                {errors.desc && <p className="error-message">{errors.desc}</p>}
                            </div>
                            <button
                                type="submit"
                                onClick={addinpdata}
                                className="btn btn-success custom-small"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </center>
            </div>
        </div>
        <Adminfooter/>
        </div>
    );
};

export default Register;

