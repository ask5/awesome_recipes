/**
 * @jest-environment jsdom
 */
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dashboard from "../components/Dashboard";
import DisplayCategories from "../components/DisplayCategories";

test("renders dashboard component", async () => {
  const { getByText } = render(<Dashboard />);
  expect(getByText(/Welcome to Awesome Recipes!/i)).toBeInTheDocument();
});

test("renders categories", async () => {
  let categories = [
    {
      id: 1,
      name: "Breakfast",
    },
    {
      id: 2,
      name: "Lunch",
    },
  ];
  const { getByText } = render(<DisplayCategories categories={categories} />);
  expect(getByText(/Breakfast/i)).toBeInTheDocument();
});
