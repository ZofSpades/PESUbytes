import React, { useState, useEffect, useCallback } from 'react';
import './MainPage.css';

const MainPage = () => {
  const [userName, setUserName] = useState(localStorage.getItem('userName'));
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [cart, setCart] = useState([]);
  const [cafeteriaMenus, setCafeteriaMenus] = useState({});
  const [selectedCafeteria, setSelectedCafeteria] = useState('');
  const [orders, setOrders] = useState([]);
  const [showOrders, setShowOrders] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.matches('#login-btn')) {
        setDropdownVisible(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const updateCartCount = useCallback(() => {
    const cartBtn = document.getElementById('cart-btn');
    cartBtn.textContent = `Cart (${cart.length})`;
  }, [cart]);

  useEffect(() => {
    updateCartCount();
  }, [cart, updateCartCount]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await fetch('http://localhost:5000/items');
    const data = await response.json();
    setCafeteriaMenus(data);
  };

  const fetchOrders = useCallback(async () => {
    if (!userName) return;
    const response = await fetch(`http://localhost:5000/orders?user=${userName}`);
    const data = await response.json();
    setOrders(data.filter(order => order.userName === userName));
  }, [userName]);

  useEffect(() => {
    if (showOrders) {
      fetchOrders();
    }
  }, [showOrders, fetchOrders]);

  const handleOrdersClick = () => {
    if (!userName) {
      alert('Please log in to view your orders.');
      return;
    }
    setShowOrders(!showOrders);
  };

  const handleLoginClick = () => {
    if (userName) {
      setDropdownVisible(!dropdownVisible);
    } else {
      setModalVisible(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('cart');
    localStorage.removeItem('tokenNumber');
    localStorage.removeItem('isAdmin');
    setUserName(null);
    setDropdownVisible(false);
    window.location.href = '/'; 
  };

  const handleAdminLogin = () => {
    window.location.href = 'admin';
  };

  const handleStudentLogin = () => {
    window.location.href = 'login';
  };

  const displayMenuItems = (cafe) => {
    setSelectedCafeteria(cafe);
  };

  const addToCart = (itemId) => {
    if (!userName) {
      alert('Login required to add items to cart.');
      setCart([]);
      updateCartCount();
      return;
    }

    const item = Object.values(cafeteriaMenus).flat().find(item => item._id === itemId);
    if (item) {
      const newCart = [...cart, item];
      setCart(newCart);
      alert(`${item.name} added to cart!`);
      updateCartCount();
    }
  };

  const removeFromCart = (itemId) => {
    const newCart = cart.filter(item => item._id !== itemId);
    setCart(newCart);
  };

  const generateUniqueTokenNumber = async () => {
    let tokenNumber;
    let isUnique = false;

    while (!isUnique) {
      tokenNumber = Math.floor(Math.random() * 1000000);
      const response = await fetch(`http://localhost:5000/orders?tokenNumber=${tokenNumber}`);
      const data = await response.json();
      if (data.length === 0) {
        isUnique = true;
      }
    }

    return tokenNumber;
  };

  const proceedToPayment = async () => {
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    
    if (totalPrice === 0) {
      alert('Add items to cart before proceeding to payment.');
      return;
    }

    const tokenNumber = await generateUniqueTokenNumber();
    alert(`Payment Successful! Your token number is ${tokenNumber}.`);

    // Send order to the backend
    const response = await fetch('http://localhost:5000/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tokenNumber,
        userName,
        items: cart,
        totalPrice,
      }),
    });

    if (response.ok) {
      setCart([]);
      updateCartCount();
      localStorage.setItem('tokenNumber', tokenNumber);
    } else {
      alert('Failed to save the order. Please try again.');
    }
  };

  const openCartPage = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    if (!userName) {
      alert('Please log in as a student to view your cart.');
      return;
    }

    let cartItems = cart.map(item => `${item.name} - ₹${item.price}`).join('\n');
    let totalPrice = cart.reduce((total, item) => total + item.price, 0);
    alert(`Your Cart:\n\n${cartItems}\n\nTotal: ₹${totalPrice}`);
  };

  return (
    <div>
      <header>
        <div className="logo">PESUbytes</div>
        <div className="user-controls">
          <button id="cart-btn" onClick={openCartPage}>Cart (0)</button>
          <button id="orders-btn" onClick={handleOrdersClick}>Orders</button>
          <div className="dropdown">
            <button id="login-btn" onClick={handleLoginClick}>
              {userName || 'Login'}
            </button>
            {dropdownVisible && (
              <div id="dropdown-content" className="dropdown-content">
                <button id="logout-btn" onClick={handleLogout}>Log Out</button>
              </div>
            )}
          </div>
        </div>
      </header>

      {showOrders && (
        <div id="orders-list">
          <h2>Your Orders</h2>
          {orders.length === 0 ? (
            <p>No orders</p>
          ) : (
            <ul>
              {orders.map(order => (
                <li key={order.tokenNumber}>
                  <p>Token Number: {order.tokenNumber}</p>
                  <p>Items:</p>
                  <ul>
                    {order.items.map(item => (
                      <li key={item._id}>{item.name} - ₹{item.price}</li>
                    ))}
                  </ul>
                  <p>Total Price: ₹{order.totalPrice}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <body>
        <div className="filter">
          <select className="cafe" onChange={(e) => displayMenuItems(e.target.value)}>
            <option value="">Select Cafeteria</option>
            <option value="pixel">Pixel</option>
            <option value="c41">MB-4th floor-1</option>
            <option value="c42">MB-4th floor-2</option>
            <option value="c5">MB-5th floor</option>
            <option value="vak">Vakula</option>
          </select>
        </div>

        <div id="menu-items" className="menu">
          {selectedCafeteria && cafeteriaMenus[selectedCafeteria]?.map(item => (
            <div key={item._id} className="food-item">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Price: ₹{item.price}</p>
              <button onClick={() => addToCart(item._id)}>Add to Cart</button>
            </div>
          ))}
        </div>

        <div id="cart-items" className="cart">
          {cart.length === 0 ? (
            <p id="empty">Your cart is empty.</p>
          ) : (
            cart.map(item => (
              <div key={item._id} className="cart-item">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>Price: ₹{item.price}</p>
                <button onClick={() => removeFromCart(item._id)}>Remove</button>
              </div>
            ))
          )}
          <div className="total">
            <h3>Total: ₹{cart.reduce((total, item) => total + item.price, 0)}</h3>
            <button onClick={proceedToPayment}>Proceed to Payment</button>
          </div>
        </div>
      </body>

      <footer>
        <p>PESU Cafeteria &copy; 2024 | <a href="https://www.pesuacademy.com/Academy/s/studentProfilePESU">Contact Us</a> | <a href="faqs">FAQs</a></p>
      </footer>

      {modalVisible && (
        <div id="user-type-modal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalVisible(false)}>&times;</span>
            <h2>Select User Type</h2>
            <button id="admin-login" onClick={handleAdminLogin}>Admin</button>
            <button id="student-login" onClick={handleStudentLogin}>Student</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;