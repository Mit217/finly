import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function Home({ transactions }) {

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const currentMonth = new Date().toISOString().slice(0, 7);

  const monthlyIncome = transactions
    .filter((t) => t.type === "income" && t.date.startsWith(currentMonth))
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyExpense = transactions
    .filter((t) => t.type === "expense" && t.date.startsWith(currentMonth))
    .reduce((sum, t) => sum + t.amount, 0);

  const chartData = [
    { name: "Income", amount: monthlyIncome },
    { name: "Expenses", amount: monthlyExpense },
  ];

  const CATEGORIES = ["Food", "Transport", "Rent", "Entertainment", "Utilities", "Healthcare"];
  const COLORS = ["#0d9488", "#6366f1", "#e11d48", "#f59e0b", "#3b82f6", "#ec4899"];

  const categoryData = CATEGORIES.map((cat) => ({
    name: cat,
    amount: transactions
      .filter((t) => t.type === "expense" && t.category === cat)
      .reduce((sum, t) => sum + t.amount, 0),
  })).filter((cat) => cat.amount > 0);

  return (
    <div className="home">
      <h2>Dashboard</h2>

      <div className="summary-cards">
        <div className="summary-card" style={{ borderColor: "#0d9488" }}>Income: ₹{totalIncome}</div>
        <div className="summary-card" style={{ borderColor: "#e11d48" }}>Expenses: ₹{totalExpense}</div>
        <div className="summary-card" style={{ borderColor: "#6366f1" }}>Balance: ₹{balance}</div>
      </div>

      <div className="chart-card">
        <h3>Spending by Category</h3>
        {categoryData.length === 0 ? (
          <p style={{ color: "#888", fontSize: 13 }}>No expenses yet.</p>
        ) : (
          categoryData.map((cat, index) => {
            const total = categoryData.reduce((sum, c) => sum + c.amount, 0);
            const percentage = ((cat.amount / total) * 100).toFixed(0);
            return (
              <div className="cat-row" key={cat.name}>
                <p className="cat-name">{cat.name}</p>
                <div className="cat-bar-wrap">
                  <div
                    className="cat-bar-fill"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: COLORS[index % COLORS.length],
                    }}
                  />
                </div>
                <p className="cat-percent">{percentage}%</p>
                <p className="cat-amount">₹{cat.amount}</p>
              </div>
            );
          })
        )}
      </div>

      <div className="chart-card">
        <h3>This Month</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#0d9488" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default Home;