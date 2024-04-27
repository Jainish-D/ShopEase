import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useParams } from 'react-router-dom';
import CompareByRecipe from '../components/CompareByRecipe';

const Recipes = ({ setAddedProducts }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { recipeName } = useParams();
  const location = useLocation();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/recipe_list');
        setRecipes(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      {recipeName ? (
        <div>
          {recipes.map((recipe, index) => {
            if (recipe.name === recipeName) {
              return (
                <div key={index} className="recipe-details">
                  <h2 className="bg-blue-200 border rounded-lg border-blue-600 p-2 text-3xl font-bold text-center mb-6">{recipe.name}</h2>
                  <div className="bg-blue-300 rounded-lg shadow-md p-6">
                    <p className="mb-4"><strong>Ethnic Category:</strong> {recipe.ethnicCategory}</p>
                    <p className="mb-4">{recipe.description}</p>
                    <p className="mb-4"><strong>Ingredients:</strong></p>
                    {recipe.productNames && recipe.productNames.length > 0 && (
                      <ul>
                        {recipe.productNames.map((productName, i) => (
                          <li key={i}>
                            <Link to={`/price-comparison/${encodeURIComponent(productName)}`} className="no-underline">{productName}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {/* Pass setAddedProducts as a prop to CompareByRecipe */}
                  <CompareByRecipe productNames={recipe.productNames} setAddedProducts={setAddedProducts} />
                </div>
              );
            }
            return null;
          })}
        </div>
      ) : (
        <React.Fragment>
          <h2 className="bg-blue-200 border rounded-lg border-blue-600 p-2 text-3xl font-bold text-center mb-6">All Recipes</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {recipes.slice(0, location.pathname === '/' ? 4 : recipes.length).map((recipe, index) => (
                <div key={index} className="recipe-card">
                  <Link to={`/recipe/${encodeURIComponent(recipe.name)}`} className="no-underline">
                    <div className="bg-blue-300 rounded-lg shadow-md p-6 h-full flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold mb-2">{recipe.name}</h3>
                        <p className="mb-4"><strong>Ethnic Category:</strong> {recipe.ethnicCategory}</p>
                        <p className="mb-4">{recipe.description}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-8">
            {location.pathname === '/' && (
              <Link to="/all-recipes" className="no-underline">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  See all recipes
                </button>
              </Link>
            )}
          </div>
        </React.Fragment>
      )}
      <div className="text-center mt-8">
        {location.pathname === '/all-recipes' && (
          <React.Fragment>
            <Link to="/" className="no-underline">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Go to Homepage
              </button>
            </Link>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Recipes;
