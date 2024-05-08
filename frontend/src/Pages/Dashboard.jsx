import React from 'react';
import { Link } from 'react-router-dom';
import './CSS/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard">
        <Link to="/productmanagement" className="card product">
          <div className="card-content">
            <h2>Product Management</h2>
            <p>Manage your products efficiently</p>
          </div>
        </Link>
        <Link to="/ordermanagement" className="card order">
          <div className="card-content">
            <h2>Order Management</h2>
            <p>Manage orders and track shipments</p>
          </div>
        </Link>
        <Link to="/projectmanagement" className="card project">
          <div className="card-content">
            <h2>Project Portfolio Management</h2>
            <p>Organize and track your projects</p>
          </div>
        </Link>
        <Link to="/employeemanagement" className="card employee">
          <div className="card-content">
            <h2>Employee & Financial Management</h2>
            <p>Manage your employees and finances</p>
          </div>
        </Link>
        <Link to="/usermanagement" className="card user">
          <div className="card-content">
            <h2>User Profile Management</h2>
            <p>Manage user profiles and permissions</p>
          </div>
        </Link>
        <Link to="/feedbackmanagement" className="card feedback">
          <div className="card-content">
            <h2>Feedback & Complaint Management</h2>
            <p>Handle user feedback and complaints</p>
          </div>
        </Link>
        <Link to="/branchmanagement" className="card branch">
          <div className="card-content">
            <h2>Branch & Service Appointment Management</h2>
            <p>Manage branches and service appointments</p>
          </div>
        </Link>
        <Link to="/suppliermanagement" className="card supplier">
          <div className="card-content">
            <h2>Supplier Management</h2>
            <p>Manage your suppliers and orders</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
