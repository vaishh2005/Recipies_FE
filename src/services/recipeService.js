import axios from 'axios';

// Set the base URL for the API
const API_URL = 'http://localhost:3000/api/recipe'; // Update this with your backend URL if different

// Fetch all recipes
const getAllRecipes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error; // Rethrow the error for the caller to handle
  }
};


const getRecipesByUserName = async (userName) => {
  try {
    // Get the token from localStorage (or wherever it is stored)
    const token = localStorage.getItem('token'); 

    // Send the userName in the body and include the bearer token in the headers
    const response = await axios.post(
      `${API_URL}/user`, 
      { userName },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Adding the Bearer token in headers
        },
      }
    );
    return response
  } catch (error) {
    console.error('Error fetching recipes:', error);
  }
};

// Fetch a single recipe by ID
const getRecipeById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response;
  } catch (error) {
    console.error(`Error fetching recipe with id ${id}:`, error);
    throw error;
  }
};

// Add a new recipe
const addRecipe = async (recipeData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Pass the JWT token for authentication
      },
    };
    const response = await axios.post(API_URL, recipeData, config);
    return response;
  } catch (error) {
    console.error('Error adding recipe:', error);
    throw error;
  }
};

// Update an existing recipe
const updateRecipe = async (id, updatedData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(`${API_URL}/${id}`, updatedData, config);
    return response;
  } catch (error) {
    console.error(`Error updating recipe with id ${id}:`, error);
    throw error;
  }
};

// Delete a recipe
const deleteRecipe = async (id, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(`${API_URL}/${id}`, config);
    return response;
  } catch (error) {
    console.error(`Error deleting recipe with id ${id}:`, error);
    throw error;
  }
};

const recipeService = {
  getAllRecipes,
  getRecipeById,
  getRecipesByUserName,
  addRecipe,
  updateRecipe,
  deleteRecipe,
};

export default recipeService;
