const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

//Initialize SQLite database
const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to SQLite database');
    db.run('CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, author TEXT, isbn TEXT)');
  }
});

// Endpoint to add a book to the database
app.post('/books', (req, res) => {
  const { title, author, isbn } = req.body;
  db.run('INSERT INTO books (title, author, isbn) VALUES (?, ?, ?)', [title, author, isbn], function(err) {
    if (err) {
      res.status(400).send(err.message);
    } else {
      res.status(201).send({ id: this.lastID });
    }
  });
});

// Endpoint to get all books from the database
app.get('/books', (req, res) => {
  db.all('SELECT * FROM books', [], (err, rows) => {
    if (err) {
      res.status(400).send(err.message);
    } else {
      res.status(200).json(rows);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
