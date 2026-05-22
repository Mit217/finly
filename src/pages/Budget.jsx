import "../styles/budget.css";
import "../hooks/useLocalStorage";
// import { useState, useEffect } from "react";


const CATEGORIES = ["Food", "Transport", "Rent", "Healthcare", "Entertainment", "Utilities","Others"];

function Budget({ transactions }) {

  const [limits, setLimits] = useLocalStorage("limits", {
      Food: 0, Transport: 0, Rent: 0, Healthcare: 0, Entertainment: 0, Utilities: 0, Others : 0 ,
    });
  

  function handleLimit(category, value) {
    setLimits({ ...limits, [category]: parseFloat(value) || 0 });
  }

  function getSpent(category) {
    return transactions
      .filter((t) => t.type === "expense" && t.category.toLowerCase() === category.toLowerCase())
      .reduce((sum, t) => sum + t.amount, 0);
  }

  return (
    <div className="budget">
      <h2>Budget</h2>

      {CATEGORIES.map((cat) => {
        const spent = getSpent(cat);
        const limit = limits[cat];
        const percentage = limit > 0 ? Math.min((spent / limit) * 100, 100) : 0;
        const remaining = limit - spent;

        return (
        <div className="budget-card" key={cat}>
            <div className="budget-card-header">
              <p className="b-label">{cat}</p>
              <div className="budget-right">
                <span className="red">₹{spent} spent</span>
                <span className={remaining >= 0 ? "green" : "red"}>₹{remaining} left</span>
              </div>
            </div>
            
            <div className="progress-bar">
              <div
                  className="progress-fill"
                  style={{
                  width: `${percentage}%`,
                  backgroundColor: percentage > 80 ? "#e11d48" : "#0d9488",
                  }}
              />
            </div>
            <div className="budget-limit-row">
              <span className="b-label">Monthly Limit</span>
              <input
              type="number"
              placeholder="Set limit"
              onChange={(e) => handleLimit(cat, e.target.value)}
              />
            </div>
        </div>
        );
      })}
    </div>
  );
}

export default Budget;