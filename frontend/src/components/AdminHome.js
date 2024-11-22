import React from 'react';
import { Link } from 'react-router-dom';

const AdminHome = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        <li><Link to="/add">Add New Topic</Link></li>
        <li><Link to="/update">Update Existing Topic</Link></li>
      </ul>
    </div>
  );
};

export default AdminHome;
