import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');
  const { stores, products, recipes } = location.state;

  // Filter stores, products, and recipes based on the search query
  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(query.toLowerCase())
  );

  const StoreCard = ({ store }) => (
    <div key={store._id} className="bg-blue-300 shadow-lg rounded-lg p-6 flex flex-col">
      <h4 className="text-xl font-semibold mb-4">{store.name}</h4>
      <p>Contact: {store.contact}</p>
      <p>Location: {store.location}</p>
      <p>Ethnic Category: {store.ethnicCategory}</p>
    </div>
  );

  const ProductCard = ({ product }) => (
    <div key={product._id} className="bg-blue-300 shadow-lg rounded-lg p-6 flex flex-col">
      <h4 className="text-xl font-semibold mb-2">{product.storeName}</h4>
      <p>{product.name}</p>
      <p className="text-xl font-bold mt-2">${product.price}</p>
    </div>
  );

  const RecipeCard = ({ recipe }) => (
    <div key={recipe._id} className="bg-blue-300 shadow-lg rounded-lg p-6 flex flex-col">
      <h4 className="text-xl font-semibold mb-2">{recipe.name}</h4>
      <h2 className="text-s font-semibold mb-4">Ethnic Category: {recipe.ethnicCategory}</h2>
      <p>{recipe.description}</p>
      {/* Add recipe details here if needed */}
    </div>
  );

  return (
    <div className="bg-blue-100 min-h-screen flex flex-col justify-center items-center py-12">
      <div className="max-w-4xl w-full px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Search Results for: {query}</h2>

        {filteredStores.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-6">Stores:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStores.map(store => (
                <Link key={store._id} to={`/stores/${encodeURIComponent(store.ethnicCategory)}/${encodeURIComponent(store.name)}`} className="no-underline">
                  <StoreCard store={store} />
                </Link>
              ))}
            </div>
          </div>
        )}

        {filteredProducts.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-6">Products:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <Link key={product._id} to={`/stores/${encodeURIComponent(product.ethnicCategory)}/${encodeURIComponent(product.storeName)}`} className="no-underline">
                  <ProductCard product={product} />
                </Link>      
              ))}
            </div>
          </div>
        )}

        {filteredRecipes.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-6">Recipes:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map(recipe => (
                <Link key={recipe._id} to={`/recipe/${encodeURIComponent(recipe.name)}`} className="no-underline">
                  <RecipeCard recipe={recipe} />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Display message if no results found in stores */}
        {filteredStores.length === 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-6">Stores:</h3>
            <p className="text-lg">No results were found.</p>
          </div>
        )}

        {/* Display message if no results found in recipes */}
        {filteredRecipes.length === 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-6">Recipes:</h3>
            <p className="text-lg">No results were found.</p>
          </div>
        )}

        {/* Display message if no results found in products */}
        {filteredProducts.length === 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-6">Products:</h3>
            <p className="text-lg">No results were found.</p>
          </div>
        )}
        
        {/* Display general message if no results found */}
        {filteredStores.length === 0 && filteredProducts.length === 0 && filteredRecipes.length === 0 && (
          <p className="text-2xl font-semibold mb-6">No results found for "{query}".</p>
        )}

        {/* Button to go to home page */}
        <div className="flex justify-center">
          <Link to="/" className="no-underline mr-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10">
              Go to Home Page
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default SearchResults;
