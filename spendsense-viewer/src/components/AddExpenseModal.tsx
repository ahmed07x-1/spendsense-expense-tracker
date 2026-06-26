import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { Expense } from "../types/Expense";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (expense: Expense) => void;
  editingExpense?: Expense | null;
}

function AddExpenseModal({
  isOpen,
  onClose,
  onAdd,
  editingExpense,
}: Props) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (editingExpense) {
      setDescription(editingExpense.description);
      setAmount(editingExpense.amount.toString());
      setCategory(editingExpense.category);
      setDate(editingExpense.date);
    } else {
      setDescription("");
      setAmount("");
      setCategory("Food");
      setDate("");
    }
  }, [editingExpense, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!description || !amount || !date) {
      toast.error("Please fill all fields!");
      return;
    }

    const expense: Expense = {
      id: editingExpense
        ? editingExpense.id
        : Date.now(),
      description,
      amount: Number(amount),
      category,
      date,
    };

    onAdd(expense);

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>
          {editingExpense
            ? "✏️ Edit Expense"
            : "➕ Add Expense"}
        </h2>

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Entertainment</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) =>
            setDate(e.target.value)
          }
        />

        <div className="modal-buttons">
          <button
            className="save-btn"
            onClick={handleSubmit}
          >
            {editingExpense
              ? "Update Expense"
              : "Save Expense"}
          </button>

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}

export default AddExpenseModal;