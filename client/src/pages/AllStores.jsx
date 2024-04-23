import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StoreList = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/store_list');
        setStores(response.data);
      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    };

    fetchStores();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="bg-blue-200 border rounded-lg border-blue-600 p-2 text-3xl font-bold text-center mb-6">All Stores</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stores.map((store, index) => (
          <div key={`store-${index}`} style={{ width: '300px', margin: '20px', border: '1px solid #ddd', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ padding: '20px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>{store.name}</h3>
              <p style={{ color: '#666', marginBottom: '10px' }}>Contact: {store.contact}</p>
              <p style={{ color: '#888' }}>Location: {store.location}</p>
              <p style={{ color: '#888' }}>Ethnic Category: {store.ethnicCategory}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreList;
