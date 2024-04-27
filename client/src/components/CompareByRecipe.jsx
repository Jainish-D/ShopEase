import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CompareByRecipe = ({ productNames, setAddedProducts }) => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        // Fetch stores and products data
        const storesResponse = await axios.get('http://localhost:8000/api/store_list');
        const productsResponse = await axios.get('http://localhost:8000/api/product_list');

        const storesData = storesResponse.data;
        const productsData = productsResponse.data;

        // Filter stores based on the selected product names
        const storesWithSomeIngredients = storesData.filter(store => {
          return productNames.some(productName => {
            return productsData.some(product => product.storeName === store.name && product.name === productName);
          });
        });

        // Map stores to include only products with selected names
        const storesWithProducts = storesWithSomeIngredients.map(store => {
          const storeProducts = productsData.filter(product => product.storeName === store.name && productNames.includes(product.name));
          return { ...store, products: storeProducts };
        });

        setStores(storesWithProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchStores();
  }, [productNames]);

  // Function to calculate total price of products in a store
  const calculateTotalPrice = (store) => {
    let totalPrice = 0;
    store.products.forEach((product) => {
      totalPrice += product.price;
    });
    return totalPrice.toFixed(2);
  };

  // Function to handle adding all products from a store to the basket
  const handleAddAllToBasket = (store) => {
    const productsToAdd = store.products.filter(product => productNames.includes(product.name));
    if (productsToAdd.length > 0) {
      setAddedProducts(prevProducts => [...prevProducts, ...productsToAdd]);
      console.log("Products added to basket:", productsToAdd);
    } else {
      console.error('No products to add to basket');
    }
  };

  // Separate stores with all products and stores with some products
  const storesWithAllProducts = stores.filter(store => store.products.length === productNames.length);
  const storesWithSomeProducts = stores.filter(store => store.products.length < productNames.length);

  return (
    <div>
      {/* Stores with all products */}
      {storesWithAllProducts.length > 0 ? (
        <div className="mt-8">
           <h3 className="bg-blue-200 border rounded-lg border-blue-600 p-2 text-xl font-bold text-left mb-6">Stores With All Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {storesWithAllProducts.map((store) => (
              <StoreCard key={store._id} store={store} calculateTotalPrice={calculateTotalPrice} handleAddAllToBasket={handleAddAllToBasket} />
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">No stores with all products were found</h3>
          <p>Please try searching again or consider alternative ingredients.</p>
        </div>
      )}

      {/* Stores with some products */}
      {storesWithSomeProducts.length > 0 && (
        <div className="mt-8">
          <h3 className="bg-blue-200 border rounded-lg border-blue-600 p-2 text-xl font-bold text-left mb-6">Stores With Some Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {storesWithSomeProducts.map((store) => (
              <StoreCard key={store._id} store={store} calculateTotalPrice={calculateTotalPrice} handleAddAllToBasket={handleAddAllToBasket} />
            ))}
          </div>
        </div>
      )}

      {/* Buttons to navigate */}
      <div className="text-center mt-8">
        <Link to="/all-recipes" className="no-underline">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Go Back
          </button>
        </Link>
        <Link to="/basket" className="no-underline">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4">
            Go to Basket
          </button>
        </Link>
      </div>
    </div>
  );
};

// StoreCard component remains unchanged
const StoreCard = ({ store, calculateTotalPrice, handleAddAllToBasket }) => (
  <div className="store-card bg-blue-300 rounded-lg shadow-md p-6 flex flex-col justify-between">
    <div>
      <h3 className="text-xl font-bold mb-2">{store.name}</h3>
      <p className="mb-4"><strong>Ethnic Category:</strong> {store.ethnicCategory}</p>
      <p><strong>Products:</strong></p>
      <ul>
        {store.products.map((product) => (
          <li key={product._id}>
            {product.name} ${product.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
    <div className="mt-4">
      <p><strong>Total:</strong> <span className="total-price">${calculateTotalPrice(store)}</span></p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={() => handleAddAllToBasket(store)}>
        Add all ingredients to Basket
      </button>
    </div>
  </div>
);

export default CompareByRecipe;
