import { fireEvent, render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm.jsx";

test("Initial conditions", () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });

  // The checkbox is disabled by default
  expect(checkbox).not.toBeChecked();

  const button = screen.getByRole("button", { name: /confirm order/i });

  // The button is disabled by default
  expect(button).toBeDisabled();
});

test("Checkbox enables button on first click and disables on second click", () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });

  // Check the conditions
  fireEvent.click(checkbox);

  const button = screen.getByRole("button", { name: /confirm order/i });

  // The button is checked
  expect(button).toBeEnabled();

  // Uncheck the conditions
  fireEvent.click(checkbox);

  // The button is disabled
  expect(button).toBeDisabled();
});
