// App.jsx
import React, { useState } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "../context/userContext";
import Dashboard from "./pages/Dashboard";
import HomePageLayout from "./components/HomePageLayout";
import Home from "./pages/Home";
import ProductsCatalogue from "./pages/ProductsCatalouge";
import Basket from "./components/Basket";
import StoreList from './pages/StoreList';
import Category from './components/Category';
import AllStores from './pages/AllStores';


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
        <Route path="/login" element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route
          path="/products"
          element={<ProductsCatalogue setAddedProducts={setAddedProducts} />}
        />
        <Route
          path="/basket"
          element={<Basket addedProducts={addedProducts} setAddedProducts={setAddedProducts} />}
        />
        <Route // Adding route for StoreList component
          path="/stores-list"
          element={<StoreList />}
        />
        <Route // Adding dynamic route for displaying stores based on category
          path="/stores/:category"
          element={<StoreList />}
        />
        <Route 
          path="/all-stores"
          element={<AllStores />}
        />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
