import type { Expense } from "../types/Expense";

interface Props {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: number) => void;
}

function ExpenseList({
  expenses,
  onEdit,
  onDelete,
}: Props) {
  if (expenses.length === 0) {
    return (
      <div className="empty-state">
        <h2>😕 No expenses found</h2>
        <p>Try another category or search keyword.</p>
      </div>
    );
  }

  const getIcon = (category: string) => {
    switch (category) {
      case "Shopping":
        return "🛍";
      case "Food":
        return "🍔";
      case "Travel":
        return "✈";
      case "Entertainment":
        return "🎮";
      default:
        return "💳";
    }
  };

  const getClass = (category: string) => {
    switch (category.toLowerCase()) {
      case "shopping":
        return "shopping";

      case "food":
        return "food";

      case "travel":
        return "travel";

      case "entertainment":
        return "entertainment";

      default:
        return "";
    }
  };

  return (
    <>
      <h2 className="section-title">
        💳 Recent Expenses
      </h2>

      <div className="expense-grid">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className={`expense-card fade-up fade-delay-${
              expense.id % 5
            } ${getClass(expense.category)}`}
          >
            <span className="category-badge">
              {getIcon(expense.category)} {expense.category}
            </span>

            <h3>{expense.description}</h3>

            <div className="amount">
              ₹{expense.amount.toLocaleString()}
            </div>

            <p className="expense-date">
              📅{" "}
              {new Date(expense.date).toLocaleDateString(
                "en-GB",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              )}
            </p>

          <div className="expense-actions">
              <button
                className="edit-btn"
                onClick={() => onEdit(expense)}
              >
                ✏ Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => onDelete(expense.id)}
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ExpenseList;