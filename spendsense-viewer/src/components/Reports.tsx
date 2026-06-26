interface Props {
  totalExpense: number;
  averageExpense: number;
  highestExpense: number;
  lowestExpense: number;
  topCategory: string;
  totalTransactions: number;
}

function Reports({
  totalExpense,
  averageExpense,
  highestExpense,
  lowestExpense,
  topCategory,
  totalTransactions,
}: Props) {

  let health = "";
  let healthIcon = "";
  let healthColor = "";
  let message = "";

  if (totalExpense <= 5000) {
    health = "Excellent";
    healthIcon = "🟢";
    healthColor = "#22c55e";
    message =
      "Amazing! Your expenses are well under control. Keep maintaining this spending habit.";
  } else if (totalExpense <= 10000) {
    health = "Average";
    healthIcon = "🟡";
    healthColor = "#eab308";
    message =
      "Your spending is balanced. Continue monitoring your monthly expenses.";
  } else {
    health = "Poor";
    healthIcon = "🔴";
    healthColor = "#ef4444";
    message =
      "Your expenses are quite high. Consider reducing unnecessary purchases and reviewing your budget.";
  }

  return (
    <div className="reports-container">

      <h2 className="section-title">
        📑 Expense Reports
      </h2>

      <div className="report-grid">

        <div className="report-card ">
          <h3>💰 Total Spending</h3>
          <h1>₹{totalExpense.toLocaleString()}</h1>
          <p>Total amount spent</p>
        </div>

        <div className="report-card ">
          <h3>📈 Average Expense</h3>
          <h1>₹{averageExpense.toLocaleString()}</h1>
          <p>Average per transaction</p>
        </div>

        <div className="report-card ">
          <h3>🔥 Highest Expense</h3>
          <h1>₹{highestExpense.toLocaleString()}</h1>
          <p>Largest single expense</p>
        </div>

        <div className="report-card ">
          <h3>🟢 Lowest Expense</h3>
          <h1>₹{lowestExpense.toLocaleString()}</h1>
          <p>Smallest single expense</p>
        </div>

        <div className="report-card ">
          <h3>🏆 Top Category</h3>
          <h1>{topCategory}</h1>
          <p>Highest spending category</p>
        </div>

        <div className="report-card ">
          <h3>🧾 Transactions</h3>
          <h1>{totalTransactions}</h1>
          <p>Total recorded expenses</p>
        </div>

        <div className="report-card full">

          <h3>📊 Financial Health</h3>

          <h1
            style={{
              color: healthColor,
            }}
          >
            {healthIcon} {health}
          </h1>

          <p>{message}</p>

        </div>

      </div>

    </div>
  );
}

export default Reports;