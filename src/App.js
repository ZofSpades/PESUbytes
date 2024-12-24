import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import LoginPage from './components/LoginPage';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
import FaqsPage from './components/FaqsPage';
import ManageOrders from './components/ManageOrders';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/panel" element={<AdminPanel />} />
          <Route path="/orders" element={<ManageOrders />} />
          <Route path="/faqs" element={<FaqsPage />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;