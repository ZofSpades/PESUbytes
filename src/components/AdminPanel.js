import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';

const AdminPanel = () => {
  const [cafeteriaMenus, setCafeteriaMenus] = useState({});
  const navigate = useNavigate();

  const cafeteriaNames = {
    pixel: "Pixel",
    c41: "MB-4th floor-1",
    c42: "MB-4th floor-2",
    c5: "MB-5th floor",
    vak: "Vakula"
  };

  useEffect(() => {
    // Check if admin is logged in
    if (localStorage.getItem('isAdmin') !== 'true') {
      window.location.href = 'admin-login.html';
    } else {
      fetchItems();
    }
  }, []);

  const fetchItems = async () => {
    const response = await fetch('http://localhost:5000/items');
    const data = await response.json();
    setCafeteriaMenus(data);
  };

  const handleAddItem = async (event) => {
    event.preventDefault();
    const cafeteria = event.target.cafeteria.value;
    const itemName = event.target['item-name'].value;
    const itemDescription = event.target['item-description'].value;
    const itemPrice = event.target['item-price'].value;

    const newItem = {
      name: itemName,
      description: itemDescription,
      price: parseInt(itemPrice)
    };

    const response = await fetch('http://localhost:5000/add-item', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cafeteria, ...newItem }),
    });
    const data = await response.json();
    if (data.success) {
      fetchItems(); // Refresh the items list
      event.target.reset(); // Clear the form
    }
  };

  const deleteItem = async (cafe, itemId) => {
    const response = await fetch(`http://localhost:5000/delete-item/${itemId}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    if (data.success) {
      fetchItems(); // Refresh the items list
    }
  };

  const displayMenuItems = () => {
    return Object.keys(cafeteriaMenus).map(cafe => (
      <div key={cafe}>
        <h2>{cafeteriaNames[cafe]}</h2>
        {cafeteriaMenus[cafe].map(item => (
          <div key={item._id} className="food-item">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Price: ₹{item.price}</p>
            <button onClick={() => deleteItem(cafe, item._id)}>Delete</button>
          </div>
        ))}
      </div>
    ));
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  const handleOrdersClick = () => {
    navigate('/orders');
  };

  return (
    <div>
      <header>
        <div className="logo">Admin Panel</div>
        <div className="user-controls">
          <button id="orders-btn" onClick={handleOrdersClick}>Orders</button>
          <button id="logout-btn" onClick={handleLogout}>Log Out</button>
        </div>
      </header>

      <main>
        <h1>Manage Menu Items</h1>
        <div className="form-container">
          <h2>Add New Item</h2>
          <form id="add-item-form" onSubmit={handleAddItem}>
            <div className="form-group">
              <label htmlFor="cafeteria">Cafeteria:</label>
              <select id="cafeteria" name="cafeteria" required>
                <option value="pixel">Pixel</option>
                <option value="c41">MB-4th floor-1</option>
                <option value="c42">MB-4th floor-2</option>
                <option value="c5">MB-5th floor</option>
                <option value="vak">Vakula</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="item-name">Item Name:</label>
              <input type="text" id="item-name" name="item-name" required />
            </div>
            <div className="form-group">
              <label htmlFor="item-description">Description:</label>
              <input type="text" id="item-description" name="item-description" required />
            </div>
            <div className="form-group">
              <label htmlFor="item-price">Price:</label>
              <input type="number" id="item-price" name="item-price" required />
            </div>
            <button type="submit">Add Item</button>
          </form>
        </div>

        <div className="menu-container">
          <h2>Existing Menu Items</h2>
          <div id="menu-items">
            {displayMenuItems()}
          </div>
        </div>
      </main>

      <footer>
        <p>PESU Cafeteria &copy; 2024 | <a href="https://www.pesuacademy.com/Academy/s/studentProfilePESU">Contact Us</a> | <a href="/faqs">FAQs</a></p>
      </footer>
    </div>
  );
};

export default AdminPanel;