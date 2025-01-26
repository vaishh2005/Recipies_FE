import React, { useEffect, useState } from 'react';
import RecipeCard, { RecipeList } from '../components/RecipeCard';
import recipeService from '../services/recipeService'; // Replace with your service path
import './Home.css'

const Home = () => {
  const [recipes, setRecipes] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await recipeService.getAllRecipes(); // Fetch recipes
        const recipidata = response.data;
        // Reverse the order of data
        recipidata?.reverse();
        setRecipes(recipidata); // Set recipes from response
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
    <RecipeList recipes={recipes} type="common" /> {/* Corrected the prop name here */}
    </div>
  ); 
};

export default Home;
