var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

//Db Connection
const db = new sqlite3.Database('./database.sqlite');

// POST route to create a new user
router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, password } = req.body;

    db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password], function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ id: this.lastID });
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST route to update a user
router.post('/update', async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, password, id } = req.body;

    db.run('UPDATE users SET username=?, email=?, password=? WHERE id=?', [username, email, password, id], function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ id: this.lastID });
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST route to delete a user
router.post('/delete', async (req, res) => {
  try {
    console.log('---delete',req.body);
    const { id } = req.body;

    db.run('DELETE FROM users WHERE id=?', [id], function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ id: this.lastID });
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET route to get all users
router.get('/', async (req, res) => {
  try {
    db.all('SELECT * FROM users', [], (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (rows.length > 0) {
        res.status(200).json(rows);
      } else {
        res.status(200).json({
          "message": "No data found."
        });
      }

    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
