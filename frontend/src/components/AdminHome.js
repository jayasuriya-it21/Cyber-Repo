import React from 'react';
import { Link } from 'react-router-dom';
import './css/AdminHome.css'
const AdminHome = () => {
  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      <ul className="admin-links">
        <li><Link to="/admin/add" className="admin-link">Add New Topic</Link></li>
        <li><Link to="/admin/update" className="admin-link">Update Existing Topic</Link></li>
        <li><Link to="/admin/delete" className="admin-link">Delete Topic</Link></li>
      </ul>
    </div>
  );
};

export default AdminHome;

