import type { Expense } from "../types/Expense";

interface Props {
  expenses: Expense[];
}

function MonthlyAnalytics({ expenses }: Props) {
  const monthlyTotal = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const budget = 12000;

  const percentage = Math.min(
    (monthlyTotal / budget) * 100,
    100
  );

  const remaining = budget - monthlyTotal;

  return (
    <div className="monthly-container">

      <h2 className="section-title">
        📅 Monthly Budget
      </h2>

      <div className="budget-card">

        <div className="budget-top">

          <div>
            <h3>Budget</h3>
            <h1>₹{budget}</h1>
          </div>

          <div>
            <h3>Spent</h3>
            <h1>₹{monthlyTotal}</h1>
          </div>

          <div>
            <h3>Remaining</h3>
            <h1>₹{remaining}</h1>
          </div>

        </div>

        <div className="progress">

          <div
            className="progress-fill"
            style={{
              width: `${percentage}%`,
            }}
          />

        </div>

        <p>{percentage.toFixed(1)}% Used</p>

      </div>

    </div>
  );
}

export default MonthlyAnalytics;