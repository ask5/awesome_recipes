import React, { useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCategory,
  deSelectCategory,
  getCategories,
} from "frontend/redux/recipeSlice";

function CategoryChooser({ selectedCategories }) {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state["recipe"]);

  const handleCheck = (category, e) => {
    if (e.target.checked) dispatch(selectCategory(category.id));
    else dispatch(deSelectCategory(category.id));
  };
  const checkSelected = (id) => {
    return selectedCategories?.includes(id);
  };
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div>
      <h3>Categories</h3>
      {categories?.length && (
        <List dense sx={{ width: "100%", maxWidth: 250 }}>
          {categories.map((category) => {
            const labelId = `checkbox-list-secondary-label-${category.id.toString()}`;
            return (
              <ListItem
                key={category.id}
                secondaryAction={
                  <Checkbox
                    checked={checkSelected(category.id)}
                    name={category.name}
                    onChange={(e) => handleCheck(category, e)}
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                }
                disablePadding
              >
                <ListItemButton>
                  <ListItemText id={labelId} primary={category.name} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      )}
    </div>
  );
}

export default CategoryChooser;
