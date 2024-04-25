// PriceComparison.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PriceComparison = ({ productNames, setAddedProducts }) => {

  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const storesResponse = await axios.get('http://localhost:8000/api/store_list');
        const productsResponse = await axios.get('http://localhost:8000/api/product_list');

        const storesData = storesResponse.data;
        const productsData = productsResponse.data;

        // Find stores that have at least one of the ingredients
        const storesWithSomeIngredients = storesData.filter(store => {
          return productNames.some(productName => {
            return productsData.some(product => product.storeName === store.name && product.name === productName);
          });
        });

        // Now fetch the products for these stores
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

  const calculateTotalPrice = (store) => {
    let totalPrice = 0;
    store.products.forEach((product) => {
      totalPrice += product.price;
    });
    return totalPrice.toFixed(2);
  };

  const handleAddAllToBasket = (store) => {
    const productsToAdd = store.products.filter(product => productNames.includes(product.name)).map((product) => ({
      name: product.name,

    }));
  
    console.log("Products to add:", productsToAdd); // Add this line to check products being added
  
    setAddedProducts((prevProducts) => [...prevProducts, ...productsToAdd]);
  };
  

  // Separate stores with all products and stores with some products
  const storesWithAllProducts = stores.filter(store => store.products.length === productNames.length);
  const storesWithSomeProducts = stores.filter(store => store.products.length < productNames.length);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center bg-blue-500 text-white py-2 rounded-lg">Compare Store Prices</h2>

      {/* Stores with all products */}
      {storesWithAllProducts.length > 0 ? (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Stores with all products</h3>
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
          <h3 className="text-xl font-bold mb-4">Stores with some products</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {storesWithSomeProducts.map((store) => (
              <StoreCard key={store._id} store={store} calculateTotalPrice={calculateTotalPrice} handleAddAllToBasket={handleAddAllToBasket} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

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

export default PriceComparison;
