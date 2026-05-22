let transactions =
    require("../data/transactions");

function getTransactions(req, res) {

    res.json(transactions);

}

function addTransaction(req, res) {

    const newTransaction = req.body;

    transactions.push(newTransaction);

    res.json({
        message: "Transaction added"
    });

}

function deleteTransaction(req, res) {

    const id = Number(req.params.id);

    transactions = transactions.filter(
        (t) => t.id !== id
    );

    res.json({
        message: "Transaction deleted"
    });

}

module.exports = {
    getTransactions,
    addTransaction,
    deleteTransaction
};