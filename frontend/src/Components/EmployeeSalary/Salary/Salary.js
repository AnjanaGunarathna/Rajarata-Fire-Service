import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jsPDF } from "jspdf"; //PDF
import "jspdf-autotable";  // PDF
import logo from '../../Assets/firelogo_big.png';
import Salarytable from '../Salary/Salarytable';
import '../Employee.css';
import Navbar from '../Navbar/Navbar';

axios.defaults.baseURL = 'http://localhost:4000/';

function Salary() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [formData, setFormData] = useState({
    employeeID: '',
    basicSalary: '',
    otHours: '',
    ratePerHour: '',
    netPayment: '',
  });

  const [formDataEdit, setFormDataEdit] = useState({
    employeeID: '',
    basicSalary: '',
    otHours: '',
    ratePerHour: '',
    netPayment: '',
    _id: '',
  });

  const [dataList, setDataList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post('/api/salary/create', formData);
    console.log(data);
    if (data.data.success) {
      setAddSection(false);
      alert(data.data.message);
      getFetchData();
      setFormData({
        employeeID: '',
        basicSalary: '',
        otHours: '',
        ratePerHour: '',
        netPayment: '',
      });
    }
  };

  const getFetchData = async () => {
    const data = await axios.get('/api/salary/salaryall');
    console.log(data);
    if (data.data.success) {
      setDataList(data.data.data);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  const handleDelete = async (id) => {
    const data = await axios.delete(`/api/salary/delete/${id}`);

    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = await axios.put('/api/salary/update', formDataEdit);
    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
      setEditSection(false);
    }
  };

  const handleEditOnChange = async (e) => {
    const { value, name } = e.target;
    setFormDataEdit((prev) => ({
      ...prev,
      [name]: value,
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
    item.employeeId && item.employeeId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add logo
    const logoImg = new Image();
    logoImg.src = logo;
    logoImg.onload = () => {
      const imgWidth = 20; // Adjust the width of the logo as needed
      const imgHeight = (logoImg.height * imgWidth) / logoImg.width;
      doc.addImage(logoImg, 'PNG', 10, 10, imgWidth, imgHeight);

      // Add title
      doc.setTextColor("black");
      doc.setFontSize(20);
      doc.setFont("bold");
      // doc.text("Rajarat Fire Service", 105, 10, { align: "center" });
      doc.text("Salary Report 2024", 105, 10, { align: "center" });

      // Table headers
      const headers = [
        'Employee ID',
        'Basic Salary',
        'Ot Hours',
        'Rate Per Hours',
        'Net Payment',
      ];

      // AutoTable options
      const tableOptions = {
        startY: 50, // Start position for the table
        head: [headers], // Include table headers
        styles: {
          cellPadding: 2,
          fontSize: 8,
          valign: 'middle', // vertical alignment
          halign: 'center', // horizontal alignment
          textColor: [0, 0, 0], // Text color
          fillColor: [255, 112, 112] // Fill color
        },
      };

      // Table data (user details)
      const userData = filteredDataList.map((user) => [
        user.employeeId,
        user.basicSalary,
        user.otHours,
        user.ratePerHour,
        user.netPayment,
      ]);

      // Add table data to options
      tableOptions.body = userData;

      // Add table
      doc.autoTable(tableOptions);

      // Save PDF
      doc.save("salary_report.pdf");
    };
  };

  return (
    <>
    <Navbar/>
      <div className="emp-container">
        <div className="emp-search-container">
          <input
            className="emp-search-input"
            type="text"
            placeholder="Search by Employee ID"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <button className="emp-btn emp-btn-add" onClick={() => setAddSection(true)}>
            Add Salary
          </button>
        </div>

        {addSection && (
          <Salarytable
            handleSubmit={handleSubmit}
            handleOnChange={handleOnChange}
            handleclose={() => setAddSection(false)}
            rest={formData}
          />
        )}
        {editSection && (
          <Salarytable
            handleSubmit={handleUpdate}
            handleOnChange={handleEditOnChange}
            handleclose={() => setEditSection(false)}
            rest={formDataEdit}
          />
        )}

        <div className="emp-table-container">
          <table>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Basic Salary</th>
                <th>Ot Hours</th>
                <th>Rate Per Hours</th>
                <th>Net Payment</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredDataList.length > 0 ? (
                filteredDataList.map((el) => (
                  <tr key={el._id}>
                    <td>{el.employeeId}</td>
                    <td>{el.basicSalary}</td>
                    <td>{el.otHours}</td>
                    <td>{el.ratePerHour}</td>
                    <td>{el.netPayment}</td>
                    <td>
                      <button className="emp-btn emp-btn-edit" onClick={() => handleEdit(el)}>
                        Edit
                      </button>
                      <button className="emp-btn emp-btn-delete" onClick={() => handleDelete(el._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>
                    No Data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <button className="emp-btn-generate-pdf" onClick={generatePDF}>
          Report
        </button>
      </div>
    </>
  );
}

export default Salary;
