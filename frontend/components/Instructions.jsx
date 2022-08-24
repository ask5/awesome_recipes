import React, { useState } from "react";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import { addInstruction, removeInstruction } from "frontend/redux/recipeSlice";
import { useDispatch, useSelector } from "react-redux";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemText from "@mui/material/ListItemText";
import PropTypes from "prop-types";

function Instructions(props) {
  const dispatch = useDispatch();
  const { recipe } = useSelector((state) => state["recipe"]);
  const [instruction, setInstruction] = useState("");
  const addInstructionHandler = () => {
    if (instruction) dispatch(addInstruction({ text: instruction }));
    setInstruction("");
  };

  const removeInstructionHandler = (index) => {
    dispatch(removeInstruction(index));
  };

  return (
    <div>
      <h3>Instructions</h3>
      <div>
        {props.editable && (
          <React.Fragment>
            <Input
              inputProps={{ maxLength: 255 }}
              value={instruction}
              onChange={(e) => {
                setInstruction(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e?.keyCode === 13) {
                  addInstructionHandler();
                }
              }}
            />
            <IconButton
              color="success"
              aria-label="add an instruction"
              onClick={addInstructionHandler}
            >
              <AddCircleOutlineSharpIcon />
            </IconButton>
          </React.Fragment>
        )}
        {recipe.instructions.length ? (
          <List dense disablePadding>
            {recipe?.instructions.map((item, index) => (
              <ListItem key={index}>
                {props.editable && (
                  <ListItemIcon>
                    <IconButton
                      value={index}
                      aria-label="remove instruction"
                      onClick={(e) => {
                        removeInstructionHandler(e.currentTarget.value);
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
          <p>No Instructions added.</p>
        )}
      </div>
    </div>
  );
}
Instructions.propTypes = {
  editable: PropTypes.bool,
};

Instructions.defaultProps = {
  editable: true,
};

export default Instructions;
