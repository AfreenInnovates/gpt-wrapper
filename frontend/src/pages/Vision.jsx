import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Vision = () => {
  const location = useLocation();
  const taskTitle = location.state?.taskTitle || "Vision Task";

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!image) {
      alert("Please upload an image.");
      return;
    }
    
    setLoading(true);
    setRecipes([]);
    
    // Simulate processing time
    setTimeout(() => {
      generateRecipes();
      setLoading(false);
    }, 4000);
  };

  const generateRecipes = () => {
    const recipeList = [
      {
        name: "Healthy Pasta Salad",
        instructions: "Cook pasta. Chop lettuce, bell pepper, and broccoli. Mix with grapes and banana slices. Serve with a light dressing."
      },
      {
        name: "Banana-Grape Smoothie",
        instructions: "Blend banana, grapes, and a splash of wine for a refreshing smoothie."
      },
      {
        name: "Veggie Sandwich",
        instructions: "Slice bread and layer with lettuce, bell pepper, and broccoli. Serve with a side of grapes."
      },
      {
        name: "Garlic Broccoli Stir-fry",
        instructions: "Stir-fry broccoli with garlic and olive oil. Serve as a side dish or mix with pasta."
      },
      {
        name: "Red Pepper Bruschetta",
        instructions: "Toast bread slices and top with diced red bell pepper, olive oil, and herbs."
      }
    ];
    
    setRecipes(recipeList);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-blue-400 mb-8">{taskTitle}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 p-6 bg-gray-800 rounded-lg shadow-md w-96">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="p-3 border border-gray-600 rounded bg-gray-700 text-white w-full"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 px-6 py-2 rounded-lg font-semibold transition w-full text-center"
          disabled={loading}
        >
          {loading ? "Processing..." : "Upload & Generate Recipes"}
        </button>
      </form>
      {loading && <div className="mt-6 text-blue-400 animate-pulse text-lg">Loading...</div>}
      {recipes.length > 0 && (
        <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-md w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-green-400 mb-4">Generated Recipes</h2>
          <ul className="space-y-4">
            {recipes.map((recipe, index) => (
              <li key={index} className="p-4 bg-gray-700 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-yellow-400">{recipe.name}</h3>
                <p className="text-gray-300 mt-2">{recipe.instructions}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Vision;
