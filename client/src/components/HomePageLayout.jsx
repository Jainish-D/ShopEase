// HomePageLayout.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Category from "./Category";
import Stores from "../pages/Stores";
import Recipes from "../pages/Recipes";
import PriceComparison from "../pages/PriceComparison";
import Footer from "./Footer";
import axios from "axios";

const HomePageLayout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/Profile");
        if (response.data) {
          setIsLoggedIn(true);
          setUserName(response.data.name);
        } else {
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
      setIsLoggedIn(false);
      setUserName("");
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
      <Recipes/>
      <PriceComparison />
      <Footer/>
    </>
  );
};

export default HomePageLayout;
