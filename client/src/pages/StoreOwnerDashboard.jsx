import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StoreOwnerDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [newProductData, setNewProductData] = useState({
    name: '',
    price: '',
    storeName: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/store-owner-profile');
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.response) {
          if (error.response.status === 401) {
            setError('Unauthorized');
          } else if (error.response.status === 404) {
            setError('Store owner not found');
          }
        } else {
          setError('Server error');
        }
      }
    };

    fetchUserData();
  }, []);

  const handleProductChange = (e) => {
    setNewProductData({
      ...newProductData,
      [e.target.name]: e.target.value
    });
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const productDataWithStoreName = {
        ...newProductData,
        storeName: userData ? userData.storeName : ''
      };

      const response = await axios.post('/add-product-to-store', productDataWithStoreName);
      console.log('New product added:', response.data);
      setNewProductData({
        name: '',
        price: '',
        storeName: ''
      });
    } catch (error) {
      console.error('Error adding new product:', error);
    }
  };

  return (
    <div>
      <h1>Welcome to the Store Owner Dashboard</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        userData && (
          <div>
            <p>Name: {userData.name}</p>
            <p>Email: {userData.email}</p>
            <p>Store Name: {userData.storeName}</p>

            <div className="card">
              <h2>Add a New Product</h2>
              <form onSubmit={handleProductSubmit}>
                <div>
                  <label htmlFor="productName">Product Name:</label>
                  <input type="text" id="productName" name="name" value={newProductData.name} onChange={handleProductChange} />
                </div>
                <div>
                  <label htmlFor="price">Price:</label>
                  <input type="number" id="price" name="price" value={newProductData.price} onChange={handleProductChange} />
                </div>
                <div>
                  <label htmlFor="storeName">Store Name:</label>
                  <select id="storeName" name="storeName" value={newProductData.storeName} onChange={handleProductChange}>
                    <option value="">Select Store</option>
                    <option value={userData.storeName}>{userData.storeName}</option>
                  </select>
                </div>
                <button type="submit">Add Product</button>
              </form>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default StoreOwnerDashboard;
