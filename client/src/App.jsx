import { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Modal from "./components/ui/Modal";
import AppRoutes from "./routes/AppRoutes";

// import useLocalStorage from "./hooks/useLocalStorage";

function App() {

  const location = useLocation();

  const hideNavbar = location.pathname === "/login";

  // const [transactions, setTransactions] =
  //   useLocalStorage("transactions", []);
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/transactions")
        .then((res) => res.json())
        .then((data) => {
            setTransactions(data);
        });
  }, []);

  return (
    <>
      {!hideNavbar && <Navbar />}

      <main className="main-container">

        <AppRoutes
          transactions={transactions}
          setTransactions={setTransactions}
        />

        {!hideNavbar && (
          <>
            <Modal
              transactions={transactions}
              setTransactions={setTransactions}
              showModal={showModal}
              setShowModal={setShowModal}
            />

            <button
              className="float-btn"
              onClick={() => setShowModal(true)}
            >
              +
            </button>
          </>
        )}

      </main>
    </>
  );
}

export default App;