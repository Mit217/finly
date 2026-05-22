import "../../styles/variables.css";

import { useState } from "react";

function Modal({ transactions, setTransactions, showModal, setShowModal }) {

    const [form, setForm] = useState({
        type: "expense",
        amount: "",
        description: "",
        category: "",
        date: "",
    });

    const addTransaction = () => {
        setTransactions([
            { id: Date.now(), ...form, amount: parseFloat(form.amount) },
            ...transactions,
        ]);
        setForm({ type: "expense", amount: "", description: "", category: "", date: "" });
        setShowModal(false);
    };

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleAdd() {
        if (!form.amount || !form.date || !form.category) {
            alert("Please fill in all fields!");
            return;
        }
        addTransaction();
    }

    return(
        <div className="modal">
            {showModal && (
            <div className="modal-overlay" onClick={() => setShowModal(false)}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h3>Add Transaction</h3>
                <div className="type-toggle">
                  <button className={form.type === "expense" ? "active" : ""} onClick={() => setForm({ ...form, type: "expense" })}>Expense</button>
                  <button className={form.type === "income" ? "active" : ""} onClick={() => setForm({ ...form, type: "income" })}>Income</button>
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
                  <option value="Others">Others</option>
                </select>
                <input name="date" type="date" value={form.date} onChange={handleChange} />
                <button onClick={handleAdd}>Add</button>
              </div>
            </div>
          )}
          </div>
    );
}
export default Modal;