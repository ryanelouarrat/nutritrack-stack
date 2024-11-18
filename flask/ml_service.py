# app.py
from flask import Flask, request, jsonify
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

app = Flask(__name__)

# Load the preprocessed dataset
df = pd.read_parquet('recipes_preprocessed.parquet')

# List of macronutrient columns
macros = ['Calories', 'FatContent', 'CarbohydrateContent', 'ProteinContent']

# Convert macro columns to numpy arrays for faster computation
macro_values = df[macros].values.astype(float)

# Fit the CountVectorizer and transform the ingredients
vectorizer = CountVectorizer()
ingredient_matrix = vectorizer.fit_transform(df['Ingredients'].astype(str))

# Flask API endpoint for recommendations
@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    user_macros = data.get('user_macros', {})
    user_favorites = data.get('user_favorites', [])

    # Create user ingredient vector
    user_ingredient_vector = vectorizer.transform([' '.join(user_favorites)])

    # Compute Ingredient Similarity Scores
    ingredient_similarity = cosine_similarity(ingredient_matrix, user_ingredient_vector).flatten()

    # Compute Macronutrient Similarity
    user_macro_array = np.array([user_macros.get(macro, 0) for macro in macros], dtype=float)
    macro_difference = np.abs(macro_values - user_macro_array)
    macro_difference_sum = np.sum(macro_difference, axis=1)

    # Normalize macro differences
    max_macro_diff = np.max(macro_difference_sum)
    macro_similarity = 1 - (macro_difference_sum / max_macro_diff)

    # Combine Similarity Scores
    overall_score = 0.5 * ingredient_similarity + 0.5 * macro_similarity

    # Get top recommendations
    top_indices = np.argsort(-overall_score)[:10]
    top_recipes = df.iloc[top_indices]

    # Prepare the result
    recommendations = []
    for idx in range(len(top_recipes)):
        row = top_recipes.iloc[idx]
        recommendations.append({
            'name': row['Name'],
            'author': row.get('AuthorName', 'Unknown'),
            'date_published': row.get('DatePublished', ''),
            'prep_time': row.get('PrepTime', 0),
            'cook_time': row.get('CookTime', 0),
            'total_time': row.get('TotalTime', 0),
            'description': row.get('Description', ''),
            'images': row.get('Images', ''),
            'category': row.get('RecipeCategory', ''),
            'keywords': row.get('Keywords', ''),
            'ingredients': row['Ingredients'],
            'ingredient_quantities': row.get('RecipeIngredientQuantities', ''),
            'instructions': row.get('RecipeInstructions', ''),
            'calories': row['Calories'],
            'fat': row['FatContent'],
            'saturated_fat': row.get('SaturatedFatContent', 0),
            'cholesterol': row.get('CholesterolContent', 0),
            'sodium': row.get('SodiumContent', 0),
            'carbs': row['CarbohydrateContent'],
            'fiber': row.get('FiberContent', 0),
            'sugar': row.get('SugarContent', 0),
            'protein': row['ProteinContent'],
            'servings': row.get('RecipeServings', 1),
            'yield': row.get('RecipeYield', ''),
            'rating': row.get('AggregatedRating', 0),
            'review_count': row.get('ReviewCount', 0),
            'overall_score': float(overall_score[top_indices[idx]])
        })

    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
