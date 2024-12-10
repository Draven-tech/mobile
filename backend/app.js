require('dotenv').config(); // Load environment variables

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const sqlite3 = require('sqlite3').verbose();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


const cors = require('cors') //cors

var app = express();

// enabling CORS for any unknown origin(https://xyz.example.com)
app.use(cors()); //cors

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to SQLite database (creates file if it doesn't exist)
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Create users table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
);`);

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Use environment variable for the port or default to 3000
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Close the database connection when the application ends
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database ' + err.message);
        }
        console.log('Database connection closed.');
        process.exit(0);
    });
});



module.exports = app;
