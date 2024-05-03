import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Category from "./EthnicCategories";
import Stores from "../pages/Stores";
import Recipes from "../pages/Recipes";
import PriceComparison from "../pages/PriceComparison";
import Footer from "./Footer";
import axios from "axios";

const HomePageLayout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Check if the authentication token is present
        const token = localStorage.getItem('token');
        if (token) {
          // If token is present, make a request to retrieve user profile
          const response = await axios.get("/store-owner-profile", {
            headers: {
              Authorization: `Bearer ${token}` // Attach token to request headers
            }
          });
          if (response.data) {
            // If user profile is retrieved, set authentication state
            setIsLoggedIn(true);
            setUserName(response.data.name);
          } else {
            // If user profile is not retrieved, clear authentication state
            setIsLoggedIn(false);
            setUserName("");
          }
        } else {
          // If token is not present, clear authentication state
          setIsLoggedIn(false);
          setUserName("");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("/logout");
      // Clear authentication token upon logout
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      setUserName("");
      // Redirect to the homepage after logout
      navigate("/"); // Redirect to homepage after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} userName={userName} onLogout={handleLogout} />
      <Hero />
      {children}
      <Category />
      <Stores />
      <Recipes />
      <PriceComparison />
      <Footer />
    </>
  );
};

export default HomePageLayout;
