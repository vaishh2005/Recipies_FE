import React, { useEffect, useState } from 'react';
import { RecipeList } from '../components/RecipeCard';  // Import RecipeList
import recipeService from '../services/recipeService'; // Replace with your service path
import './Home.css';

const Home = () => {
  const [recipes, setRecipes] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await recipeService.getAllRecipes(); // Fetch recipes
        const recipedata = response.data;
        recipedata?.reverse(); // Reverse the order of data
        setRecipes(recipedata); // Set recipes from response
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchRecipes();
  }, []);

  if (loading) return <p>Loading recipes...</p>; // Show loading state

  if (!Array.isArray(recipes)) return <p>No recipes available</p>; // Handle invalid response

  return (
    <div className='home'>
      {/* Pass recipes and type to RecipeList */}
      <RecipeList recipes={recipes} type="common" /> 
    </div>
  );
};

export default Home;

