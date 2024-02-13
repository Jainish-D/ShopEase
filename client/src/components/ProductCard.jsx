// ProductCard.jsx
import React from 'react';
import PropTypes from 'prop-types';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <img
        src={product.Image}
        alt={product.Name}
        className="w-full h-[200px] object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-bold mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-2">${parseFloat(product.Price).toFixed(2)}</p>
      <p className="text-gray-500 mb-2">Rating: {product.Rating || 'Not Rated'}</p>
      <p className="text-gray-500">Category: {product.Category}</p>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Image: PropTypes.string.isRequired,
    Price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    Rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    Category: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
