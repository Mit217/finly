const express = require("express");
const cors = require("cors");

const transactionsRoutes =
    require("./routes/transactions");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/transactions", transactionsRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});