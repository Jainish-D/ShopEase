import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useLocation } from 'react-router-dom';
import Basket from '../components/Basket'; // Import the Basket component
import ProductCard from '../components/ProductCard'; // Import the ProductCard component

const Stores = ({ setAddedProducts }) => {
  const { category, id: storeName } = useParams();
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/store_list');
        let filteredStores = response.data;
        
        if (category) {
          filteredStores = response.data.filter(store => store.ethnicCategory === category);
        }

        setStores(filteredStores);
      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    };

    const fetchProductsByStore = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/product_list`);
        console.log('All products:', response.data);
        const filteredProducts = response.data.filter(product => product.storeName === storeName);
        console.log('Filtered products:', filteredProducts);
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products by store:', error);
      }
    };
    
    fetchStores();
    if (storeName) {
      fetchProductsByStore();
    }
  }, [category, storeName]);

  // Dynamically set the title based on the storeName
  const pageTitle = storeName ? storeName : (category ? `${category}` : 'All Stores');

  // Function to add product to basket
  const addToBasket = (product) => {
    setAddedProducts(prevProducts => [...prevProducts, product]);
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="bg-blue-200 border rounded-lg border-blue-600 p-2 text-3xl font-bold text-center mb-6">{pageTitle}</h2>
      {storeName ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <ProductCard key={`product-${index}`} product={product} onAddToBasket={addToBasket} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/" className="no-underline">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Go to Homepage
              </button>
            </Link>
            <Link to="/basket" className="no-underline">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4">
                Go to Cart
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {location.pathname === "/" && stores.slice(0, 4).map((store, index) => (
              <Link key={`store-${index}`} to={`/stores/${encodeURIComponent(store.ethnicCategory)}/${encodeURIComponent(store.name)}`} className="no-underline">
                <div style={{ width: '300px', margin: '20px', border: '1px solid #ddd', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>{store.name}</h3>
                    <p style={{ color: '#666', marginBottom: '10px' }}>Contact: {store.contact}</p>
                    <p style={{ color: '#888' }}>Location: {store.location}</p>
                    <p style={{ color: '#888' }}>Ethnic Category: {store.ethnicCategory}</p>
                  </div>
                </div>
              </Link>
            ))}
            {location.pathname !== "/" && stores.map((store, index) => (
              <Link key={`store-${index}`} to={`/stores/${encodeURIComponent(store.ethnicCategory)}/${encodeURIComponent(store.name)}`} className="no-underline">
                <div style={{ width: '300px', margin: '20px', border: '1px solid #ddd', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>{store.name}</h3>
                    <p style={{ color: '#666', marginBottom: '10px' }}>Contact: {store.contact}</p>
                    <p style={{ color: '#888' }}>Location: {store.location}</p>
                    <p style={{ color: '#888' }}>Ethnic Category: {store.ethnicCategory}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/all-stores" className="no-underline">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                See all stores
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stores;
