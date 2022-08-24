import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

function DisplayCategories({ categories }) {
  return (
    <>
      {categories && (
        <div>
          <h3>Categories</h3>
          {categories.length ? (
            <List dense>
              {categories.map((category) => (
                <ListItem key={category.id}>
                  <ListItemText primary={category.name} />
                </ListItem>
              ))}
            </List>
          ) : (
            <p>No Categories set yet</p>
          )}
        </div>
      )}
    </>
  );
}

export default DisplayCategories;
