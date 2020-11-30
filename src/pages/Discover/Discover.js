import React, { useState, useEffect } from "react";
import Header from "../../Utilities/Header/Header";
import axios from "axios";
import { useInput } from "../../Utilities/Hooks/useInput";

import recipeStyles from "../../css/recipe.module.css";

function Discover() {
  const [meal, setMeal] = useState();
  const [meals, setMeals] = useState();
  const { value: search, bind: bindSearch, reset: resetSearch } = useInput("");

  function searchForMeals() {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/search.php?", {
        params: { s: search },
      })
      .then((result) => {
        if (result.status === 200) {
          setMeals(result.data.meals);
        }
      })
      .catch((e) => {
        // setIsError(true);
      });
  }

  const getMeals = () => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/search.php?f=b")
      .then((result) => {
        if (result.status === 200) {
          setMeals(result.data.meals);
        }
      })
      .catch((e) => {
        // setIsError(true);
      });
  };

  function SaveMeal() {
    let token = localStorage.getItem("tokens");
    token = token.slice(1, -1);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    let measurements = [];
    let mCount = 1;
    let ingredients = [];
    let iCount = 1;
    let sendMeal = meal[0];

    // maps mesurments and ingredients to arrays
    Object.keys(meal[0]).forEach(function (key, index) {
      if ((key === "strMeasure" + mCount) & (meal[0][key] !== "")) {
        measurements[mCount - 1] = meal[0][key];
        mCount++;
      }

      if ((key === "strIngredient" + iCount) & (meal[0][key] !== "")) {
        ingredients[iCount - 1] = meal[0][key];
        iCount++;
      }
    });

    Object.assign(sendMeal, { Ingredients: ingredients });
    Object.assign(sendMeal, { IngredientMeasurements: measurements });

    axios
      .post("http://localhost:8080/api/Meal-db-save", sendMeal, config)
      .then(function (response) {
        alert("Meal has been saved!");
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  }

  const setTheMeal = (m) => {
    setMeal([m]);
  };

  useEffect(() => {
  }, [meal]);

  useEffect(() => {
    getMeals();
  }, []);

  return (
    <>
      <Header />
      <div className={recipeStyles.searchContainer}>
        <input
          type="text"
          name="search"
          placeholder="search"
          {...bindSearch}
          className={recipeStyles.searchInput}
        />
        <button
          type="submit"
          className={recipeStyles.searchBtn}
          onClick={() => searchForMeals()}
        >
          Search
        </button>
      </div>
      <div className={recipeStyles.mealListContainer}>
        <table>
          <thead>
            <tr>
              <th>Meal</th>
              <th>catagory</th>
            </tr>
          </thead>
          <tbody>
            {meals ? (
              meals.map(function (data, idx) {
                return [
                  <tr onClick={() => setTheMeal(data)} key={idx}>
                    <td>
                      <p>{data.strMeal}</p>
                    </td>
                    <td>
                      <p>{data.strCategory}</p>
                    </td>
                  </tr>,
                ];
              })
            ) : (
              <div>
                <p>No Recipes where found!</p>
              </div>
            )}
          </tbody>
        </table>
      </div>

      <div className={recipeStyles.mealFocusContainer}>
        {meal ? (
          meal.map(function (data, idx) {
            let count = 1;
            return [
              <form key={data.idMeal}>
                <img
                  src={data.strMealThumb}
                  width="100%"
                  name="img"
                  id="id"
                  alt={data.strMeal}
                />

                <h2 className={recipeStyles.information}>{data.strMeal}</h2>
                <p className={recipeStyles.information}>
                  Catagory: {data.strCategory}
                </p>

                <h3 className={recipeStyles.information}>
                  Ingredients and mesurements:
                </h3>

                {/* Excuse the hard coding below */}
                {/* TODO: make below dynamic */}
                <div className={recipeStyles.information}>
                  <ul>
                    <li>
                      {data.strIngredient1} - {data.strMeasure1}
                    </li>
                    <li>
                      {data.strIngredient2} - {data.strMeasure2}
                    </li>
                    <li>
                      {data.strIngredient3} - {data.strMeasure3}
                    </li>
                    <li>
                      {data.strIngredient4} - {data.strMeasure4}
                    </li>
                    <li>
                      {data.strIngredient5} - {data.strMeasure5}
                    </li>
                    <li>
                      {data.strIngredient6} - {data.strMeasure6}
                    </li>
                    <li>
                      {data.strIngredient7} - {data.strMeasure7}
                    </li>
                    <li>
                      {data.strIngredient8} - {data.strMeasure8}
                    </li>
                  </ul>
                </div>

                <h3 className={recipeStyles.information}>Instructions</h3>

                <p className={recipeStyles.information}>
                  {data.strInstructions}
                </p>
                <button
                  type="button"
                  onClick={SaveMeal}
                  className={recipeStyles.funcBtn}
                >
                  Save
                </button>
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

export default Discover;
