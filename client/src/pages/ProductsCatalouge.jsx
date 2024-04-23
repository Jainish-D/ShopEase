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

        // Extract unique store IDs
        const uniqueStores = Array.from(new Set(response.data.map(product => product.storeId)));
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
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {/* Product cards */}
      {filteredProducts.map((product, index) => (
        <div key={`product-${index}`} style={{ width: '300px', margin: '20px', border: '1px solid #ddd', borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>{product.name}</h3>
            <p style={{ color: '#666', marginBottom: '10px' }}>${parseFloat(product.price).toFixed(2)}</p>
            <p style={{ color: '#888' }}>Store ID: {product.storeId}</p>
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

      {/* Button to go to the basket page */}
      <div style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
        <Link to="/basket">
          <button style={{ backgroundColor: '#28a745', color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer', border: 'none' }}>
            Go to Basket
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductsCatalogue;
