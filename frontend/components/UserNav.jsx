import React from "react";
import Stack from "@mui/material/Stack";

function UserNav() {
  const username = window?.username;
  const authenticated = username !== undefined;
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      {authenticated && (
        <React.Fragment>
          <span>Welcome {username}!</span>
          <a href="/app/recipes">My Recipes</a>
          <a href="/app/recipe">Post Recipe</a>
          <a href="/app/logout">Logout</a>
        </React.Fragment>
      )}
      {!authenticated && (
        <React.Fragment>
          <a href="/app/register">Register</a>
          <a href="/user/login">Login</a>
        </React.Fragment>
      )}
    </Stack>
  );
}

export default UserNav;
