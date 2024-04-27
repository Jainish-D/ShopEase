import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import CompareByStore from '../components/CompareByStore';

const PriceComparison = ({ addedProducts }) => {
  // Get the current location using useLocation hook
  const location = useLocation();

  // Check if the current location is the homepage
  const isHomepage = location.pathname === '/';

  return (
    <div className="container mx-auto px-4">
      <h2 className="bg-blue-200 border rounded-lg border-blue-600 p-2 text-3xl font-bold text-center mb-6">Compare Prices</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center">
        {/* Button to Compare Products */}
        <div className="border p-4 flex flex-col bg-blue-300 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Compare Products</h3>
          <div className="description-container mb-auto">
            <p>Explore a wide range of products and compare their prices from different stores.</p>
          </div>
          <Link to="/compare-prices/compare-by-product">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
              Compare Now
            </button>
          </Link>
        </div>
        {/* Button to View All Recipes */}
        <div className="border p-4 flex flex-col bg-blue-300 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Compare Recipes Ingredients</h3>
          <div className="description-container mb-auto">
            <p>Browse through various recipes and compare the prices of their ingredients.</p>
          </div>
          <Link to="/all-recipes">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
              Explore Recipes
            </button>
          </Link>
        </div>
        {/* Button to View All Stores */}
        <div className="border p-4 flex flex-col bg-blue-300 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Compare Store's Products</h3>
          <div className="description-container mb-auto">
            <p>Add products from a store to your basket and compare their prices with different stores.</p>
          </div>
          <Link to="/all-stores">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
              Explore Stores
            </button>
          </Link>
        </div>
      </div>
      {/* Conditionally render CompareByStore component based on the location */}
      {!isHomepage && <CompareByStore addedProducts={addedProducts} />}
    </div>
  );
};

export default PriceComparison;
