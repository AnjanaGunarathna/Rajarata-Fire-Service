import './Branchstyle.css';
import { useEffect, useState } from 'react';
import axios from "axios";
import Formtable from './Formtable';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Navbar from './Navbar/Navbar';

axios.defaults.baseURL = "http://localhost:4000/";

function Branchdashboard() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [formData, setFormData] = useState({
    Branchname: "",
    BranchId: "",
    email: "",
    mobile: "",
    location: "",
  });

  const [formDataEdit, setFormDataEdit] = useState({
    Branchname: "",
    BranchId: "",
    email: "",
    mobile: "",
    location: "",
    _id: ""
  });

  const [dataList, setDataList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate contact number
    if (!isValidContactNumber(formData.mobile)) {
      alert("Please enter a valid 10-digit contact number");
      return;
    }
    const data = await axios.post("/api/branch/create", formData);
    console.log(data);
    if (data.data.success) {
      setAddSection(false);
      alert(data.data.message);
      getFetchData();
      setFormData({
        Branchname: "",
        BranchId: "",
        email: "",
        mobile: "",
        location: ""
      });
    }
  };

  const getFetchData = async () => {
    const data = await axios.get("/api/branch/allbranch");
    console.log(data);
    if (data.data.success) {
      setDataList(data.data.data);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  const handleDelete = async (id) => {
    const data = await axios.delete("/api/branch/delete/" + id);
    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    // Validate contact number
    if (!isValidContactNumber(formDataEdit.mobile)) {
      alert("Please enter a valid 10-digit contact number");
      return;
    }
    const data = await axios.put("/api/branch/update", formDataEdit);
    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
      setEditSection(false);
    }
  };

  const handleEditOnChange = async (e) => {
    const { value, name } = e.target;
    setFormDataEdit((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const handleEdit = (el) => {
    setFormDataEdit(el);
    setEditSection(true);
  };

  const filteredDataList = dataList.filter(branch =>
    branch.Branchname.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
  
    // Add space between copyright text and table
    const tableStartY = 40; // Adjust as needed based on the space required
    // Add table data
    const tableData = [];
    filteredDataList.forEach(branch => {
      tableData.push([branch.Branchname, branch.BranchId, branch.email, branch.mobile, branch.location]);
    });
    doc.autoTable({
      startY: tableStartY, // Start table after header
      head: [['Branch Name', 'Branch ID', 'Email', 'Mobile', 'Location']],
      body: tableData
    });
    doc.save("branch_details_report.pdf");
  };

  const isValidContactNumber = (contactNumber) => {
    // Check if contactNumber is a 10-digit number
    const isValid = /^\d{10}$/.test(contactNumber);
    return isValid;
  };

  return (
    <div>
        <Navbar/>
    
    <div className="brcontainer">
      <div className="brheader">
        <h1>Branch Management System</h1>
        <div className="bractions">
          <button className="brbtn brbtn-add" onClick={() => setAddSection(true)}>New Branch</button>
          <button className="brbtn" onClick={generateReport}>Generate Report</button>
        </div>
      </div>
      <div className="brsearch">
        <input
          type="text"
          placeholder="Search by branch name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
      <div className='brtableContainer'>
        <table>
          <thead>
            <tr>
              <th>Branch Name</th>
              <th>Branch ID</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDataList.length > 0 ? (
              filteredDataList.map((el) => (
                <tr key={el._id}>
                  <td>{el.Branchname}</td>
                  <td>{el.BranchId}</td>
                  <td>{el.email}</td>
                  <td>{el.mobile}</td>
                  <td>{el.location}</td>
                  <td>
                    <button className='brbtn brbtn-edit' onClick={() => handleEdit(el)}>Edit</button>
                    <button className='brbtn brbtn-delete' onClick={() => handleDelete(el._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>No Data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}

export default Branchdashboard;


