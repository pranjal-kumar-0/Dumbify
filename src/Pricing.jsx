import React from 'react';

function Pricing({ planTitle, price, description, buttonText }) {
  return (
    <div className="pricing-card">
      <h3 className="plan-title">{planTitle}</h3>
      <p className="price">{price}</p>
      <p className="description">{description}</p>
      <button className="checkout-button">{buttonText}</button>
    </div>
  );
}

export default Pricing;
