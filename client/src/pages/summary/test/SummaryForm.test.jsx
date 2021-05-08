import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm.jsx";

test("Initial conditions", () => {
  render(<SummaryForm />);

  // The checkbox is disabled by default
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();

  // The button is disabled by default
  const button = screen.getByRole("button", { name: /confirm order/i });
  expect(button).toBeDisabled();
});

test("Checkbox enables button on first click and disables on second click", () => {
  render(<SummaryForm />);

  // Check the conditions
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  userEvent.click(checkbox);

  // The button is checked
  const button = screen.getByRole("button", { name: /confirm order/i });
  expect(button).toBeEnabled();

  // Uncheck the conditions
  userEvent.click(checkbox);

  // The button is disabled
  expect(button).toBeDisabled();
});

test("Popover responds to hover", async () => {
  render(<SummaryForm />);

  // Popover starts hidden out
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // Popover appears upon mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);

  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // Popover disappears when mouse out
  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});
