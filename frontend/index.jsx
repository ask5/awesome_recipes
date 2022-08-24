import React from "react";
import ReactDOM from "react-dom";
import Home from "frontend/components/Home";
import { BrowserRouter } from "react-router-dom";
import { recipeStore } from "./redux/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={recipeStore}>
        <Home />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
