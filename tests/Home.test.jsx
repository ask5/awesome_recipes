import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dashboard from "frontend/components/Dashboard";
import { BrowserRouter } from "react-router-dom";

test("loads home", async () => {
  const { getByText } = render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );
  const header = getByText(/Welcome to Awesome Recipes!/i);
  expect(header).toBeInTheDocument();
});
