const express = require("express");
const { quotes } = require("../../data");
const uuid = require("uuid");

const allQuotesRoute = express.Router();

// Get All Quotes and All Quotes by a Particular Person
allQuotesRoute.get("/", (req, res) => {
  // If there is a valid query of a person, return their quotes
  if (req.query.person) {
    const quotesByPerson = quotes.filter(
      (quote) => quote.person === req.query.person
    );
    res.send({ quotes: quotesByPerson });
    // If there isn't any query in the URL, return all the quotes
  } else {
    res.send({ quotes: quotes });
  }
});

// Post Quote
allQuotesRoute.post("/", (req, res) => {
  if (req.query.quote && req.query.person) {
    const newQuote = {
      id: uuid.v4(),
      quote: req.query.quote,
      person: req.query.person,
    };
    quotes.push(newQuote);
    res.send({ quote: newQuote });
  } else {
    res.status(400).send(`Please Provide Both the Quote Text and the Person`);
  }
});

// Update Quote
allQuotesRoute.put("/:id", (req, res) => {
  const foundQuote = quotes.some((quote) => quote.id == req.params.id);

  if (foundQuote) {
    const updQuote = req.body;
    quotes.forEach((quote) => {
      if (quote.id == req.params.id) {
        quote.quote = updQuote.quote ? updQuote.quote : quote.quote;
        quote.person = updQuote.person ? updQuote.person : quote.person;

        res.send({ quote: quote });
      }
    });
  } else {
    res.status(404).send(`No Quote with the ID of ${req.params.id} Found!`);
  }
});

// Delete Quote
allQuotesRoute.delete("/:id", (req, res) => {
  const foundQuote = quotes.some((quote) => quote.id == req.params.id);
  const quoteIndex = quotes.findIndex((quote) => quote.id == req.params.id);

  if (foundQuote) {
    const dltQuote = quotes.splice(quoteIndex, 1);
    res.send({ quote: dltQuote });
  } else {
    res.status(404).send(`No Quote with the ID of ${req.params.id} Found!`);
  }
});

module.exports = allQuotesRoute;
