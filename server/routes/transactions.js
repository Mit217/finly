const express = require("express");

const router = express.Router();

let transactions =
    require("../data/transactions");

router.get("/", (req, res) => {

    res.json(transactions);

});

router.post("/", (req, res) => {

    const newTransaction = req.body;

    transactions.push(newTransaction);

    res.json({
        message: "Transaction added"
    });

});

router.delete("/:id", (req, res) => {

    const id = Number(req.params.id);

    transactions = transactions.filter(
        (t) => t.id !== id
    );

    res.json({
        message: "Transaction deleted"
    });

});

module.exports = router;