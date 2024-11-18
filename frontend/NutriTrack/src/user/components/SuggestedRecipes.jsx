import React, { useRef, useState } from "react";
import styles from "../styles/SuggestedRecipes.module.css";

const SuggestedRecipes = ({ recipes }) => {
  const prioritizedRecipes = [...recipes].sort((a, b) =>
    b.images !== "character(0)" ? 1 : -1
  );

  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleStart = (e) => {
    setIsDragging(true);
    const pageX = e.type.includes("touch") ? e.touches[0].pageX : e.pageX;
    setStartX(pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  const handleMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const pageX = e.type.includes("touch") ? e.touches[0].pageX : e.pageX;
    const walk = (pageX - startX) * 2; // Adjust scroll speed
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleRecipeClick = (recipeName) => {
    const query = encodeURIComponent(recipeName);
    window.open(`https://www.google.com/search?q=${query}`, "_blank");
  };

  return (
    <div
      className={styles.carouselContainer}
      ref={carouselRef}
      onMouseDown={handleStart}
      onMouseLeave={handleEnd}
      onMouseUp={handleEnd}
      onMouseMove={handleMove}
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
      onTouchMove={handleMove}
    >
      {prioritizedRecipes.map((recipe, index) => (
        <div
          className={styles.recipeCard}
          key={index}
          onClick={() => handleRecipeClick(recipe.name)}
        >
          <div className={styles.cardContent}>
            <h4 className={styles.recipeName}>{recipe.name}</h4>
            <p className={styles.recipeCategory}>{recipe.category}</p>
            <div className={styles.macroInfo}>
              <p>Calories: {recipe.calories.toFixed(1)}</p>
              <p>Protein: {recipe.protein.toFixed(1)}g</p>
              <p>Fats: {recipe.fat.toFixed(1)}g</p>
              <p>Fiber: {recipe.fiber.toFixed(1)}g</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SuggestedRecipes;
