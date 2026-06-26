import type { Expense } from "../types/Expense";

interface Props {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (id: number) => void;
}

function ExpenseCard({
  expense,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div
      className={`expense-card ${expense.category.toLowerCase()}`}
    >
      <h2>{expense.category}</h2>

      <p>{expense.description}</p>

      <p>
        <strong>Date:</strong> {expense.date}
      </p>

      <p className="amount">
        ₹{expense.amount}
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
          gap: "10px",
        }}
      >
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
  );
}

export default ExpenseCard;