import React from "react";
import { FaApple, FaCarrot, FaFish, FaPizzaSlice } from "react-icons/fa";

const Category = () => {
  const categories = [
    { icon: <FaApple />, title: "Fruits", description: "Fresh and delicious fruits" },
    { icon: <FaCarrot />, title: "Vegetables", description: "Nutritious and organic vegetables" },
    { icon: <FaFish />, title: "Seafood", description: "High-quality and sustainable seafood" },
    { icon: <FaPizzaSlice />, title: "Pizza", description: "Tasty and flavorful pizza options" },
  ];

  return (
    <div className="container mx-auto mt-8">
      <h2 className="bg-blue-200 border rounded-lg border-blue-600 p-2 text-3xl font-bold text-center mb-6">Explore Our Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category, index) => (
          <div key={index} className="bg-blue-300 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-center bg-blue-600 rounded-full w-12 h-12 text-white mb-4">
              {category.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{category.title}</h3>
            <p className="text-gray-600">{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;

