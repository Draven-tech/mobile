var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

// Db Connection
const db = new sqlite3.Database('./database.sqlite');

// POST route to create a new grocery item
router.post('/', async (req, res) => {
    try {
        const { item_name, quantity, category, note, status } = req.body;

        db.run(
            'INSERT INTO grocery_items (item_name, quantity, category, status, note) VALUES (?, ?, ?, ?, ?)',
            [item_name, quantity, category, status || 'Not Purchased', note],
            function (err) {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                res.status(201).json({ id: this.lastID });
            }
        );
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// POST route to update a grocery item
router.post('/update', async (req, res) => {
    try {
        const { id, item_name, quantity, category, status, note } = req.body;

        db.run(
            'UPDATE grocery_items SET item_name=?, quantity=?, category=?, status=?, note=? WHERE id=?',
            [item_name, quantity, category, status, note, id],
            function (err) {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                res.status(200).json({ message: 'Item updated successfully' });
            }
        );
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// POST route to delete a grocery item
router.post('/delete', async (req, res) => {
    try {
        const { id } = req.body;

        db.run('DELETE FROM grocery_items WHERE id=?', [id], function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(200).json({ message: 'Item deleted successfully' });
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET route to fetch all grocery items
router.get('/', async (req, res) => {
    try {
        db.all('SELECT * FROM grocery_items', [], (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            if (rows.length > 0) {
                res.status(200).json(rows);
            } else {
                res.status(200).json({ message: 'No items found.' });
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
