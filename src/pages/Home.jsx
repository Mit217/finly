function Home({transactions}){
    
    const totalIncome=transactions
    .filter((t)=>t.type=="income")
    .reduce((sum,t)=>sum+t.amount,0);
    
    const totalExpense=transactions
    .filter((t)=>t.type=="expense")
    .reduce((sum,t)=>sum+t.amount,0);

    const balance = totalIncome - totalExpense;
    return(
        <div className="home">
            <h2>Dashboard</h2>
            <div className="summary-cards">
                <div className="summary-card" style={{borderColor: "#0d9488"}}>
                    Income : Rs.{totalIncome}</div>
                <div className="summary-card" style={{borderColor: "#e11d48"}}>
                    Expenses : Rs.{totalExpense}</div>
                <div className="summary-card" style={{borderColor: "#6366f1"}}>
                    Balance : Rs.{balance}</div>
            </div>
        </div>
        
    );
}
export default Home