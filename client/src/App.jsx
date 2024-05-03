//App.jsx
import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import RegisterStore from './pages/RegisterStore';
import Login from "./pages/Login";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "../context/userContext";
import Dashboard from "./pages/Dashboard";
import HomePageLayout from "./components/HomePageLayout";
import Home from "./pages/Home";
import ProductsCatalogue from "./pages/ProductsCatalouge";
import Basket from "./components/Basket";
import Stores from './pages/Stores';
import Recipes from './pages/Recipes';
import PriceComparison from './pages/PriceComparison';
import CompareByProduct from './components/CompareByProduct';
import CompareByRecipe from './components/CompareByRecipe';
import CompareByStore from './components/CompareByStore';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import StoreOwnerDashboard from './pages/StoreOwnerDashboard'; // Importing StoreOwnerDashboard

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {

  const [addedProducts, setAddedProducts] = useState([]);

  return (
    <UserContextProvider>
      <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path="/" element={
          <HomePageLayout>
            <Home />
          </HomePageLayout>} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-store-owner" element={<RegisterStore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/store-owner-profile" element={<StoreOwnerDashboard />} /> {/* Adding StoreOwnerDashboard route */}
        <Route
          path="/products"
          element={<ProductsCatalogue setAddedProducts={setAddedProducts} />}
        />
        <Route
          path="/basket"
          element={<Basket addedProducts={addedProducts} updateAddedProducts={setAddedProducts} />}
        />
        <Route
          path="/stores/:category"
          element={<Stores setAddedProducts={setAddedProducts} />}
        />
        <Route
          path="/all-stores"
          element={<Stores setAddedProducts={setAddedProducts} />}
        />
        <Route
          path="/stores/:category/:id"
          element={<Stores setAddedProducts={setAddedProducts} />}
        />
        <Route
          path="/recipes/:category"
          element={<Recipes setAddedProducts={setAddedProducts} />}
        />
        <Route
          path="/all-recipes"
          element={<Recipes setAddedProducts={setAddedProducts} />}
        />
        <Route
          path="/recipe/:recipeName"
          element={<Recipes setAddedProducts={setAddedProducts} />}
        />
        <Route
          path="/price-comparison"
          element={<PriceComparison setAddedProducts={setAddedProducts} />}
        />
        <Route
          path="/compare-prices/compare-by-product"
          element={<CompareByProduct setAddedProducts={setAddedProducts} updateAddedProducts={setAddedProducts} />}
        />
        <Route
          path="/compare-by-recipe"
          element={<CompareByRecipe setAddedProducts={setAddedProducts} />}
        />
        <Route
          path="/replace-basket"
          element={<CompareByStore addedProducts={addedProducts} setAddedProducts={setAddedProducts} />}
        />
        <Route
          path="/search-bar"
          element={<SearchBar />}
        />
        <Route
          path="/search-results"
          element={<SearchResults />}
        />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
