import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Home from "../components/pages/Home";

test("renders the component with expected text", () => {
  render(<Home />);

  const expectedText = /main/i;
  const element = screen.getByText(expectedText);

  expect(element).toBeInTheDocument();
});
