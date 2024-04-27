import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsSearch } from "react-icons/bs";
import axios from 'axios';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      // Perform query on stores
      const storesResponse = await axios.get('http://localhost:8000/api/store_list', {
        params: { query: searchQuery }
      });

      // Perform query on products
      const productsResponse = await axios.get('http://localhost:8000/api/product_list', {
        params: { query: searchQuery }
      });

      // Perform query on recipe list
      const recipesResponse = await axios.get('http://localhost:8000/api/recipe_list', {
        params: { query: searchQuery }
      });

      // Navigate to the search results page with the query parameter and results data
      navigate(`/search-results?query=${encodeURIComponent(searchQuery)}`, {
        state: {
          stores: storesResponse.data,
          products: productsResponse.data,
          recipes: recipesResponse.data
        }
      });
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        className="bg-white text-sm rounded-lg border-none w-64 py-2 px-4 outline-none focus:bg-gray-100"
        placeholder="Search for a product..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch} className="absolute top-0 right-0 mt-3 mr-4">
        <BsSearch size={20} />
      </button>
    </div>
  );
};

export default SearchBar;
