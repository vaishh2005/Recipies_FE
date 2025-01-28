import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './RecipeDetails.css';
import { BASE_URL } from '../config/condif';

const RecipeDetails = () => {
  const { id } = useParams();  // Get the 'id' from the URL
  const [recipe, setRecipe] = useState(null);  // State to hold recipe data

  // Fetch recipe data when the component mounts or the 'id' changes
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        // Make a GET request to fetch the recipe by 'id'
        const response = await axios.get(`${BASE_URL}/api/recipe/${id}`);
        setRecipe(response.data);  // Set the recipe data to state
      } catch (error) {
        console.error('Error fetching recipe details:', error.message);
      }
    };

    fetchRecipe();
  }, [id]);  // Re-fetch when the 'id' changes

  // Show loading message if recipe is still being fetched
  if (!recipe) return <p>Loading...</p>;

  // Return the recipe details if data is available
  return (
    <div className="recipe-details-container">
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} />
      <h3>Cuisine: {recipe.cuisine}</h3>
      <h3>Difficulty: {recipe.difficulty}</h3>
      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Steps:</h3>
      <ol>
        {recipe.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeDetails;
