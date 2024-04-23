import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StoreList = () => {
  const { category } = useParams();
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/store_list');
        const filteredStores = response.data.filter(store => store.ethnicCategory === category);
        setStores(filteredStores);
      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    };

    fetchStores();
  }, [category]);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
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
  );
};

export default StoreList;
