import { useState } from "react";
function Transactions({transactions, setTransactions}){
     
    function handleDelete(id) {
        setTransactions(transactions.filter((t) => t.id !== id));
    }
    
    return(
        <div className="transactions">
            <div className="t-list">
                {transactions.length === 0 ? (
                <p className="empty">No transactions yet. Hit + to add one.</p>
                ) : (
                transactions.map((t) => (
                    <div className="t-row" key={t.id}>
                    <div>
                        <p className="t-desc">{t.description}</p>
                        <p className="t-meta">{t.category} · {t.date}</p>
                    </div>
                    <p className={t.type === "income" ? "t-amount green" : "t-amount red"}>
                        {t.type === "income" ? "+" : "-"}₹{t.amount}
                    </p>
                     <button className="delete-btn" onClick={() => handleDelete(t.id)}>×</button>
                    </div>
                ))
                )}
            </div>
        </div>
    );
}
export default Transactions