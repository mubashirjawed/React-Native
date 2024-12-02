import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RecipeContext = createContext();

export const useRecipes = () => useContext(RecipeContext);

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    loadSavedRecipes();
  }, []);

  const loadSavedRecipes = async () => {
    try {
      const savedRecipesJson = await AsyncStorage.getItem('savedRecipes');
      if (savedRecipesJson) {
        setSavedRecipes(JSON.parse(savedRecipesJson));
      }
    } catch (error) {
      console.error('Error loading saved recipes:', error);
    }
  };

  const saveRecipe = async (recipe) => {
    try {
      const updatedSavedRecipes = [...savedRecipes, recipe];
      setSavedRecipes(updatedSavedRecipes);
      await AsyncStorage.setItem('savedRecipes', JSON.stringify(updatedSavedRecipes));
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
  };

  const removeRecipe = async (recipeId) => {
    try {
      const updatedSavedRecipes = savedRecipes.filter(recipe => recipe.id !== recipeId);
      setSavedRecipes(updatedSavedRecipes);
      await AsyncStorage.setItem('savedRecipes', JSON.stringify(updatedSavedRecipes));
    } catch (error) {
      console.error('Error removing recipe:', error);
    }
  };

  const searchRecipes = async (query) => {
    // In a real app, this would be an API call
    const mockApiResponse = [
      { id: '1', title: 'Pasta Carbonara', ingredients: ['spaghetti', 'eggs', 'bacon', 'parmesan'], instructions: ['Cook pasta', 'Fry bacon', 'Mix eggs and cheese', 'Combine all ingredients'] },
      { id: '2', title: 'Chicken Curry', ingredients: ['chicken', 'curry powder', 'coconut milk', 'rice'], instructions: ['Cook chicken', 'Add curry powder', 'Pour in coconut milk', 'Serve with rice'] },
      { id: '3', title: 'Vegetable Stir Fry', ingredients: ['mixed vegetables', 'soy sauce', 'ginger', 'garlic'], instructions: ['Chop vegetables', 'Heat oil in wok', 'Stir fry vegetables', 'Add soy sauce and serve'] },
    ];
    
    const filteredRecipes = mockApiResponse.filter(recipe => 
      recipe.title.toLowerCase().includes(query.toLowerCase()) ||
      recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query.toLowerCase()))
    );
    
    setRecipes(filteredRecipes);
  };

  return (
    <RecipeContext.Provider value={{ recipes, savedRecipes, searchRecipes, saveRecipe, removeRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};

