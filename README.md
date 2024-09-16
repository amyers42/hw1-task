MyBooksApp is a simple web application that allows users to enter book information
(title, author, ISBN) and stores the data in an SQLite database. The application
retrieves and displays all stored books after the user submits the form. I used 
React.js for frontend, Node.js with Express and SQLite for Backend and SQLite
for my database.

How to run:
Make sure you have nodejs installed in your system and npm in order to run the 
commands.
(1) install dependecies if you don't already have them installed
(2) cd in backend folder and run "node server.js" in terminal. The backend should now
be running on http://localhost:5000.
(3) cd into frontend folder and run "npm start". This will open the React app in 
your default web browser at http://localhost:3000.

Backend Endpoints
GET /books: Retrieves all the books stored in the database.
POST /books: Adds a new book to the database (requires JSON with title, author,
and isbn fields).

Usage Instructions
Open the app in your browser (http://localhost:3000).
Enter book information (author, title, and optionally ISBN) and click "Add Book".
The submitted book will appear in the list below, and the data will be stored in 
the SQLite database. You can refresh the page, and the books will remain persisted.

