import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CompareByProduct = ({ setAddedProducts }) => {
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);

  // Function to add a product to the basket
  const addToBasket = (product) => {
    setAddedProducts(prevProducts => [...prevProducts, product]);
  };

  useEffect(() => {
    const fetchStoresAndProducts = async () => {
      try {
        // Fetch all stores
        const storesResponse = await axios.get('http://localhost:8000/api/store_list');
        setStores(storesResponse.data);

        // Fetch all products
        const productsResponse = await axios.get('http://localhost:8000/api/product_list');
        setProducts(productsResponse.data);
      } catch (error) {
        console.error('Error fetching stores and products:', error);
      }
    };

    fetchStoresAndProducts();
  }, []);

  // Function to compare prices of a specific product across different stores
  const comparePricesByProduct = (productName) => {
    const productPrices = products
      .filter(product => product.name === productName)
      .map(product => ({ storeName: product.storeName, price: parseFloat(product.price) }))
      .sort((a, b) => a.price - b.price); // Sort prices in ascending order

    // Check if the product is sold in multiple stores
    if (productPrices.length > 1) {
      return productPrices;
    } else {
      return [];
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Compare Prices By Product</h2>
      {/* Compare by product */}
      {products.map((product, index) => {
        const prices = comparePricesByProduct(product.name);
        if (prices.length > 0) {
          return (
            <div key={`product-${index}`} className="mb-8">
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <div className="grid grid-cols-2 gap-4 justify-center">
                {prices.map((priceInfo, idx) => (
                  <div key={`price-${idx}`} className="border p-2 text-center">
                    <p className="font-bold">{priceInfo.storeName}</p>
                    <p>${priceInfo.price.toFixed(2)}</p>
                    {/* Add to Basket button */}
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-2 text-sm"
                      onClick={() => addToBasket(product)}
                    >
                      Add to Basket
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        } else {
          return null;
        }
      })}
      {/* Go to Basket button */}
      <div className="text-center mt-8">
        <Link to="/basket">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Go to Basket
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CompareByProduct;
