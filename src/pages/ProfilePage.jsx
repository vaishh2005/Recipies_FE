import React, { useEffect, useState } from 'react';
import { RecipeList } from '../components/RecipeCard';
import recipeService from '../services/recipeService';
import MessageService from '../services/MessageService';

const ProfilePage = () => {
  const [user, setUser] = useState(null); // User data (name, etc.)
  const [userRecipes, setUserRecipes] = useState([]); // Recipes added by the user
  const [loading, setLoading] = useState(true); // Loading state for the recipes
  const [message,setMssage]=useState("")
  const [messageType,setMessageType]=useState("")
  const [open, setOpen] = useState(false); // State to control the snackbar visibility
  

  useEffect(() => {
    const storedUser = localStorage.getItem('usrname');
    setUser(storedUser)
    fetchRecipes(storedUser)
  }, []);

    const fetchRecipes = async (storedUser) => {
      try {
        const response = await recipeService.getRecipesByUserName(storedUser); // Fetch recipes
        const recipidata = response.data;
        // Reverse the order of data
        if(recipidata.length>0){
          recipidata.reverse();
        setUserRecipes(recipidata); // Set recipes from response
        setMssage(" recipes found")
       setMessageType("success")
       setOpen(true);
        }else{
          setMssage("no recipes found")
          setMessageType("error")
          setOpen(true);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };



  if (loading) return <p>Loading profile...</p>; // Show loading state

  if (!user) return <p>No user found</p>; // Handle case where no user data is found

  return (
    <>
    {/* MessageService Snackbar */}
    <MessageService
        message={message}
        type={messageType}
        open={open}
        handleClose={() => setOpen(false)}
      />

    <div className="profile-page">
      <h1>{user}'s Profile</h1>
      <h3>Recipes added by {user}</h3>
      <RecipeList recipes={userRecipes} type="user" /> {/* Pass 'user' type to RecipeList */}
    </div>
    </>
    
  );
};

export default ProfilePage;
