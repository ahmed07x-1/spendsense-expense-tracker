import { render, screen } from "@testing-library/react";
import ExpenseCard from "./ExpenseCard";

describe("ExpenseCard", () => {
  it("renders expense details", () => {
    render(
      <ExpenseCard
        expense={{
          id: 1,
          date: "2025-06-25",
          category: "Food",
          description: "Burger",
          amount: 250,
        }}
      />
    );

    expect(screen.getByText("Burger")).toBeInTheDocument();
    expect(screen.getByText("Food")).toBeInTheDocument();
    expect(screen.getByText(/250/)).toBeInTheDocument();
  });
});