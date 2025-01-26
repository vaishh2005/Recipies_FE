import React, { useState } from "react";
import axios from "axios";
import "./AddRecipe.css";
import MessageService from "../services/MessageService";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(""); // Define message state
  const [messageType, setMessageType] = useState(""); // Define messageType state
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    ingredients: "",
    steps: "",
    cuisine: "",
    difficulty: "Easy",
  });

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

    try {
      if (!formData.image) {
        setMessage("Please select an image!"); // Set error message
        setMessageType("error");
        setOpen(true);
        return;
      }

      // Step 1: Upload image to Cloudinary
      const formDataImage = new FormData();
      formDataImage.append("file", formData.image); // Add the image file
      formDataImage.append("upload_preset", "recipe-imgs"); // Your Cloudinary preset

      const cloudinaryResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/druir5yzf/image/upload",
        formDataImage
      );

      const imageUrl = cloudinaryResponse.data.secure_url; // Get the image URL from Cloudinary

      // Step 2: Send recipe data to backend
      const updatedFormData = { ...formData, image: imageUrl };
      const token = localStorage.getItem("token"); // Get the user's token from localStorage

      const recipeResponse = await axios.post(
        "http://localhost:3000/api/recipe/adrecipe",
        updatedFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Recipe added successfully!"); // Set success message
      setMessageType("success");
      setOpen(true);
      navigate("/"); 

      setFormData({
        title: "",
        image: "",
        ingredients: "",
        steps: "",
        cuisine: "",
        difficulty: "Easy",
      });
    } catch (error) {
      console.error("Error adding recipe:", error.response?.data || error.message);
      setMessage("Failed to add recipe."); // Set error message
      setMessageType("error");
      setOpen(true);
    }
  };

  return (
    <div className="add-recipe-component">
      <div className="add-recipe-container">
        <h2>Add New Recipe</h2>
        <form onSubmit={handleSubmit} className="add-recipe-form">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange} // Make sure this function is properly defined
            required
          />
          <textarea
            name="ingredients"
            placeholder="Ingredients (comma-separated)"
            value={formData.ingredients}
            onChange={handleChange}
            required
          />
          <textarea
            name="steps"
            placeholder="Preparation Steps (comma-separated)"
            value={formData.steps}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="cuisine"
            placeholder="Cuisine Type"
            value={formData.cuisine}
            onChange={handleChange}
            required
          />
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <button type="submit">Add Recipe</button>
        </form>
        <MessageService
          message={message}
          type={messageType}
          open={open}
          handleClose={() => setOpen(false)}
        />
      </div>
    </div>
  );
};

export default AddRecipe;

