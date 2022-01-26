const express = require("express");
const app = express();

const randomQuotesRoute = require("./routes/randomQuotes/random");
const allQuotesRoute = require("./routes/allQuotes/all");

const PORT = process.env.PORT || 4001;

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static Folder
app.use(express.static("public"));

// Random Quotes
app.use("/api/quotes/random", randomQuotesRoute);

// All Quotes
app.use("/api/quotes", allQuotesRoute);

app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));
