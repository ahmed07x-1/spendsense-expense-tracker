import type { Expense } from "../types/Expense";

interface Props {
  expenses: Expense[];
}

function AlertBox({ expenses }: Props) {
  const total = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const totals: Record<string, number> = {};

  expenses.forEach((expense) => {
    totals[expense.category] =
      (totals[expense.category] || 0) + expense.amount;
  });

  const topCategory = Object.keys(totals).reduce((a, b) =>
    totals[a] > totals[b] ? a : b
  );

  const percentage = Math.round(
    (totals[topCategory] / total) * 100
  );

  return (
    <div className="alert-box">
      <h3>⚠ Spending Alert</h3>

      <p>
        <strong>{topCategory}</strong> accounts for{" "}
        <strong>{percentage}%</strong> of your total spending.
      </p>

      <p>
        Consider reducing <strong>{topCategory}</strong> purchases to stay
        within your monthly budget.
      </p>
    </div>
  );
}

export default AlertBox;