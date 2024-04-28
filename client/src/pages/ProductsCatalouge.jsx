// ProductsCatalogue.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ProductsCatalogue = ({ setAddedProducts }) => {
  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/product_list');
        setProducts(response.data);

        // Extract unique store names
        const uniqueStores = Array.from(new Set(response.data.map(product => product.storeName)));
        setStores(uniqueStores);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Filter out products without a name
  const filteredProducts = products.filter(product => product.name);

  const handleAddToBasket = (productId) => {
    const selectedProduct = products.find(product => product._id === productId);
    if (selectedProduct) {
      setAddedProducts(prevProducts => [...prevProducts, selectedProduct]);
      console.log(`Product ${selectedProduct.name} added to basket`);
    } else {
      console.error('Invalid product:', selectedProduct);
    }
  };

  return (
    <div>
      <h2 className="bg-blue-200 border rounded-lg border-blue-600 p-2 text-3xl font-bold text-center mb-6 mt-4">Products Catalogue</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* Product cards */}
        {filteredProducts.map((product, index) => (
          <div key={`product-${index}`} style={{ width: '300px', margin: '20px', border: '1px solid #ddd', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ padding: '20px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>{product.name}</h3>
              <p style={{ color: '#666', marginBottom: '10px' }}>${parseFloat(product.price).toFixed(2)}</p>
              <p style={{ color: '#888' }}>Store Name: {product.storeName}</p>
              <button
                style={{
                  backgroundColor: '#007BFF',
                  color: 'white',
                  padding: '10px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  border: 'none',
                }}
                onClick={() => handleAddToBasket(product._id)}
              >
                Add to Basket
              </button>
            </div>
          </div>
        ))}
      </div>
        <div className="flex justify-center mt-8 mb-8">
          <Link to="/" style={{ marginRight: '20px' }} className="no-underline">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Go to homepage
            </button>
          </Link>

          <Link to="/basket" className="no-underline">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Go to Basket
            </button>
          </Link>
        </div>
    </div>
  );
};

export default ProductsCatalogue;
