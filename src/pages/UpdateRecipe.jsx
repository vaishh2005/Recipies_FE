import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Alert } from "@mui/material";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MessageService from "../services/MessageService";
import { BASE_URL } from '../config/condif';

const UpdateRecipe = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    ingredients: "",
    steps: "",
    cuisine: "",
    difficulty: "Easy",
  });
  const recipeId = useParams();
  const navigate = useNavigate();
  const [existingImage, setExistingImage] = useState(""); // To handle the existing image
  const [loading, setLoading] = useState(true); // To show a loading state
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message
  const [snackbarType, setSnackbarType] = useState("success"); // Success or error type for snackbar

  useEffect(() => {
    // Fetch the recipe data when the component mounts
    const fetchRecipe = async () => {
      console.log(recipeId);

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/recipe/${recipeId.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const recipe = response.data;
        setFormData({
          title: recipe.title,
          ingredients: recipe.ingredients,
          steps: recipe.steps,
          cuisine: recipe.cuisine,
          difficulty: recipe.difficulty,
        });
        setExistingImage(recipe.image); // Set the existing image
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipe:", error.message);
        alert("Failed to fetch recipe details.");
      }
    };

    fetchRecipe();
  }, [recipeId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        image: file, // Set the image to the state
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const formDataImage = new FormData();
      formDataImage.append("file", formData.image); // Add the image file
      formDataImage.append("upload_preset", "recipe-imgs"); // Your Cloudinary preset

      const cloudinaryResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/druir5yzf/image/upload",
        formDataImage
      );

      const imageUrl = cloudinaryResponse.data.secure_url;
      console.log(imageUrl);

      const token = localStorage.getItem("token");
      const updatedRecipeData = {
        title: formData.title,
        image: imageUrl, // This should be the Cloudinary URL if uploaded
        ingredients: formData.ingredients,
        steps: formData.steps,
        cuisine: formData.cuisine,
        difficulty: formData.difficulty,
      };

      const response = await axios.put(
        `${BASE_URL}/api/recipe/${recipeId.id}`,
        updatedRecipeData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSnackbarMessage("Recipe updated successfully!");
      setSnackbarType("success");
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error(
        "Error updating recipe:",
        error.response?.data || error.message
      );
      setSnackbarMessage("Failed to update recipe.");
      setSnackbarType("error");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (loading) return <CircularProgress />; // Show loading spinner while fetching recipe data

  return (
    <div className="update-recipe-container">
      <MessageService
        message={snackbarMessage}
        type={snackbarType}
        open={openSnackbar}
        handleClose={handleCloseSnackbar}
      />

      <Typography variant="h4" gutterBottom>
        Update Recipe
      </Typography>

      <form onSubmit={handleSubmit} className="update-recipe-form">
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <TextField
          label="Ingredients"
          variant="outlined"
          fullWidth
          margin="normal"
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          required
          multiline
          rows={4}
        />

        <TextField
          label="Steps"
          variant="outlined"
          fullWidth
          margin="normal"
          name="steps"
          value={formData.steps}
          onChange={handleChange}
          required
          multiline
          rows={4}
        />

        <TextField
          label="Cuisine"
          variant="outlined"
          fullWidth
          margin="normal"
          name="cuisine"
          value={formData.cuisine}
          onChange={handleChange}
          required
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Difficulty</InputLabel>
          <Select
            value={formData.difficulty}
            onChange={handleChange}
            name="difficulty"
            label="Difficulty"
          >
            <MenuItem value="Easy">Easy</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Hard">Hard</MenuItem>
          </Select>
        </FormControl>

        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ marginTop: "20px" }}
          />
          {existingImage && (
            <img
              src={existingImage}
              alt="Recipe"
              style={{ marginTop: "20px", width: "200px" }}
            />
          )}
        </div>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "20px" }}
        >
          Update Recipe
        </Button>
      </form>
    </div>
  );
};

export default UpdateRecipe;
