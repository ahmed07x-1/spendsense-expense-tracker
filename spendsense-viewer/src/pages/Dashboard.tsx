import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ExpenseList from "../components/ExpenseList";
import FilterBar from "../components/FilterBar";
import AlertBox from "../components/AlertBox";
import ExpenseChart from "../components/ExpenseChart";
import StatsCards from "../components/StatsCards";
import Reports from "../components/Reports";
import Insights from "../components/Insights";
import MonthlyAnalytics from "../components/MonthlyAnalytics";
import AddExpenseModal from "../components/AddExpenseModal";
import toast from "react-hot-toast";
import Loading from "../components/Loading";

import type { Expense } from "../types/Expense";

function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);

  const [selected, setSelected] = useState("All");
  const [month, setMonth] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Newest");

  const [theme, setTheme] = useState(() => {
  return localStorage.getItem("theme") || "dark";
});
  const [showModal, setShowModal] = useState(false);

  const [editingExpense, setEditingExpense] =
  useState<Expense | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

useEffect(() => {
 const savedExpenses = localStorage.getItem("expenses");

  if (savedExpenses) {
  setExpenses(JSON.parse(savedExpenses));
    setLoading(false);
   return;
  }

  axios
    .get("/expenses.json")
    .then((response) => {

  setTimeout(() => {

    setExpenses(response.data);

    localStorage.setItem(
      "expenses",
      JSON.stringify(response.data)
    );

    setLoading(false);

  }, 2000);

})
    .catch(() => {
      setError("Unable to load expenses.");
      setLoading(false);
    });
}, []);

  useEffect(() => {
    let data = [...expenses];

    // Category Filter
   if (selected !== "All") {
  data = data.filter(
    (expense) => expense.category === selected
  );
}

if (month !== "All") {
  data = data.filter((expense) => {
    const expenseMonth =
      new Date(expense.date).getMonth() + 1;

    return expenseMonth === Number(month);
  });
}

    // Search
    if (search.trim() !== "") {
      data = data.filter((expense) => {
        return (
          expense.description
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          expense.category
            .toLowerCase()
            .includes(search.toLowerCase())
        );
      });
    }

    // Sorting
    switch (sortBy) {
      case "AmountLow":
        data.sort((a, b) => a.amount - b.amount);
        break;

      case "AmountHigh":
        data.sort((a, b) => b.amount - a.amount);
        break;

      case "Oldest":
        data.sort(
          (a, b) =>
            new Date(a.date).getTime() -
            new Date(b.date).getTime()
        );
        break;

      default:
        data.sort(
          (a, b) =>
            new Date(b.date).getTime() -
            new Date(a.date).getTime()
        );
    }

    setFilteredExpenses(data);
 }, [expenses, selected, month, search, sortBy]);

 useEffect(() => {
  localStorage.setItem("theme", theme);
}, [theme]);

  const totalExpense = useMemo(() => {
    return filteredExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
  }, [filteredExpenses]);

  const averageExpense = useMemo(() => {
    if (filteredExpenses.length === 0) return 0;

    return Math.round(
      totalExpense / filteredExpenses.length
    );
  }, [filteredExpenses, totalExpense]);

  const categoryTotals = useMemo(() => {
    const totals: Record<string, number> = {};

    filteredExpenses.forEach((expense) => {
      totals[expense.category] =
        (totals[expense.category] || 0) +
        expense.amount;
    });

    return totals;
  }, [filteredExpenses]);

  const topCategory = useMemo(() => {
    const keys = Object.keys(categoryTotals);

    if (keys.length === 0) return "N/A";

    return keys.reduce((a, b) =>
      categoryTotals[a] > categoryTotals[b]
        ? a
        : b
    );
  }, [categoryTotals]);

  const highestExpense = useMemo(() => {
    if (filteredExpenses.length === 0) return null;

    return [...filteredExpenses].sort(
      (a, b) => b.amount - a.amount
    )[0];
  }, [filteredExpenses]);

  const lowestExpense = useMemo(() => {
    if (filteredExpenses.length === 0) return null;

    return [...filteredExpenses].sort(
      (a, b) => a.amount - b.amount
    )[0];
  }, [filteredExpenses]);

  const showAlert =
    (categoryTotals["Shopping"] || 0) >
    totalExpense * 0.3;

    const handleAddExpense = (expense: Expense) => {
  let updatedExpenses: Expense[];

  if (editingExpense) {
    updatedExpenses = expenses.map((item) =>
      item.id === expense.id ? expense : item
    );

    setEditingExpense(null);
  } else {
    updatedExpenses = [...expenses, expense];
  }

  setExpenses(updatedExpenses);

  localStorage.setItem(
    "expenses",
    JSON.stringify(updatedExpenses)
  );
  if (editingExpense) {
  toast.success("Expense updated successfully! ✏️");
} else {
  toast.success("Expense added successfully! 🎉");
}
};

const handleDeleteExpense = (id: number) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this expense?"
  );

  if (!confirmDelete) return;

  const updatedExpenses = expenses.filter(
    (expense) => expense.id !== id
  );

  setExpenses(updatedExpenses);

  localStorage.setItem(
    "expenses",
    JSON.stringify(updatedExpenses)
  );
  toast.success("Expense deleted successfully! 🗑");
};

const handleEditExpense = (expense: Expense) => {
  setEditingExpense(expense);
  setShowModal(true);
};
  if (loading) {
  return <Loading />;
}

  if (error) {
    return (
      <div className="error">
        {error}
      </div>
    );
  }
    return (
    <div className={`layout ${theme}`}>
      <Sidebar />

      <div className="content">

        <Header
          theme={theme}
          setTheme={setTheme}
        />

        {/* KPI CARDS */}

      <StatsCards
  totalExpense={Number(totalExpense) || 0}
  totalTransactions={Number(filteredExpenses.length) || 0}
  averageExpense={Number(averageExpense) || 0}
  topCategory={topCategory || "N/A"}
  highestExpense={Number(highestExpense?.amount ?? 0)}
  lowestExpense={Number(lowestExpense?.amount ?? 0)}
/>
<div
  style={{
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "20px",
  }}
>
  <button
  className="add-btn"
  onClick={() => setShowModal(true)}
>
  ➕ Add Expense
</button>
</div>

        {/* SEARCH + FILTER + SORT */}

        <section className="controls">

          <input
            type="text"
            placeholder="🔍 Search expenses..."
            className="search-box"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
<FilterBar
  selected={selected}
  setSelected={setSelected}
/>

{/* Month Filter */}

<select
  value={month}
  onChange={(e) => setMonth(e.target.value)}
>
  <option value="All">All Months</option>
  <option value="1">January</option>
  <option value="2">February</option>
  <option value="3">March</option>
  <option value="4">April</option>
  <option value="5">May</option>
  <option value="6">June</option>
  <option value="7">July</option>
  <option value="8">August</option>
  <option value="9">September</option>
  <option value="10">October</option>
  <option value="11">November</option>
  <option value="12">December</option>
</select>

{/* Sort */}

<select
  value={sortBy}
  onChange={(e) => setSortBy(e.target.value)}
>
  <option value="Newest">
    Newest First
  </option>

  <option value="Oldest">
    Oldest First
  </option>

  <option value="AmountHigh">
    Amount High → Low
  </option>

  <option value="AmountLow">
    Amount Low → High
  </option>
</select>

</section>

        {/* ALERT */}

        {showAlert && (
          <AlertBox
            expenses={filteredExpenses}
          />
        )}

        {/* ANALYTICS */}

        <section id="analytics">

          <ExpenseChart
            expenses={filteredExpenses}
          />

        </section>
        {/* MONTHLY BUDGET */}

        <MonthlyAnalytics
    expenses={filteredExpenses}
/>

        {/* INSIGHTS */}

        <Insights
    expenses={filteredExpenses}
/>

        {/* REPORTS */}

        <Reports
    totalExpense={totalExpense}
    averageExpense={averageExpense}
    highestExpense={highestExpense?.amount ?? 0}
    lowestExpense={lowestExpense?.amount ?? 0}
    topCategory={topCategory}
    totalTransactions={filteredExpenses.length}
/>

        {/* EXPENSES */}

<section id="expenses">

  {filteredExpenses.length === 0 ? (

    <div className="empty-state">

      <div className="empty-icon">😕</div>

      <h2>No expenses found</h2>

      <p>
        Try another category, month or search keyword.
      </p>

      <button
        className="reset-btn"
        onClick={() => {
          setSelected("All");
          setMonth("All");
          setSearch("");
          setSortBy("Newest");
        }}
      >
        Reset Filters
      </button>

    </div>

  ) : (

   <ExpenseList
  expenses={filteredExpenses}
  onEdit={handleEditExpense}
  onDelete={handleDeleteExpense}
/>

  )}

</section>

      {/* FOOTER */}

<footer
  style={{
    marginTop: "50px",
    textAlign: "center",
    opacity: 0.8,
  }}
>
  <hr />
  <br />

  <p>© 2026 SpendSense</p>

  <p>
    Built with React • TypeScript • Axios • Recharts
  </p>
</footer>

{/* Floating Scroll Button */}

<div
  className="fab"
  onClick={() =>
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }
>
  ⬆
</div>

<AddExpenseModal
  isOpen={showModal}
  onClose={() => {
    setShowModal(false);
    setEditingExpense(null);
  }}
  onAdd={handleAddExpense}
  editingExpense={editingExpense}
/>

{/* Close Content */}
</div>

{/* Close Layout */}
</div>
);
}

export default Dashboard;