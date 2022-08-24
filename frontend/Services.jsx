export default class RecipeService {
  static getCategories = async () => {
    const response = await fetch("/api/categories/");
    return await response.json();
  };

  static getRecipe = async (id) => {
    const response = await fetch(`/api/recipes/${id}/`);
    return await response.json();
  };

  static getMyRecipes = async () => {
    const response = await fetch(`/api/recipes`);
    return await response.json();
  };

  static getPublicRecipes = async () => {
    const response = await fetch(`/api/public_recipes`);
    return await response.json();
  };

  static getRecipeCategories = async (id) => {
    const response = await fetch(`/api/recipe_categories/${id}/`);
    return await response.json();
  };

  static postRecipe = async (data, csrftoken) => {
    const response = await fetch("/api/recipes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      credentials: "same-origin",
      body: JSON.stringify(data),
    });
    return await response.json();
  };
  static putRecipe = async (id, data, csrftoken) => {
    const response = await fetch(`/api/recipes/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  };
  static patchRecipe = async (id, data, csrftoken) => {
    const response = await fetch(`/api/recipes/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  };
  static deleteRecipe = async (id, csrftoken) => {
    return await fetch(`/api/recipes/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
    });
  };
}
