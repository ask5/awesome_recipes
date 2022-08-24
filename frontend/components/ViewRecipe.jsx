import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider, Stack, Box } from "@mui/material";
import Ingredients from "frontend/components/Ingredients";
import { getRecipe, getRecipeCategories } from "frontend/redux/recipeSlice";
import { useParams } from "react-router-dom";
import Instructions from "frontend/components/Instructions";
import DisplayCategories from "./DisplayCategories";

function ViewRecipe() {
  const dispatch = useDispatch();
  const { recipe, recipe_category_names } = useSelector(
    (state) => state["recipe"]
  );
  const { id } = useParams();

  useEffect(() => {
    dispatch(getRecipe(id));
    dispatch(getRecipeCategories(id));
  }, [id]);

  return (
    <React.Fragment>
      {recipe && (
        <Box>
          <Stack spacing={2}>
            <h2>{recipe.name}</h2>
            <div>Serving Size: {recipe.serving_size}</div>
            <Divider />
            <DisplayCategories categories={recipe_category_names?.categories} />
            <Ingredients editable={false} />
            <Instructions editable={false} />
            {recipe.notes && (
              <div>
                <Divider />
                <h3>Notes</h3>
                <div>{recipe.notes}</div>
              </div>
            )}
          </Stack>
        </Box>
      )}
    </React.Fragment>
  );
}

export default ViewRecipe;
