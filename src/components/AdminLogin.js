import React, { useState } from 'react';
import './AdminLogin.css';

const AdminLogin = () => {
  const [adminNumber, setAdminNumber] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ adminNumber, adminPassword }),
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('isAdmin', 'true');
        window.location.href = '/panel';
      } else {
        alert('Invalid admin number or password');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <header>
        <div className="logo">Admin Login</div>
      </header>

      <main>
        <div className="login-container">
          <h2>Admin Login</h2>
          <form id="admin-login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="admin-number">Admin Number:</label>
              <input
                type="text"
                id="admin-number"
                value={adminNumber}
                onChange={(e) => setAdminNumber(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="admin-password">Password:</label>
              <input
                type="password"
                id="admin-password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </main>

      <footer>
        <p>PESU Cafeteria &copy; 2024 | <a href="https://www.pesuacademy.com/Academy/s/studentProfilePESU">Contact Us</a> | <a href="/faqs">FAQs</a></p>
      </footer>
    </div>
  );
};

export default AdminLogin;