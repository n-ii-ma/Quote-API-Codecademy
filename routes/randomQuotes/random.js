const express = require("express");
const { quotes } = require("../../data");
const { getRandomElement } = require("../../utils");

const randomQuotesRoute = express.Router();

// Get Random Quote
randomQuotesRoute.get("/", (req, res) => {
  res.send({ quote: getRandomElement(quotes) });
});

module.exports = randomQuotesRoute;
