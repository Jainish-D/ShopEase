// Basket.js
import React from 'react';

const Basket = ({ addedProducts }) => {
  const calculateTotal = () => {
    return addedProducts.reduce((total, product) => total + parseFloat(product.price), 0).toFixed(2);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Basket</h2>
      {addedProducts.map((product, index) => (
        <div key={`basket-product-${index}`} style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>{product.name}</h3>
          <p style={{ color: '#666' }}>${parseFloat(product.price).toFixed(2)}</p>
        </div>
      ))}
      <div style={{ marginTop: '20px', borderTop: '1px solid #ddd', paddingTop: '20px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Total: ${calculateTotal()}</h3>
        <button
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            cursor: 'pointer',
            border: 'none',
            marginTop: '10px',
          }}
          onClick={() => alert('Checkout functionality will be implemented later.')}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Basket;
