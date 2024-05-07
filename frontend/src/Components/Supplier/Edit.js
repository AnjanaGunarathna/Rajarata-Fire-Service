import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updatedata } from "../../Context/ContextProvider"
import './Home.css';
import Navbar from "./Navbar/Navbar"
import AdminFooter from "../AdminFooter/Footer"

const Edit = () => {
  const {updata ,setUPdata} = useContext(updatedata)

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

  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const { id } = useParams("");
  console.log(id);

  const getdata = async () => {
    const res = await fetch(`http://localhost:4000/supplierdetails/getuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setINP(data);
      console.log("get data");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const updateuser = async (e) => {
    e.preventDefault();
  
    const { name, email, company, add, mobile, desc, type } = inpval;
  
    // Email Validation
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address");
      return;
    }
  
    // Mobile Number Validation
    if (!/^\d{9}$/.test(mobile)) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }
  
    // Check if any field is empty
    if (!name || !email || !company || !add || !mobile || !desc || !type) {
      alert("Please fill in all fields");
      return;
    }
  
    // Proceed with updating data
    const res2 = await fetch(`http://localhost:4000/supplierdetails/updateuser/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        company,
        add,
        mobile,
        desc,
        type,
      }),
    });
  
    const data = await res2.json();
    console.log(data);
  
    if (res2.status === 422 || !data) {
      alert("Error updating user data");
    } else {
      navigate(`/suppliermanagement/view/${id}`); // Changed from history.push("/")
      setUPdata(data);
    }
  };

  return (
    <div>
      <Navbar/>

    
    <div className="container mt-5">
            <div className="w-40">
                <center>
                    <h1 style={{ fontWeight: 400 }}>Update Supplier Details</h1>
                </center>
                <br></br><br></br>
                <center>
        <form className="mt-4">
          <div className="row">
            <div class="mb-3 col-lg-6 col-md-6 col-12">
              <label for="exampleInputEmail1" class="form-label">
                Name
              </label>
              <input
                type="text"
                value={inpval.name}
                onChange={setdata}
                name="name"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="mb-3 col-lg-6 col-md-6 col-12">
              <label for="exampleInputPassword1" class="form-label">
                Email
              </label>
              <input
                type="email"
                value={inpval.email}
                onChange={setdata}
                name="email"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div class="mb-3 col-lg-6 col-md-6 col-12">
              <label for="exampleInputPassword1" class="form-label">
              Company
              </label>
              <input
                type="text"
                value={inpval.company}
                onChange={setdata}
                name="company"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div class="mb-3 col-lg-6 col-md-6 col-12">
              <label for="exampleInputPassword1" class="form-label">
                Mobile
              </label>
              <input
                type="number"
                value={inpval.mobile}
                onChange={setdata}
                name="mobile"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div class="mb-3 col-lg-6 col-md-6 col-12">
              <label for="exampleInputPassword1" class="form-label">
                Product Type
              </label>
              <input
                type="text"
                value={inpval.type}
                onChange={setdata}
                name="type"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div class="mb-3 col-lg-6 col-md-6 col-12">
              <label for="exampleInputPassword1" class="form-label">
                Address
              </label>
              <input
                type="text"
                value={inpval.add}
                onChange={setdata}
                name="add"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div class="mb-3 col-lg-12 col-md-12 col-12">
              <label for="exampleInputPassword1" class="form-label">
                Description
              </label>
              <textarea
                name="desc"
                value={inpval.desc}
                onChange={setdata}
                className="form-control"
                id=""
                cols="30"
                rows="5"
              ></textarea>
            </div>

            <button type="submit" onClick={updateuser} class="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
        </center>
      </div>
    </div>
      <AdminFooter/>
    </div>
  );
};

export default Edit;
