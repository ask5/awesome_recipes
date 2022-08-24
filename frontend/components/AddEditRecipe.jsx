import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import CategoryChooser from "frontend/components/CategoryChooser";
import Ingredients from "frontend/components/Ingredients";
import Instructions from "frontend/components/Instructions";
import { Divider } from "@mui/material";
import Button from "@mui/material/Button";
import {
  setName,
  setNotes,
  setServingSize,
  setPublic,
  createRecipe,
  getRecipe,
  updateRecipe,
} from "frontend/redux/recipeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function AddEditRecipe() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { recipe, created, updated } = useSelector((state) => state["recipe"]);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getRecipe(id));
    }
  }, [id]);

  const handleName = (e) => {
    if (e.target.value) {
      dispatch(setName(e.target.value));
    }
  };
  const handleNotes = (e) => {
    if (e.target.value) {
      dispatch(setNotes(e.target.value));
    }
  };
  const handleServingSize = (e) => {
    if (e.target.value) {
      dispatch(setServingSize(e.target.value));
    }
  };
  const handlePublic = (e) => {
    dispatch(setPublic(e.target.checked));
  };

  const handleSave = (e) => {
    if (recipe.name && recipe.serving_size) {
      if (id) {
        dispatch(updateRecipe());
      } else dispatch(createRecipe());
    }
  };

  useEffect(() => {
    if (created || updated) {
      navigate("/app/recipes");
    }
  }, [created, updated]);

  return (
    <Box component="form" noValidate autoComplete="off">
      <Stack spacing={2}>
        <h2>{recipe?.id ? <>Update Recipe</> : <>Post Recipe</>}</h2>
        <div>
          <TextField
            id="standard-basic"
            required
            label="Name"
            variant="standard"
            value={recipe.name}
            onChange={handleName}
            inputProps={{ maxLength: 100 }}
          />
        </div>
        <div>
          <TextareaAutosize
            label="Note"
            minRows={5}
            maxRows={8}
            placeholder="Notes"
            onChange={handleNotes}
            inputProps={{ maxLength: 500 }}
            value={recipe.notes}
            style={{ width: 600 }}
          />
        </div>
        <div>
          <TextField
            id="standard-basic"
            required
            label="Serving Size"
            variant="standard"
            value={recipe.serving_size}
            inputProps={{ maxLength: 4 }}
            onChange={handleServingSize}
          />
        </div>
        <div>
          <FormControlLabel
            control={<Switch checked={recipe.public} onChange={handlePublic} />}
            label="Public"
          />
        </div>
      </Stack>
      <Box width="500px">
        <Ingredients />
        <Instructions />
        <CategoryChooser selectedCategories={recipe.categories} />
      </Box>
      <Divider orientation="horizontal" variant="middle" />
      <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
        <Stack spacing={2} direction="row">
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
          <Button variant="contained">Cancel</Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default AddEditRecipe;
