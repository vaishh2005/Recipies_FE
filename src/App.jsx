import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import AddRecipe from './pages/AddRecipe';
import Login from './pages/Login';
import RecipeDetails from './pages/RecipeDetails';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProfilePage from './pages/ProfilePage';
import ChangePassword from './pages/ChnagePassword';
import UpdateRecipe from './pages/UpdateRecipe';
import AuthProvider from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/manage-profile" element={<ProfilePage />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/update/:id" element={<UpdateRecipe />} />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;



