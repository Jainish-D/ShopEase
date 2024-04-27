import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CompareByStore = ({ addedProducts, updateAddedProducts }) => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/store_list');
        setStores(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    };

    fetchStores();
  }, []);

  const fetchProductsByStore = async (storeName) => {
    try {
      const response = await axios.get('http://localhost:8000/api/product_list', {
        params: {
          storeName: storeName
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching products from ${storeName}:`, error);
      return [];
    }
  };

  const filterStoresByProducts = async () => {
    const filteredStores = new Map();

    for (const product of addedProducts) {
      const storeProducts = await fetchProductsByStore(product.storeName);
      
      for (const storeProduct of storeProducts) {
        if (storeProduct.name === product.name) {
          const storeName = storeProduct.storeName;
          if (!filteredStores.has(storeName)) {
            filteredStores.set(storeName, []);
          }
          filteredStores.get(storeName).push(storeProduct);
        }
      }
    }

    return filteredStores;
  };

  const [filteredStores, setFilteredStores] = useState(new Map());

  useEffect(() => {
    const filterStores = async () => {
      const stores = await filterStoresByProducts();
      setFilteredStores(stores);
    };

    filterStores();
  }, [addedProducts]);

  const calculateSubtotal = (products) => {
    let subtotal = 0;
    for (const product of products) {
      subtotal += product.price;
    }
    return subtotal.toFixed(2);
  };

  const handleAddAllToBasket = (products) => {
    const updatedProducts = [...addedProducts, ...products];
    updateAddedProducts(updatedProducts);
  };

  return (
    <div>
      <h2 className="bg-blue-200 border rounded-lg border-blue-600 p-2 text-3xl font-bold text-center mb-6">Compare Stores By Price</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stores.map((store, index) => {
          if (filteredStores.has(store.name) && !addedProducts.some(product => product.storeName === store.name)) {
            const products = filteredStores.get(store.name);
            return (
              <div key={`store-${index}`} className="border rounded-lg p-4 flex flex-col">
                <h3 className="text-xl font-bold mb-2">{store.name}</h3>
                <div className="flex-grow">
                  <ul className="divide-y divide-gray-200">
                    {products.map((product, idx) => (
                      <li key={`product-${idx}`} className="flex justify-between items-center py-2">
                        <div className="flex-grow pr-4">{product.name}</div>
                        <div>${product.price.toFixed(2)}</div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-auto">
                  <hr className="my-2"/>
                  <div className="flex justify-between items-center">
                    <p className="font-bold">Subtotal:</p>
                    <p>${calculateSubtotal(products)}</p>
                  </div>
                  <button
                    onClick={() => handleAddAllToBasket(products)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
                  >
                    Add All to Basket
                  </button>
                </div>
              </div>
            );
          }
        })}
      </div>
      {(() => {
        let differentStoreCount = 0;
        for (const [storeName, products] of filteredStores.entries()) {
          if (!addedProducts.some(product => product.storeName === storeName)) {
            differentStoreCount++;
          }
        }
        if (differentStoreCount === 0) {
          return (
            <p className="text-center text-gray-600 font-semibold">No similar products found in any other stores</p>
          );
        }
      })()}
    </div>
  );
};

export default CompareByStore;
