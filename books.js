const express = require('express');
const router = express.Router();

let books = []; // In-memory storage
let idCounter = 1;

// GET all books
router.get('/', (req, res) => {
  res.status(200).json(books);
});

// POST a new book
router.post('/', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required.' });
  }
  const newBook = { id: idCounter++, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT update book by ID
router.put('/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;
  const book = books.find(b => b.id === bookId);
  if (!book) {
    return res.status(404).json({ error: 'Book not found.' });
  }
  if (title) book.title = title;
  if (author) book.author = author;
  res.status(200).json(book);
});

// DELETE a book by ID
router.delete('/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === bookId);
  if (index === -1) {
    return res.status(404).json({ error: 'Book not found.' });
  }
  books.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
