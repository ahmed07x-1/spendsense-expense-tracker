

interface Props {
  totalExpense: number;
  totalTransactions: number;
  averageExpense: number;
  topCategory: string;
  highestExpense: number;
  lowestExpense: number;
}

function StatsCards({
  totalExpense,
  totalTransactions,
  averageExpense,
  topCategory,
  highestExpense,
  lowestExpense,
}: Props) {
  return (
    <div className="stats-grid">
      {/* Total Spending */}
      <div className="premium-card">
        <div
          className="card-icon"
          style={{ background: "#3b82f6" }}
        >
          💰
        </div>

        <h4>Total Spending</h4>

        <h2>₹{totalExpense.toLocaleString()}</h2>
      </div>

      {/* Transactions */}
      <div className="premium-card">
        <div
          className="card-icon"
          style={{ background: "#22c55e" }}
        >
          🧾
        </div>

        <h4>Transactions</h4>

        <h2>{totalTransactions}</h2>
      </div>

      {/* Average Expense */}
      <div className="premium-card">
        <div
          className="card-icon"
          style={{ background: "#f97316" }}
        >
          📈
        </div>

        <h4>Average Expense</h4>

        <h2>₹{averageExpense.toLocaleString()}</h2>
      </div>

      {/* Top Category */}
      <div className="premium-card">
        <div
          className="card-icon"
          style={{ background: "#8b5cf6" }}
        >
          🏆
        </div>

        <h4>Top Category</h4>

        <h2>{topCategory}</h2>
      </div>

      {/* Highest Expense */}
      <div className="premium-card">
        <div
          className="card-icon"
          style={{ background: "#ef4444" }}
        >
          ⬆
        </div>

        <h4>Highest Expense</h4>

        <h2>₹{highestExpense.toLocaleString()}</h2>
      </div>

      {/* Lowest Expense */}
      <div className="premium-card">
        <div
          className="card-icon"
          style={{ background: "#06b6d4" }}
        >
          ⬇
        </div>

        <h4>Lowest Expense</h4>

        <h2>₹{lowestExpense.toLocaleString()}</h2>
      </div>
    </div>
  );
}

export default StatsCards;