import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import userEvent from "@testing-library/user-event";
import OrderEntry from "../OrderEntry";

test("Handles errors for scoops and toppings routes", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry setOrderPhase={jest.fn()} />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});

test("Disable order button if there is no scoops ordered", async () => {
  render(<OrderEntry setOrderPhase={jest.fn()} />);

  // Check the confirm order button is disabled at first, even before options load
  let confirmOrderButton = screen.getByRole("button", {
    name: /order sundae/i,
  });
  expect(confirmOrderButton).toBeDisabled();

  // Expect button to be enabled after adding scoop
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(confirmOrderButton).toBeEnabled();

  // Expect button to be disabled after removing scoop
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "0");
  expect(confirmOrderButton).toBeDisabled();
});
