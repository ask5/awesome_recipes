import { configureStore } from "@reduxjs/toolkit";
import recipeSlice from "frontend/redux/recipeSlice";

export const recipeStore = configureStore({
  reducer: {
    recipe: recipeSlice,
  },
});
