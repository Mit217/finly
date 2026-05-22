import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Transactions from "../pages/Transactions";
import Budget from "../pages/Budget";
import Analytics from "../pages/Analytics";
import Login from "../pages/Login";

function AppRoutes({ transactions, setTransactions }) {

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/home"
        element={<Home transactions={transactions} />}
      />

      <Route
        path="/transactions"
        element={
          <Transactions
            transactions={transactions}
            setTransactions={setTransactions}
          />
        }
      />

      <Route
        path="/budget"
        element={<Budget transactions={transactions} />}
      />

      <Route
        path="/analytics"
        element={<Analytics transactions={transactions} />}
      />
    </Routes>
  );
}

export default AppRoutes;
