import React from 'react';

const ProductCard = ({ product, onAddToBasket }) => {
  return (
    <div className="border border-gray-200 p-4 rounded-md">
      <h3 className="text-xl font-bold mb-2">{product.name}</h3>
      <p className="text-gray-600">${parseFloat(product.price).toFixed(2)}</p>
      <button onClick={() => onAddToBasket(product)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
        Add to Basket
      </button>
    </div>
  );
};

export default ProductCard;
