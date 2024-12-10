var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

// Db Connection
const db = new sqlite3.Database('./database.sqlite');

// Add item to basket
router.post('/add', (req, res) => {
    const { user_id, item_id, quantity } = req.body;
    db.run(
        'INSERT INTO basket_items (user_id, item_id, quantity) VALUES (?, ?, ?)',
        [user_id, item_id, quantity],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(201).json({ id: this.lastID });
        }
    );
});

// Get basket items for a user
router.get('/:user_id', (req, res) => {
    const { user_id } = req.params;
    db.all(
        `SELECT basket_items.id, grocery_items.item_name, basket_items.quantity
         FROM basket_items
         JOIN grocery_items ON basket_items.item_id = grocery_items.id
         WHERE basket_items.user_id = ?`,
        [user_id],
        (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(200).json(rows);
        }
    );
});

// Update item quantity in basket
router.post('/update', (req, res) => {
    const { id, quantity } = req.body;
    db.run(
        'UPDATE basket_items SET quantity = ? WHERE id = ?',
        [quantity, id],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(200).json({ message: 'Basket updated successfully' });
        }
    );
});

// Remove item from basket
router.post('/delete', (req, res) => {
    const { id } = req.body;
    db.run('DELETE FROM basket_items WHERE id = ?', [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json({ message: 'Item removed from basket' });
    });
});

module.exports = router;
