import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import "../styles/analytics.css";

function Analytics({ transactions }) {

  // Get all unique months from transactions
  const months = [...new Set(transactions.map((t) => t.date.slice(0, 7)))].sort();

  // For each month calculate income, expense, balance
  const monthlyData = months.map((month) => {
    const income = transactions
      .filter((t) => t.type === "income" && t.date.startsWith(month))
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
      .filter((t) => t.type === "expense" && t.date.startsWith(month))
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      month,
      income,
      expense,
      balance: income - expense,
    };
  });

  return (
    <div className="analytics">
      <h2>Analytics</h2>

      <div className="chart-card">
        <h3>Income vs Expenses — All Time</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={monthlyData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#0d9488" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expense" fill="#e11d48" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3>Balance Trend</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={monthlyData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="balance" stroke="#6366f1" strokeWidth={2} dot={true} />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default Analytics;