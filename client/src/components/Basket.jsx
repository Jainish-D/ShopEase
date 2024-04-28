import React from 'react';
import CompareByStore from './CompareByStore'; // Import the CompareByStore component

const Basket = ({ addedProducts, updateAddedProducts }) => {
  // Function to group products by store
  const groupProductsByStore = () => {
    const groupedProducts = {};
    addedProducts.forEach(product => {
      if (!groupedProducts[product.storeName]) {
        groupedProducts[product.storeName] = [];
      }
      groupedProducts[product.storeName].push(product);
    });
    return groupedProducts;
  };

  // Function to calculate total price for a group of products
  const calculateTotalForStore = (products) => {
    return products.reduce((total, product) => total + parseFloat(product.price), 0).toFixed(2);
  };

  const groupedProducts = groupProductsByStore();

  const removeFromBasket = (storeName, productName) => {
    const updatedProducts = [...addedProducts];
    const indexToRemove = updatedProducts.findIndex(product => product.storeName === storeName && product.name === productName);

    if (indexToRemove !== -1) {
      updatedProducts.splice(indexToRemove, 1); // Remove only one instance
      updateAddedProducts(updatedProducts);
    }
  };

  return (
    <div className="container mx-auto">
      <div style={{ padding: '20px' }}>
        {/* Title "Basket" */}
        <h2 className="bg-blue-200 border rounded-lg border-blue-600 p-2 text-3xl font-bold text-center mb-6">Basket</h2>
        {addedProducts.length === 0 ? (
          <div className="text-center mt-10 mb-4 font-bold text-xl">
            <p>Basket is Empty</p>
          </div>
        ) : null}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.keys(groupedProducts).map((storeName, index) => (
            <div key={`basket-store-${index}`} className="border rounded-lg p-4 flex flex-col h-full">
              <h3 className="text-xl font-bold mb-2">{storeName}</h3>
              <div className="flex-grow">
                <ul className="divide-y divide-gray-200">
                  {groupedProducts[storeName].map((product, index) => (
                    <li key={`basket-product-${index}`} className="flex items-center justify-between py-2">
                      <div className="flex-grow pr-4">{product.name}</div>
                      <div className="flex items-center">
                        <div>${parseFloat(product.price).toFixed(2)}</div>
                        <button
                          onClick={() => removeFromBasket(product.storeName, product.name)} // Pass storeName and productName
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto">
                <div className="flex justify-between items-center border-t pt-2">
                  <p className="font-bold">Subtotal:</p>
                  <p>${calculateTotalForStore(groupedProducts[storeName])}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '20px', borderTop: '1px solid #ddd', paddingTop: '20px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Overall Total: ${
            Object.values(groupedProducts).reduce((total, products) => total + parseFloat(calculateTotalForStore(products)), 0).toFixed(2)
          }</h3>
          <div className="flex justify-left mt-4">
            <button
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                padding: '10px',
                borderRadius: '5px',
                cursor: 'pointer',
                border: 'none',
                marginRight: '10px',
              }}
              onClick={() => alert('Checkout functionality will be implemented later.')}
            >
              Checkout
            </button>
            <button
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                padding: '10px',
                borderRadius: '5px',
                cursor: 'pointer',
                border: 'none',
              }}
              onClick={() => window.location.href = "/"}
            >
              Go to HomePage
            </button>
          </div>
          <div style={{ padding: '20px' }}></div>
          {/* Render CompareByStore component if there are products in the basket */}
          {addedProducts.length > 0 && <CompareByStore addedProducts={addedProducts} updateAddedProducts={updateAddedProducts} />}
        </div>
      </div>
    </div>
  );
};

export default Basket;
