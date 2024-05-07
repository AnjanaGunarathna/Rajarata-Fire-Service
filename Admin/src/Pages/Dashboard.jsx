import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import Navbar from '../Components/AdminNavbar/Navbar';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
    <Navbar/>
      <div className="dashboard">
        <Link to="/productmanagement" className="card">
          <h2>Product Management</h2>
        </Link>
        <Link to="/ordermanagement" className="card">
          <h2>Order Management</h2>
        </Link>
        <Link to="/projectmanagement" className="card">
          <h2>Project Portfolio Management</h2>
        </Link>
        <Link to="/employeemanagement" className="card">
          <h2>Employee & Financial Management</h2>
        </Link>
        <Link to="/usermanagement" className="card">
          <h2>User Profile Management</h2>
        </Link>
        <Link to="/feedbackmanagement" className="card">
          <h2>Feedback & Complaint Management</h2>
        </Link>
        <Link to="/banchmanagement" className="card">
          <h2>Branch & Service Appointment Management</h2>
        </Link>
        <Link to="/suppliermanagement" className="card">
          <h2>Supplier Management</h2>
        </Link>
       
      </div>
    
    </div>
  );
};

export default Dashboard;
