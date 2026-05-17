import "./style.css";

import { useState, useEffect } from "react";
import {BrowserRouter,Routes,Route, Router} from "react-router-dom";

import Home from "./pages/Home";
import Transactions from "./pages/Transactions";
import Budget from "./pages/Budget";
import Analytics from "./pages/Analytics";
import Navbar from "./components/Navbar";
import V1 from "./pages/V1";
import V2 from "./pages/V2";

function App(){

  const [transactions,setTransactions]=useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved? JSON.parse(saved):[];
  });

  const[showModal,setShowModal] = useState(false);
  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    description: "",
    category: "",
    date: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleAdd() {
    if (!form.amount || !form.date || !form.category) {
      alert("Please fill in all fields!");
      return;
    }

    setTransactions([
      { id: Date.now(), ...form, amount: parseFloat(form.amount) },
      ...transactions,
    ]);
    setForm({ type: "expense", amount: "", description: "", category: "", date: "" });
    setShowModal(false);
  }

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  return (
    <BrowserRouter>
      <Navbar/>
      <main className="main-container">
        <Routes>
        <Route path="/" element={<Home transactions={transactions}/>}/>
        <Route path="/transactions" element={<Transactions transactions={transactions} setTransactions={setTransactions}/>}/> 
        <Route path="/budget" element={<Budget transactions={transactions}/>}/>
        <Route path="/analytics" element={<Analytics/>}/>
        <Route path="/V1" element={<V1/>}/>
        <Route path="/V2" element={<V2/>}/>
        </Routes>

        <button className="float-btn" onClick={() =>setShowModal(true)}>+</button>

        {showModal && (
            <div className="modal-overlay" onClick={() => setShowModal(false)}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                    <h3>Add Transaction</h3>
                    <div className="type-toggle">
                      <button
                        className={form.type === "expense" ? "active" : ""}
                        onClick={() => setForm({ ...form, type: "expense" })}
                      >
                        Expense
                      </button>
                      <button
                        className={form.type === "income" ? "active" : ""}
                        onClick={() => setForm({ ...form, type: "income" })}
                      >
                        Income
                      </button>
                    </div>
                    <input name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} />
                    <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
                    <select name="category" value={form.category} onChange={handleChange}>
                      <option value="">Select category</option>
                      <option value="Food">Food</option>
                      <option value="Transport">Transport</option>
                      <option value="Rent">Rent</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Utilities">Utilities</option>
                    </select>
                    <input name="date" type="date" value={form.date} onChange={handleChange} />
                    <button onClick={handleAdd}>Add</button>
                </div>
            </div>
        )}
      </main>

     </BrowserRouter> 
  );
}
export default App;
