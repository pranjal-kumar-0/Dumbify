import React from 'react';

function Pricing(){
    
  return (
    <div className="pricing-card">
      <h3 className="plan-title">BASIC PLAN</h3>
      <p className="price">$10/MONTH</p>
      <p className="description">This plan is perfect for individuals starting out and includes basic features to get you going.</p>
      <button className="checkout-button">Checkout</button>
    </div>
  );
};

export default Pricing;