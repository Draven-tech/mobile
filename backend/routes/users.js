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

router.post('/login', (req, res) => {
  const username = req.body.username.trim();
  const password = req.body.password.trim();

  if (!username || !password) {
      console.log('Missing username or password');
      return res.status(400).json({ error: 'Username and password are required' });
  }

  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.get(query, [username, password], (err, row) => {
      if (err) {
          console.error('Database Error:', err.message);
          return res.status(500).json({ error: 'Database error' });
      }

      if (row) {
          console.log('User Found:', row);
          res.status(200).json({
              success: true,
              message: 'Login successful',
              user: {
                  id: row.id,
                  username: row.username,
                  email: row.email,
              },
          });
      } else {
          console.log('Invalid credentials');
          res.status(401).json({ success: false, message: 'Invalid username or password' });
      }
  });
});


router.get('/profile', (req, res) => {
  const userId = req.query.id;
  const query = 'SELECT username FROM users WHERE id = ?';

  db.get(query, [userId], (err, row) => {
      if (err) {
          console.error('Database Error:', err.message);
          res.status(500).json({ error: 'Database error' });
      } else if (row) {
          res.status(200).json({ username: row.username });
      } else {
          res.status(404).json({ error: 'User not found' });
      }
  });
});

module.exports = router;
