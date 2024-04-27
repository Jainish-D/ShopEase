import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useLocation } from 'react-router-dom';

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
        {products.length === 0 ? (
          <p className="text-center text-gray-600">No similar products found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div key={`product-${index}`} className="p-4">
                <div className="bg-white border border-gray-200 rounded-md h-full overflow-hidden">
                  <div className="p-4 h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                      <p className="text-gray-600 mb-4">${parseFloat(product.price).toFixed(2)}</p>
                    </div>
                    <button 
                      onClick={() => addToBasket(product)} 
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                    >
                      Add to Basket
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-center mt-8">
          <Link to="/all-stores" className="no-underline mr-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Go Back
            </button>
          </Link>
          <Link to="/basket" className="no-underline">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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
              <div className="bg-blue-300 border border-gray-200 rounded-md h-full overflow-hidden">
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{store.name}</h3>
                  <div className="text-gray-600 mb-2">
                    <p>Contact: {store.contact}</p>
                    <p>Location: {store.location}</p>
                    <p>Ethnic Category: {store.ethnicCategory}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {location.pathname !== "/" && stores.map((store, index) => (
            <Link key={`store-${index}`} to={`/stores/${encodeURIComponent(store.ethnicCategory)}/${encodeURIComponent(store.name)}`} className="no-underline">
              <div className="bg-blue-300 border border-gray-200 rounded-md h-full overflow-hidden">
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{store.name}</h3>
                  <div className="text-gray-600 mb-2">
                    <p>Contact: {store.contact}</p>
                    <p>Location: {store.location}</p>
                    <p>Ethnic Category: {store.ethnicCategory}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          {location.pathname === "/" && (
            <Link to="/all-stores" className="no-underline">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                See all stores
              </button>
            </Link>
          )}
          {location.pathname === "/all-stores" && (
            <Link to="/" className="no-underline">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Go to Homepage
              </button>
            </Link>
          )}
        </div>
      </div>
    )}
  </div>
);

};

export default Stores;
