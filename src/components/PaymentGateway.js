import React from 'react';
import './PaymentGateway.css';

const PaymentGateway = () => {
  const handlePayment = () => {
    alert('Payment successful');
    const tokenNumber = Math.floor(Math.random() * 1000000); // Generate a random 6-digit token number
    localStorage.setItem('tokenNumber', tokenNumber); // Store the token number in local storage
    localStorage.removeItem('cart'); // Empty the cart
    window.location.href = '/'; // Redirect to index.html
  };

  return (
    <div>
      <header>
        <div className="logo">Payment Gateway</div>
      </header>

      <main>
        <div className="payment-container">
          <h2>Complete Your Payment</h2>
          <p>Choose your preferred payment method:</p>
          <button id="gpay-btn" onClick={handlePayment}>Pay with Google Pay</button>
          <button id="phonepe-btn" onClick={handlePayment}>Pay with PhonePe</button>
        </div>
      </main>

      <footer>
        <p>PESU Cafeteria &copy; 2024 | <a href="#">Contact Us</a> | <a href="#">FAQs</a></p>
      </footer>
    </div>
  );
};

export default PaymentGateway;