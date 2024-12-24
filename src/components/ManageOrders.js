import React, { useState, useEffect } from 'react';
import './ManageOrders.css';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const response = await fetch('http://localhost:5000/orders');
    const data = await response.json();
    setOrders(data);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    window.location.href = '/';
  };

  const handleMenuItems = () => {
    window.location.href = '/panel';
  };

  const handleTakenAway = async (orderId) => {
    const response = await fetch(`http://localhost:5000/orders/${orderId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setOrders(orders.filter(order => order._id !== orderId));
    } else {
      alert('Failed to delete the order. Please try again.');
    }
  };

  return (
    <div>
      <header>
        <div className="logo">Manage Orders</div>
        <div className="user-controls">
          <button id="menu-items-btn" onClick={handleMenuItems}>Menu Items</button>
          <button id="logout-btn" onClick={handleLogout}>Log Out</button>
        </div>
      </header>

      <main>
        <h1>Order List</h1>
        <div className="order-container">
          {orders.length === 0 ? (
            <p>No orders yet.</p>
          ) : (
            orders.map(order => (
              <div key={order._id} className="order-item">
                <h3>Token Number: {order.tokenNumber}</h3>
                <p>Customer: {order.userName}</p>
                <p>Items: {order.items.map(item => (
                  <span key={item._id}>
                    {item.name} - ₹{item.price}<br />
                  </span>
                ))}</p>
                <p>Total Price: ₹{order.totalPrice}</p>
                <button onClick={() => handleTakenAway(order._id)}>Taken Away</button>
              </div>
            ))
          )}
        </div>
      </main>

      <footer>
        <p>PESU Cafeteria &copy; 2024 | <a href="https://www.pesuacademy.com/Academy/s/studentProfilePESU">Contact Us</a> | <a href="/faqs">FAQs</a></p>
      </footer>
    </div>
  );
};

export default ManageOrders;