import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/store_list");
        const storeData = response.data;
        const categoryNames = storeData.map(store => store.ethnicCategory);
        // Remove duplicates using Set
        const uniqueCategories = [...new Set(categoryNames)];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="bg-blue-200 border rounded-lg border-blue-600 p-2 text-3xl font-bold text-center mb-6">Explore Our Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category, index) => (
          <Link key={index} to={`/stores/${category}`} className="no-underline">
            <div className="bg-blue-300 rounded-lg shadow-md p-6 h-full">
              <div className="flex items-center justify-center bg-blue-600 rounded-full w-12 h-12 text-white mb-4">
                {/* You can add an icon here if needed */}
              </div>
              <h3 className="text-xl font-bold mb-2">{category}</h3>
            </div>
          </Link>
        ))}
      </div>   
    </div>
  );
};

export default Category;
