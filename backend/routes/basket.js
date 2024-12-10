const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

// Add item to the basket
router.post('/add', (req, res) => {
    const { userId, itemId, quantity } = req.body;
    if (!userId || !itemId || !quantity) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const query = `INSERT INTO basket_items (user_id, item_id, quantity) VALUES (?, ?, ?)`;
    db.run(query, [userId, itemId, quantity], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Item added to cart', cartId: this.lastID });
    });
});

// Get all items in the basket for a user
router.get('/:userId', (req, res) => {
    const userId = req.params.userId;

    const query = `
        SELECT b.id AS basket_id, g.item_name, g.category, b.quantity, g.status, g.note
        FROM basket_items b
        JOIN grocery_items g ON b.item_id = g.id
        WHERE b.user_id = ?
    `;
    db.all(query, [userId], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Remove item from the basket
router.delete('/remove/:basketId', (req, res) => {
    const basketId = req.params.basketId;

    const query = `DELETE FROM basket_items WHERE id = ?`;
    db.run(query, [basketId], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Item removed from cart' });
    });
});

module.exports = router;
