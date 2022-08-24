import React, { useState } from "react";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import DeleteIcon from "@mui/icons-material/Delete";
import { addIngredient, removeIngredient } from "frontend/redux/recipeSlice";
import { useDispatch, useSelector } from "react-redux";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import PropTypes from "prop-types";

function Ingredients(props) {
  const dispatch = useDispatch();
  const { recipe } = useSelector((state) => state["recipe"]);
  const [ingredient, setIngredient] = useState("");
  const addIngredientHandler = () => {
    if (ingredient) {
      dispatch(addIngredient({ text: ingredient }));
    }
    setIngredient("");
  };
  const removeIngredientHandler = (index) => {
    dispatch(removeIngredient(index));
  };

  return (
    <div>
      <h3>Ingredients</h3>
      <div>
        {props.editable && (
          <>
            <Input
              value={ingredient}
              onChange={(e) => {
                setIngredient(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e?.keyCode === 13) {
                  addIngredientHandler();
                }
              }}
            />
            <IconButton
              color="success"
              aria-label="add ingredient"
              onClick={addIngredientHandler}
            >
              <AddCircleOutlineSharpIcon />
            </IconButton>
          </>
        )}
        {recipe.ingredients.length ? (
          <List dense disablePadding>
            {recipe.ingredients.map((item, index) => (
              <ListItem key={index}>
                {props.editable && (
                  <ListItemIcon>
                    <IconButton
                      value={index}
                      aria-label="remove ingredient"
                      onClick={(e) => {
                        removeIngredientHandler(e.currentTarget.value);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemIcon>
                )}
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        ) : (
          <p>No Ingredients added</p>
        )}
      </div>
    </div>
  );
}

Ingredients.propTypes = {
  editable: PropTypes.bool,
};

Ingredients.defaultProps = {
  editable: true,
};

export default Ingredients;
