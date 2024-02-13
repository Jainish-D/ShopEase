// ProductsCatalogue.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ProductsCatalogue = ({ setAddedProducts }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products');
        // Assuming your product objects have an 'id' property
        const productsWithId = response.data.map((product, index) => ({ ...product, id: index + 1 }));
        setProducts(productsWithId);

        // Extract unique category names
        const uniqueCategories = Array.from(new Set(productsWithId.map(product => product.category_name)));
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Filter out products without a name and without an image
  const filteredProducts = products.filter(product => product.name);

  const handleAddToBasket = (productId) => {
    // Find the product based on the productId
    const selectedProduct = products.find(product => product.id === productId);

    // Ensure that the product object has the 'id' property
    if (selectedProduct && selectedProduct.id) {
      // Add the selected product to the basket
      setAddedProducts(prevProducts => [...prevProducts, selectedProduct]);
      console.log(`Product ${selectedProduct.name} added to basket`);
    } else {
      console.error('Invalid product:', selectedProduct);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
      {/* Category names at the top */}
      <div style={{ gridColumn: 'span 3', textAlign: 'center', marginBottom: '20px' }}>
        {categories.map((category, index) => (
          <span key={`category-${index}`} style={{ marginRight: '20px' }}>
            {category}
          </span>
        ))}
      </div>

      {/* Product grid */}
      {filteredProducts.map((product, index) => (
        <div key={`product-${index}`} style={{ border: '1px solid #ddd', borderRadius: '10px', overflow: 'hidden' }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: '300px', objectFit: 'cover' }}
          />
          <div style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>{product.name}</h3>
            <p style={{ color: '#666', marginBottom: '10px' }}>${parseFloat(product.price).toFixed(2)}</p>
            <p style={{ color: '#888' }}>Rating: {product.rating || 'Not Rated'}</p>
            <p style={{ color: '#888' }}>Category: {product.category_name}</p>
            <button
              style={{
                backgroundColor: '#007BFF',
                color: 'white',
                padding: '10px',
                borderRadius: '5px',
                cursor: 'pointer',
                border: 'none',
              }}
              onClick={() => handleAddToBasket(product.id)}
            >
              Add to Basket
            </button>
          </div>
        </div>
      ))}

      {/* Button to go to the basket page */}
      <div style={{ gridColumn: 'span 3', textAlign: 'center', marginTop: '20px' }}>
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
