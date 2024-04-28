import React from "react";
import { Link } from "react-router-dom";
import { FaRegUser, FaShoppingCart } from "react-icons/fa";
import SearchBar from "./SearchBar"; // Import the SearchBar component

const Navbar = ({ isLoggedIn, userName, onLogout }) => {
  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-3xl font-semibold text-white mr-4">
              ShopEase
            </Link>
            <Link to="/products" className="text-white hover:text-gray-200 mr-4 mt-2">
              Products Catalogue
            </Link>
          </div>
          {/* Render the SearchBar component here */}
          <div className="flex justify-center items-center flex-grow">
            <SearchBar />
          </div>
          <div className="flex items-center">
            {isLoggedIn ? (
              <div className="flex items-center text-white">
                <span className="mr-2">{userName}</span>
                <button onClick={onLogout} className="text-sm hover:underline">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-white hover:underline ml-4 flex items-center">
                <FaRegUser className="mr-1" />
                Login
              </Link>
            )}
            <div className="ml-4 relative">
              <Link to="/basket" className="text-white hover:text-gray-200">
                <FaShoppingCart size={24} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
