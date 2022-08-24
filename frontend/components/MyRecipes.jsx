import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRecipe,
  getMyRecipes,
  patchRecipe,
} from "frontend/redux/recipeSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import Switch from "@mui/material/Switch";
import { Button } from "@mui/material";

function MyRecipes() {
  const dispatch = useDispatch();
  const { my_recipes, patched } = useSelector((state) => state["recipe"]);
  const columns = [
    "id",
    "Name",
    "Edit",
    "Public",
    "Date Added",
    "Date Modified",
    "Delete",
  ];

  useEffect(() => {
    dispatch(getMyRecipes());
  }, [dispatch]);

  useEffect(() => {
    if (patched) dispatch(getMyRecipes());
  }, [dispatch, patched]);

  const togglePublic = (r) => {
    dispatch(
      patchRecipe({
        id: r.id,
        data: { public: !r.public },
      })
    );
  };

  const handleDelete = (r) => {
    let confirmed = confirm("Are you sure?");
    if (confirmed) dispatch(deleteRecipe({ id: r.id }));
  };

  return (
    <div>
      <h3>My Recipes</h3>
      {my_recipes && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell key={index}>{column}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {my_recipes.map((recipe) => (
                <TableRow
                  key={recipe.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{recipe.id}</TableCell>
                  <TableCell component="th" scope="row">
                    <Link to={`/app/recipes/${recipe.id}`}>{recipe.name}</Link>
                  </TableCell>
                  <TableCell>
                    <Link to={`/app/recipes/${recipe.id}/edit/`}>Edit</Link>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={recipe.public}
                      onChange={() => {
                        togglePublic(recipe);
                      }}
                    />
                  </TableCell>
                  <TableCell>{recipe.date_added}</TableCell>
                  <TableCell>{recipe.date_modified}</TableCell>
                  <TableCell>
                    <Button
                      color="error"
                      onClick={() => {
                        handleDelete(recipe);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {my_recipes && !my_recipes.length && <p>No recipes found</p>}
    </div>
  );
}

export default MyRecipes;
