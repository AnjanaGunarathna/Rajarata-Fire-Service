import React, { useEffect, useState } from 'react';
import axios from "axios";
import Formtable from './Formtable';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './Userstyle.css'
import Navbar from './Navbar/Navbar';

axios.defaults.baseURL = "http://localhost:4000/";

function App() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contactNumber: "",
    address: ""
  });
  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    email: "",
    password: "",
    contactNumber: "",
    address: "",
    _id: ""
  });
  const [dataList, setDataList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateMobile(formData.contactNumber)) {
      alert("Contact number must be a 10-digit number");
      return;
    }
    const data = await axios.post("/webuser/create", formData);
    console.log(data);
    if (data.data.success) {
      setAddSection(false);
      alert("User created successfully");
      getFetchData();
      setFormData({
        name: "",
        email: "",
        password: "",
        contactNumber: "",
        address: ""
      });
    }
  };

  const validateMobile = (mobile) => {
    return /^\d{10}$/.test(mobile);
  };

  const getFetchData = async () => {
    const data = await axios.get("/webuser/alluser");
    console.log(data);
    if (data.data.success) {
      setDataList(data.data.data);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  const handleDelete = async (id) => {
    const data = await axios.delete("/webuser/delete/" + id);
    if (data.data.success) {
      getFetchData();
      alert("User deleted successfully");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateMobile(formDataEdit.contactNumber)) {
      alert("Contact number must be a 10-digit number");
      return;
    }
    const data = await axios.put("/webuser/update", formDataEdit);
    if (data.data.success) {
      getFetchData();
      alert("User updated successfully");
      setEditSection(false);
    }
  };

  const handleEditOnChange = (e) => {
    const { value, name } = e.target;
    setFormDataEdit((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = (el) => {
    setFormDataEdit(el);
    setEditSection(true);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const generateReport = () => {
    const doc = new jsPDF();
  
    // Add company name as header
    doc.setTextColor(255, 0, 0); // Set font color to red
    doc.setFontSize(20); // Set font size
    const companyName = "Rajarata Fire Service";
    const companyNameWidth = doc.getStringUnitWidth(companyName) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const pageWidth = doc.internal.pageSize.getWidth();
    const companyNameX = (pageWidth - companyNameWidth) / 2; // Calculate X position to center the company name
    doc.text(companyName, companyNameX, 10); // Add company name
  
    // Add space between company name and copyright information
    const space = " ";
    doc.setFontSize(12); // Set font size
    const spaceWidth = doc.getStringUnitWidth(space) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const spaceX = (pageWidth - spaceWidth) / 2; // Calculate X position to center the space
    doc.text(space, spaceX, 20); // Add space
  
    // Add copyright information
    const copyrightInfo = "© 2015 Rajarata Fire Service (PVT) Ltd. All rights reserved.";
    const copyrightInfoWidth = doc.getStringUnitWidth(copyrightInfo) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const copyrightInfoX = (pageWidth - copyrightInfoWidth) / 2; // Calculate X position to center the copyright information
    doc.setTextColor(0); // Set font color to default (black)
    doc.text(copyrightInfo, copyrightInfoX, 30); // Add copyright information

    // Add table
    const tableStartY = 40; // Set Y position for the start of the table
    doc.autoTable({ html: '#userTable', startY: tableStartY }); // Start table at the specified Y position
  
    // Save PDF
    doc.save('user_details_report.pdf');
  };
  

  return (
    <div>
    <Navbar/>
    <div className="use-container">
      <button className="usebtn usebtn-add" onClick={() => setAddSection(true)}>Add User</button>
      <button className="usebtn usebtn-generate" onClick={generateReport}>Generate Report</button>
      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={handleSearchChange}
        />
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
      <div className='usetableContainer'>
        <table id="userTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact No</th>
              <th>Address</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {dataList.filter(item => 
              item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.email.toLowerCase().includes(searchQuery.toLowerCase())
            ).map((el) => (
              <tr key={el._id}>
                <td>{el.name}</td>
                <td>{el.email}</td>
                <td>{el.contactNumber}</td>
                <td>{el.address}</td>
                <td> 
                  <button className='usebtn usebtn-edit' onClick={() => handleEdit(el)}>Edit</button>
                  <button className='usebtn usebtn-delete' onClick={() => handleDelete(el._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}

export default App;
