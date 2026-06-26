import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterBar from "./FilterBar";

describe("FilterBar", () => {
  it("changes selected category", async () => {
    const user = userEvent.setup();

    const setSelected = vi.fn();

    render(
      <FilterBar
        selected="All"
        setSelected={setSelected}
      />
    );

    await user.selectOptions(
      screen.getByRole("combobox"),
      "Food"
    );

    expect(setSelected).toHaveBeenCalled();
  });
});