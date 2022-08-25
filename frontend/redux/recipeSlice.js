import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import RecipeService from "../Services";

const initialState = {
  recipe: {
    id: "",
    name: "",
    notes: "",
    serving_size: "",
    public: false,
    categories: [],
    ingredients: [],
    instructions: [],
  },
  categories: [],
  recipe_category_names: [],
  my_recipes: [],
  public_recipes: [],
  loading: false,
  csrftoken: "",
  patched: false,
  created: false,
  updated: false,
};

export const getCategories = createAsyncThunk(
  "get/categories",
  async (thunkAPI) => {
    return await RecipeService.getCategories();
  }
);

export const getPublicRecipes = createAsyncThunk(
  "get/public_recipes",
  async () => {
    return await RecipeService.getPublicRecipes();
  }
);

export const getMyRecipes = createAsyncThunk("get/my_recipes", async (id) => {
  return await RecipeService.getMyRecipes();
});

export const getRecipe = createAsyncThunk("get/recipe", async (id) => {
  return await RecipeService.getRecipe(id);
});

export const getRecipeCategories = createAsyncThunk(
  "get/recipeCategories",
  async (id) => {
    return await RecipeService.getRecipeCategories(id);
  }
);

export const createRecipe = createAsyncThunk(
  "create/recipe",
  async (args, { getState }) => {
    const state = getState();
    let data = state["recipe"].recipe;
    let token = state["recipe"].csrftoken;
    return await RecipeService.postRecipe(data, token);
  }
);

export const updateRecipe = createAsyncThunk(
  "update/recipe",
  async (args, { getState }) => {
    const state = getState();
    let id = state["recipe"].recipe.id;
    let data = state["recipe"].recipe;
    let token = state["recipe"].csrftoken;
    return await RecipeService.putRecipe(id, data, token);
  }
);

export const patchRecipe = createAsyncThunk(
  "patch/recipe",
  async (args, { getState }) => {
    const state = getState();
    return await RecipeService.patchRecipe(
      args.id,
      args.data,
      state["recipe"].csrftoken
    );
  }
);

export const deleteRecipe = createAsyncThunk(
  "delete/recipe",
  async (args, { getState }) => {
    const state = getState();
    return await RecipeService.deleteRecipe(args.id, state["recipe"].csrftoken);
  }
);

export const recipeSlice = createSlice({
  name: "recipe",
  initialState: initialState,
  reducers: {
    setCsrfToken: (state, action) => {
      state.csrftoken = action.payload;
    },
    setName: (state, action) => {
      state.recipe.name = action.payload;
    },
    setNotes: (state, action) => {
      state.recipe.notes = action.payload;
    },
    setServingSize: (state, action) => {
      state.recipe.serving_size = action.payload;
    },
    setPublic: (state, action) => {
      state.recipe.public = action.payload;
    },
    addInstruction: (state, action) => {
      state.recipe.instructions.push(action.payload);
    },
    removeInstruction: (state, action) => {
      state.recipe.instructions.splice(action.payload, 1);
    },
    addIngredient: (state, action) => {
      state.recipe.ingredients.push(action.payload);
    },
    removeIngredient: (state, action) => {
      state.recipe.ingredients.splice(action.payload, 1);
    },
    selectCategory: (state, action) => {
      state.recipe.categories.push(action.payload);
    },
    deSelectCategory: (state, action) => {
      const index = state.recipe.categories.indexOf(action.payload);
      if (index > -1) {
        state.recipe.categories.splice(index, 1);
      }
    },
    resetRecipe: (state, action) => {
      state.recipe = initialState.recipe;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(getRecipe.pending, (state, action) => {
      state.recipe_category_names = [];
    });

    builder.addCase(getRecipe.fulfilled, (state, action) => {
      state.recipe = action.payload;
      state.create = false;
      state.updated = false;
    });

    builder.addCase(getPublicRecipes.fulfilled, (state, action) => {
      state.public_recipes = action.payload;
    });

    builder.addCase(getRecipeCategories.fulfilled, (state, action) => {
      state.recipe_category_names = action.payload;
    });

    builder.addCase(createRecipe.fulfilled, (state, action) => {
      state.created = true;
    });
    builder.addCase(updateRecipe.fulfilled, (state, action) => {
      state.updated = true;
    });
    builder.addCase(patchRecipe.fulfilled, (state, action) => {
      state.patched = true;
    });
    builder.addCase(deleteRecipe.fulfilled, (state, action) => {
      state.patched = true;
    });
    builder.addCase(getMyRecipes.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getMyRecipes.fulfilled, (state, action) => {
      state.my_recipes = action.payload;
      state.loading = false;
      state.patched = false;
    });
  },
});

export const {
  setCsrfToken,
  setName,
  setNotes,
  setServingSize,
  setPublic,
  addInstruction,
  removeInstruction,
  addIngredient,
  removeIngredient,
  selectCategory,
  deSelectCategory,
  resetRecipe,
} = recipeSlice.actions;

export default recipeSlice.reducer;
