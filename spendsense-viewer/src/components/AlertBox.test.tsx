import { render, screen } from "@testing-library/react";
import AlertBox from "./AlertBox";

describe("AlertBox", () => {
  it("renders overspend alert", () => {
    render(
      <AlertBox
        expenses={[
          {
            id: 1,
            category: "Shopping",
            description: "Laptop",
            amount: 2000,
            date: "2025-06-25",
          },
        ]}
      />
    );

    expect(
      screen.getByText(/shopping/i)
    ).toBeInTheDocument();
  });
});