import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setISBN] = useState("");
  const [myBooks, setMyBooks] = useState([]);
  // Fetch books from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/books')
      .then((response) => setMyBooks(response.data))
      .catch((error) => console.error(error));
  }, []);


  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload on form submit
    if (title && author) { // don't require isbn
      // Add a new book to the database
      axios.post('http://localhost:5000/books', { title, author, isbn })
      .then((response) => {
        // Add the newly created book to the UI
        setMyBooks([...myBooks, { id: response.data.id, title, author, isbn }]);
        setTitle("");
        setAuthor("");
        setISBN("");
      })
    .catch((error) => console.error(error));
    } else {
      alert("Please enter author and Book information.");
    }
  };
  return (
    <div className="App">
      <h1>Welcome to My Bookshelf App</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e)=>setAuthor(e.target.value)}
          className="form-input">
        </input>
        <input 
          type="text"
          placeholder='Title'
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          className="form-input">
        </input>
        <input
          type="text"
          placeholder='ISBN'
          value={isbn}
          onChange={(e)=>setISBN(e.target.value)}
          className="form-input">
        </input>
        <button 
        type="submit"
        className="form-button">Add Book</button>
      </form>
      <ul>
        {myBooks.map((book) => (
          <li key={book.id}>  {/* Use book.id instead of index */}
            {book.author} - <strong>{book.title}</strong> {book.isbn && ` - ${book.isbn}`}
          </li>
        ))}
      </ul>
    </div>
    
  );
}

export default App;
