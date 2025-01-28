import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MessageService from "../services/MessageService";
import { BASE_URL } from '../config/condif';
import "./RecipeCard.css"; // Make sure to import the CSS file

const RecipeCard = ({ recipe, type }) => {
  const [recipeType] = useState(type); // Use 'type' prop for state
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleViewRecipe = () => {
    navigate(`/recipe/${recipe._id}`); // Navigate to RecipeDetails page
  };

  const handleUpdateRecipe = () => {
    navigate(`/update/${recipe._id}`, { state: { recipe } }); // Pass recipe data if needed
  };

  const handleDeleteRecipe = async () => {
    // Ask for confirmation before proceeding
    const confirmation = window.confirm(
      "Are you sure you want to delete this recipe?"
    );
    if (!confirmation) return;

    try {
      const token = localStorage.getItem("token"); // Fetch token from local storage
      if (!token) {
        setMessage("Authentication token is missing! Please log in again.");
        setMessageType("error");
        setOpenSnackbar(true);
        return;
      }

      // Send DELETE request
      const response = await axios.delete(
        `${BASE_URL}/api/recipe/delete/${recipe._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Notify user of success using Snackbar
      setMessage(response.data.message || "Recipe deleted successfully!");
      setMessageType("success");
      setOpenSnackbar(true);

      // Navigate to home or refresh the list
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      // Check if error response exists and has a meaningful message
      const errorMessage =
        error.response?.data?.message || // API-provided error message
        error.message || // General error message
        "An error occurred while deleting the recipe."; // Default fallback

      // Log the error and show Snackbar
      console.error("Error deleting recipe:", errorMessage);
      setMessage(errorMessage);
      setMessageType("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <div className="recipe-card">
      <img src={recipe.image} alt={recipe.title} />
      <div className="recipe-card-content">
        <div className="recipe-card-title">{recipe.title}</div>
        <div className="recipe-card-description">
          {recipe.cuisine} | {recipe.difficulty}
        </div>
        <div className=".view-recipe-wrapper">
          <button className="view-recipe-button" onClick={handleViewRecipe}>
            View Recipe
          </button>
        </div>

        {recipeType === "user" && (
          <div className="recipe-button">
            <button className="view-recipe-button" onClick={handleUpdateRecipe}>
              Update Recipe
            </button>

            <button className="view-recipe-button" onClick={handleDeleteRecipe}>
              Delete Recipe
            </button>
            <MessageService
              message={message}
              type={messageType}
              open={openSnackbar}
              handleClose={handleCloseSnackbar}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const RecipeList = ({ recipes, type }) => {
  const [recipeList, setRecipeList] = useState(recipes);

  const handleDelete = (deletedId) => {
    // Filter out the deleted recipe
    setRecipeList(recipeList.filter((recipe) => recipe._id !== deletedId));
  };

  return (
    <div className="recipe-list-container">
      {recipeList.map((recipe) => (
        <RecipeCard
          key={recipe._id}
          recipe={recipe}
          type={type}
          onDelete={handleDelete} // Pass the handleDelete function
        />
      ))}
    </div>
  );
};

export default RecipeCard;
export { RecipeList };
