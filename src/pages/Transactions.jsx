import { useState } from "react";
import "../styles/transactions.css";

function Transactions({transactions, setTransactions}){
     
    const [filterCategory, setFiltercategory] = useState("All");
    const [filterType, setFilterType] = useState("All");
    const [sortBy, setSortBy]=useState("date");
    const [sortOrder,setSortOrder]=useState("desc");
    const [startDate,setStartDate]=useState("");
    const [endDate,setEndDate]=useState("");

    const filtered = transactions
        .filter((t) => filterCategory=="All" || t.category==filterCategory)
        .filter((t) => filterType=="All"  || t.type==filterType)
        .filter((t) => !startDate || t.date>=startDate)
        .filter((t) => !endDate || t.date<=endDate)
        .sort((a,b) => {
            if(sortBy=="date"){
                return sortOrder==="desc"?  //=== ensures both sides are exactly same in datatype also
                new Date(b.date) - new Date(a.date) //return negative, b comes before a
                : new Date(a.date) - new Date(b.date);
            }else{
                return sortOrder === "desc"? b.amount-a.amount:a.amount-b.amount
            }
        });

    function handleDelete(id) {
        setTransactions(transactions.filter((t) => t.id !== id));
    }
    
    function formatDate(dateStr){
        if (!dateStr)
            return "";
        else{
            const [year,month,date] = dateStr.split("-");
            return `${date}-${month}-${year}`;
        }
            
    }
    return(
        <div className="transactions">
            <div className="filters">
                <select onChange={(e) => setFiltercategory(e.target.value)}>
                    <option value="All">Category</option>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Rent">Rent</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Others">Others</option>
                </select>

                <select onChange={(e) => setFilterType(e.target.value)}>
                    <option value="All">All Types</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>

                <select onChange={(e) => setSortBy(e.target.value)}>
                    {/* <option value="">Sort By</option> */}
                    <option value="date">Sort By Date</option>
                    <option value="amount">Sort By Amount</option>
                </select>

                <div className="date-filter">
                    <label>From</label>
                    <input type="date" onChange={(e) => setStartDate(e.target.value)} />
                </div>

                <div className="date-filter">
                    <label>To</label>
                    <input type="date" onChange={(e) => setEndDate(e.target.value)} />
                </div>
                
            </div>
            <div className="t-list">
                {transactions.length === 0 ? (
                <p className="empty">No transactions yet. Hit + to add one.</p>
                ) : (
                filtered.map((t) => (
                    <div className="t-row" key={t.id}>
                    <div>
                        <p className="t-desc">{t.description}</p>
                        <p className="t-meta">{t.category} · {formatDate(t.date)}</p>
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