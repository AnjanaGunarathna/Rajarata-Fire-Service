import React, { useEffect, useState } from 'react';
import './Employee.css';
import axios from "axios";
import Formtable from './Formtable';
import Navbar from './Navbar/Navbar';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = "http://localhost:4000/";

function Employeedashboard() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: "",
    name: "",
    contactNo: "",
    email: "",
    highestTraining: "",
    appointmentDate: "",
  });
  const [formDataEdit, setFormDataEdit] = useState({
    employeeId: "",
    name: "",
    contactNo: "",
    email: "",
    highestTraining: "",
    appointmentDate: "",
    _id: ""
  });
  const [dataList, setDataList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  const validateForm = () => {
    if (!formData.employeeId || !formData.contactNo) {
      toast.error('Employee ID and Contact number are required');
      return false;
    }
    if (!/^\d{10}$/.test(formData.contactNo)) {
      toast.error('Contact number must be 10 digits');
      return false;
    }
    return true;
  };

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post("/api/employee/create", formData);
    if (data.data.success) {
      setAddSection(false);
      alert(data.data.message);
      getFetchData();
      setFormData({
        employeeId: "",
        name: "",
        contactNo: "",
        email: "",
        highestTraining: "",
        appointmentDate: ""
      });
    }
  };

  const getFetchData = async () => {
    const data = await axios.get("/api/employee/empall");
    if (data.data.success) {
      setDataList(data.data.data);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  const handleDelete = async (id) => {
    const data = await axios.delete("/api/employee/delete/" + id);
    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = await axios.put(`/api/employee/update/${formDataEdit._id}`, formDataEdit);
    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
      setEditSection(false);
    }
  };

  const handleEditOnChange = async (e) => {
    const { value, name } = e.target;
    setFormDataEdit(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = (el) => {
    setFormDataEdit(el);
    setEditSection(true);
  };
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredDataList = dataList.filter((item) =>
    item.employeeId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sendEmail = async (email) => {
    try {
      const response = await axios.post('http://localhost:4000/send-email', {
        recipientEmail: email,
        subject: 'Subject of the email',
        body: 'Body of the email'
      });
      alert('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending email');
    }
  };

  return (
   
    <>
     <Navbar/>
      <div className="emp-container">
        <div className="emp-search-container">
          <input
            className="emp-search-input"
            type="text"
            placeholder="Search by ID..."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <button className="emp-btn emp-btn-add" onClick={() => setAddSection(true)}>Add Employee</button>
          <button className="emp-btn emp-btn-salary" ><Link to="/salarymanage" style={{ color: 'black', textDecoration: 'none' }}>Salary Details</Link></button>
        </div>
        {addSection && (
          <Formtable
            handleSubmit={handleSubmit}
            handleOnChange={handleOnChange}
            handleclose={() => setAddSection(false)}
            rest={formData}
          />
        )}
        {editSection && (
          <Formtable
            handleSubmit={handleUpdate}
            handleOnChange={handleEditOnChange}
            handleclose={() => setEditSection(false)}
            rest={formDataEdit}
          />
        )}
        <div className='emp-table-container'>
          <table>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Contact No</th>
                <th>Email</th>
                <th>Highest Training</th>
                <th>Appointment Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDataList.length > 0 ? (
                filteredDataList.map((el) => (
                  <tr key={el._id}>
                    <td>{el.employeeId}</td>
                    <td>{el.name}</td>
                    <td>{el.contactNo}</td>
                    <td>{el.email}</td>
                    <td>{el.highestTraining}</td>
                    <td>{el.appointmentDate}</td>
                    <td>
                      <button className='emp-btn emp-btn-edit' onClick={() => handleEdit(el)}>Edit</button>
                      <button className='emp-btn emp-btn-delete' onClick={() => handleDelete(el._id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>No Data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Employeedashboard;
