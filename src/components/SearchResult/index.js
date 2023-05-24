import React, { useState, useEffect } from "react";

import { searchRecipes } from "../../utils/API";
import { Link } from "react-router-dom";
import "./SearchResult.css";
import { Col, Row } from "react-bootstrap";
const SearchResult = ({ category, area, ingredient, mealName }) => {
  const [recipeList, setRecipeList] = useState([]);
  const [result, setResult] = useState("random");

  useEffect(() => {
    const getRecipe = async (query) => {
      try {
        const response = await searchRecipes(query);

        if (!response.ok) {
          throw new Error("something went wrong!");
        }

        const { meals } = await response.json();
        console.log(meals);

        if (meals !== null) setRecipeList(meals);
        else setRecipeList([]);
      } catch (err) {
        console.error(JSON.parse(JSON.stringify(err)));
      }
    };
  const searchByCategoryAndIngredient = () => {
   if (category !== "" && ingredient !== "") {
     getRecipe(`filter.php?c=${category}&i=${ingredient}`);
     setResult(`Category: ${category}, Ingredient: ${ingredient}`);
   } else if (category !== "") {
     getRecipe(`filter.php?c=${category}`);
     setResult(`Category: ${category}`);
   } else if (ingredient !== "") {
     getRecipe(`filter.php?i=${ingredient}`);
     setResult(`Ingredient: ${ingredient}`);
   } else {
     setResult("random");
   }
 };
    if (
      category === "" &&
      area === "" &&
      ingredient === "" &&
      mealName === ""
    ) {
      getRecipe(`randomselection.php`);
    } else if (area !== "") {
      getRecipe(`filter.php?a=${area}`);
      setResult(area);
    } else if (category !== "") {
      getRecipe(`filter.php?c=${category}`);
      setResult(category);
    } else if (ingredient !== "") {
      getRecipe(`filter.php?i=${ingredient}`);
      setResult(ingredient);
    } else if (mealName !== "") {
      getRecipe(`search.php?s=${mealName}`);
      setResult(mealName);
    } else if (category !== "" && ingredient !== "") {
     getRecipe(`filter.php?c=${category}&i=${ingredient}`);
     setResult(`Category: ${category}, Ingredient: ${ingredient}`);
   } else if (category !== "") {
     getRecipe(`filter.php?c=${category}`);
     setResult(`Category: ${category}`);
   } else if (ingredient !== "") {
     getRecipe(`filter.php?i=${ingredient}`);
     setResult(`Ingredient: ${ingredient}`);
   } else {
     setResult("random");
   }
  }, [category, area, ingredient, mealName]);

  return (
    <div className="recipe-results-container">
      <Row className="recipe-container">
        <p id="search-req">Showing results for "{result}"</p>
        {recipeList.map((recipe) => (
          <Col className="recipe-card" lg={5}>
            <Link to={`/recipe/${recipe.idMeal}`} key={recipe.idMeal}>
              <div key={recipe.idMeal}>
                <Row>
                  <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                </Row>
                <Row className="recipe-title">
                  <h4>{recipe.strMeal}</h4>
                </Row>
                <hr />
                <Row className="read-more-row">
                  <Link to={`/recipe/${recipe.idMeal}`} key={recipe.idMeal}>
                    Read more
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </Row>
              </div>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SearchResult;
