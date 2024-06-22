const express = require('express');
const app = express();

const booksJSON = require('./models/book.json');

// Healthcheck route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Get all books route
// app.get('/books', (req, res) => {
//   res.send(booksJSON);
// });

function filterByAuthor(booksJSON, author) {
  return booksJSON.filter((ele) => ele.author === author);
}

// Query String
app.get('/books', (req, res) => {
  const { author } = req.query;
  console.log(req.query);
  res.send(filterByAuthor(booksJSON, author));
});

function show(booksJSON, id) {
  return booksJSON.find((ele) => ele.id === +id);
}

// Get one book route
app.get('/books/:id', (req, res) => {
  const { id } = req.params;
  if (show(booksJSON, id)) {
    res.send(show(booksJSON, id));
  } else {
    // res.send('Book not found.');
    res.send(404).send('Book not found');
  }
});

// HTTP Methods
// app.post();
// app.put();
// app.delete();

module.exports = app;
