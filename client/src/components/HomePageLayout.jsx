// components/HomePageLayout.js
import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Category from "./Category";
import Stores from "../pages/Stores";
import Recipes from "../pages/Recipes";

const HomePageLayout = ({ children }) => {

  return (
    <>
        <Navbar />
        <Hero />
        {children}
        <Category />
        <Stores />
        <Recipes/>
    </>
  );
};

export default HomePageLayout;
