// components/HomePageLayout.js
import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Category from "./Category";

const HomePageLayout = ({ children }) => {

  return (
    <>
        <Navbar />
        <Hero />
        {children}
        <Category />
    </>
  );
};

export default HomePageLayout;
