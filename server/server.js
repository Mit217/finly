const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let transactions = [
    {
        id: 1,
        type: "expense",
        amount: 500,
        category: "Food",
        date: "2026-05-22",
        description: "Burger"
    }
];

app.get("/transactions", (req, res) => {
    res.json(transactions);

});

app.post("/transactions", (req, res) => {

    const newTransaction = req.body;

    transactions.push(newTransaction);

    res.json({
        message: "Transaction added"
    });

});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});