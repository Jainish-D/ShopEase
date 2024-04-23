import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const StoreList = () => {
  const { category } = useParams();
  const [stores, setStores] = useState([]);

  useEffect(() => {
    // Fetch stores based on the selected category from the backend
    const fetchStores = async () => {
      try {
        const response = await axios.get(`/api/stores?category=${category}`);
        setStores(response.data);
      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    };
    fetchStores();
  }, [category]);

  return (
    <div>
      <h2>Stores in {category}</h2>
      {stores.map((store, index) => (
        <div key={`store-${index}`} className="bg-white p-4 rounded-lg shadow-md mb-4">
          <h3 className="text-xl font-bold mb-2">{store.name}</h3>
          <p className="text-gray-600 mb-2">Contact: {store.contact}</p>
          <p className="text-gray-500 mb-2">Location: {store.location}</p>
          <p className="text-gray-500">Ethnic Category: {store.ethnicCategory}</p>
        </div>
      ))}
      {/* Explore all the stores */}
      <Link to="/stores-list" className="no-underline">
        <div className="bg-blue-300 rounded-lg shadow-md p-6 h-full">
          <div className="flex items-center justify-center bg-blue-600 rounded-full w-12 h-12 text-white mb-4">
            {/* You can add an icon here if needed */}
          </div>
          <h3 className="text-xl font-bold mb-2">Explore all the Stores</h3>
        </div>
      </Link>
    </div>
  );
};

export default StoreList;
