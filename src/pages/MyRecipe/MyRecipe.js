import React, { useState, useEffect } from "react";
import Header from "../../Utilities/Header/Header";
import axios from "axios";

import recipeStyles from "../../css/recipe.module.css";

function MyRecipe() {
  const [meal, setMeal] = useState();
  const [meals, setMeals] = useState();

  const fetchMeals = () => {
    let token = localStorage.getItem("tokens");
    token = token.slice(1, -1);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .get("http://localhost:8080/api/GetUserRecipes", config)
      .then((result) => {
        if (result.status === 200) {
          setMeals(result.data);
        }
      })
      .catch((e) => {
        // setIsError(true);
      });
  };

  const setTheMeal = (m) => {
    setMeal([m]);
  };

  // Call's the getMeals function and update the dom with a state change.
  useEffect(() => {
    fetchMeals();
  }, []);

  return (
    <>
      <Header />
      <div className={recipeStyles.blackBackground}>
        {meals ? (
          meals.map(function (data, idx) {
            return [
              <div
                key={idx}
                className={recipeStyles.mealSummaryCard}
                onClick={() => setTheMeal(data)}
                key={idx}
              >
                <img
                  src={data.meal_img_url}
                  width="200px"
                  name="img"
                  id="id"
                  alt={data.strMeal}
                />
              </div>,
            ];
          })
        ) : (
          <div>
            <p>You have no meals saved!</p>
          </div>
        )}
      </div>

      <div className={recipeStyles.divider}>
        {meal ? (
          meal.map(function (data, idx) {
            let count = 1;
            return [
              <form key={data.meal_name}>
                <div className={recipeStyles.dividerContain}>
                  <h2 className={recipeStyles.information}>{data.meal_name}</h2>
                  <p className={recipeStyles.information}>
                    Catagory: {data.food_catagory}
                  </p>

                  <div className={recipeStyles.informationT}>
                    <div className={recipeStyles.informationTM}>
                      <h3>Ingredients: </h3>
                      {data.ingredient.map(function (i) {
                        return [
                          <ul>
                            <li>{i}</li>
                          </ul>,
                        ];
                      })}
                    </div>
                    <div className={recipeStyles.informationTM}>
                      <h3>Measurements: </h3>
                      {data.ingredient_measurements.map(function (i) {
                        return [
                          <ul>
                            <li>{i}</li>
                          </ul>,
                        ];
                      })}
                    </div>
                  </div>

                  <h3 className={recipeStyles.information}>Instructions</h3>

                  <p className={recipeStyles.information}>
                    {data.instructions}
                  </p>
                </div>
              </form>,
            ];
          })
        ) : (
          <div className={recipeStyles.iDiv}>
            <h1>Please select a meal to display!</h1>
          </div>
        )}
      </div>
    </>
  );
}

export default MyRecipe;
