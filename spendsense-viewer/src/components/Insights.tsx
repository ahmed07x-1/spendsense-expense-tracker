import type { Expense } from "../types/Expense";

interface Props {
  expenses: Expense[];
}

function Insights({ expenses }: Props) {
  if (expenses.length === 0) {
    return null;
  }

  const highestExpense = expenses.reduce((prev, current) =>
    prev.amount > current.amount ? prev : current
  );

  const lowestExpense = expenses.reduce((prev, current) =>
    prev.amount < current.amount ? prev : current
  );

  const categoryTotals: Record<string, number> = {};

  expenses.forEach((expense) => {
    categoryTotals[expense.category] =
      (categoryTotals[expense.category] || 0) +
      expense.amount;
  });

  const topCategory = Object.keys(categoryTotals).reduce((a, b) =>
    categoryTotals[a] > categoryTotals[b] ? a : b
  );

  const average = Math.round(
    expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    ) / expenses.length
  );

  // Highest Spending Day
  const dayTotals: Record<string, number> = {};

  expenses.forEach((expense) => {
    dayTotals[expense.date] =
      (dayTotals[expense.date] || 0) +
      expense.amount;
  });

  const highestExpenseDay = Object.keys(dayTotals).reduce((a, b) =>
    dayTotals[a] > dayTotals[b] ? a : b
  );

  const suggestion =
    highestExpense.amount > average * 2
      ? "Large expenses detected. Consider reducing high-value purchases."
      : "Your spending pattern looks healthy.";

  return (
    <div className="insights-container">
      <h2 className="section-title">
        📈 Smart Insights
      </h2>

      <div className="insight-grid">
        <div className="insight-card ">
          <h3>🏆 Highest Expense</h3>
          <h2>₹{highestExpense.amount}</h2>
          <p>{highestExpense.description}</p>
        </div>

        <div className="insight-card">
          <h3>🟢 Lowest Expense</h3>
          <h2>₹{lowestExpense.amount}</h2>
          <p>{lowestExpense.description}</p>
        </div>

        <div className="insight-card">
          <h3>🍔 Top Category</h3>
          <h2>{topCategory}</h2>
          <p>Highest spending category</p>
        </div>

        <div className="insight-card">
          <h3>📊 Average Expense</h3>
          <h2>₹{average}</h2>
          <p>Per transaction</p>
        </div>

        <div className="insight-card">
          <h3>📅 Highest Spending Day</h3>
          <h2>{highestExpenseDay}</h2>
          <p>Day with the highest total spending</p>
        </div>

        <div className="insight-card full-card">
          <h3>🤖 AI Recommendation</h3>
          <p>{suggestion}</p>
        </div>
      </div>
    </div>
  );
}

export default Insights;