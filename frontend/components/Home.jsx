import React, { useEffect } from "react";
import Header from "frontend/components/Header";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Route, Routes } from "react-router-dom";
import Dashboard from "frontend/components/Dashboard";
import AddEditRecipe from "frontend/components/AddEditRecipe";
import MyRecipes from "frontend/components/MyRecipes";
import ViewRecipe from "frontend/components/ViewRecipe";
import Cookies from "js-cookie";
import { setCsrfToken } from "frontend/redux/recipeSlice";
import { useDispatch } from "react-redux";

function Home() {
  const dispatch = useDispatch();
  const csrf_token = Cookies.get("csrftoken");
  useEffect(() => {
    if (csrf_token) dispatch(setCsrfToken(csrf_token));
  }, [csrf_token, dispatch]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <Header />
        <main>
          <Routes>
            <Route path="/app/" element={<Dashboard />} />
            <Route path="/app/recipe/" element={<AddEditRecipe />} />
            <Route path="/app/recipes/:id/edit" element={<AddEditRecipe />} />
            <Route path="/app/recipes" element={<MyRecipes />} />
            <Route path="/app/recipes/:id" element={<ViewRecipe />} />
          </Routes>
        </main>
      </Container>
    </React.Fragment>
  );
}

export default Home;
