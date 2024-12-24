import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = () => {
  const [srn, setSrn] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName: srn, password }),
    });
    const data = await response.json();
    if (data.success) {
      localStorage.setItem('userName', data.userName);
      window.location.href = '/';
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form id="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="srn">SRN</label>
          <input
            type="text"
            id="srn"
            name="srn"
            value={srn}
            onChange={(e) => setSrn(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="login-links">
        <a href="https://www.pesuacademy.com/Academy" target="_blank" rel="noopener noreferrer">Forget Password?</a>
      </div>
    </div>
  );
};

export default LoginPage;