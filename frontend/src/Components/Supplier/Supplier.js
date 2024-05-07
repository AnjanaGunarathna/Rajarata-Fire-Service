import React, { useEffect, useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { adddata, updatedata, deldata } from "../../Context/ContextProvider";
import './Home.css';
import AdminFooter from '../AdminFooter/Footer'
import Navbar from "./Navbar/Navbar";

const Supplier = () => {
  const [getuserdata, setUserdata] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { udata, setUdata } = useContext(adddata);
  const { updata, setUpdata } = useContext(updatedata);
  const { dltdata, setDLTdata } = useContext(deldata);
  
  const navigate = useNavigate();
  
  const getdata = async () => {
    try {
      const res = await fetch("http://localhost:4000/supplierdetails/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (res.status === 404 || !data) {
        console.log("error");
      } else {
        setUserdata(data);
        console.log("get data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const deleteuser = async (id) => {
    try {
      const res2 = await fetch(`http://localhost:4000/supplierdetails/deleteuser/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const deleteuser = await res2.json();
      console.log(deleteuser);

      if (res2.status === 422 || !deleteuser) {
        console.log("error");
      } else {
        console.log("user deleted");
        getdata();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const filteredData = getuserdata.filter((element) =>
    element.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar/>
    <>
      {udata && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <strong>{udata.name}</strong> added successfully!
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}

      {updata && (
  <div className="alert alert-success alert-dismissible fade show custom-alert" role="alert">
    <strong>{updata.name}</strong> updated successfully!
    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
)}
      {dltdata && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>{dltdata.name}</strong> deleted successfully!
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}

      <style>
        {`
          body, html {
            margin: 0;
            padding: 0;
          }
          ::-webkit-scrollbar {
            width: 12px;
          }
          ::-webkit-scrollbar-thumb {
            background-color: gray;
            border-radius: 6px;
          }
          ::-webkit-scrollbar-track {
            background-color: #f1f1f1;
            border-radius: 6px;
          }
        `}
      </style>

      <div className="mt-5">
        <div className="container">
          <div className="d-flex justify-content-end"> {/* Aligning the button to the right */}
            <NavLink to="/register" className="btn btn-primary">
              + Add Supplier
            </NavLink>
          </div>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by Supplier Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <br /><br />
          <table className="table">
            <thead>
              <tr className="table-secondary">
                <th scope="col">Id</th>
                <th scope="col">Supplier Name</th>
                <th scope="col">Email</th>
                <th scope="col">Product </th>
                <th scope="col">Contact Number</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((element, id) => (
                <tr key={element._id} className="mb-3">
                  <th scope="row">{id + 1}</th>
                  <td>{element.name}</td>
                  <td>{element.email}</td>
                  <td>{element.type}</td>
                  <td>{element.mobile}</td>
                  <td className="d-flex justify-content-between">
                    <NavLink to={`view/${element._id}`}>
                      <button className="btn btn-success">View</button>
                    </NavLink>  
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
    <AdminFooter/>
    </div>
  );
};

export default Supplier;

