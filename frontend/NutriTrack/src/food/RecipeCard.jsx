// src/food/RecipeCard.jsx

import React from "react";
import { Card } from "react-bootstrap";
import styles from "./RecipeCard.module.css"; // Create and adjust this CSS module as needed

function RecipeCard({ recipe }) {
  return (
    <Card style={{ width: "18rem", margin: "10px" }} className={styles.recipeCard}>
      {recipe.images && recipe.images.length > 0 && (
        <Card.Img variant="top" src={recipe.images[0]} alt={recipe.name} />
      )}
      <Card.Body>
        <Card.Title>{recipe.name}</Card.Title>
        <Card.Text>
          {/* Add any additional recipe details here */}
          Calories: {recipe.calories} kcal<br />
          Protein: {recipe.protein} g<br />
          Carbs: {recipe.carbs} g<br />
          Fats: {recipe.fats} g
        </Card.Text>
        {/* You can add more buttons or links if needed */}
      </Card.Body>
    </Card>
  );
}

export default RecipeCard;
