const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

// GET endpoint for fetching grocery items with optional category filter
router.get('/', (req, res) => {
  const categoryId = req.query.categoryId; // Optional filter
  console.log('Received Category ID:', categoryId);

  let query = 'SELECT * FROM grocery_items';
  const params = [];

  if (categoryId) {
    query += ' WHERE category_id = ?';
    params.push(String(categoryId));
  }

  console.log('Executing SQL Query:', query, 'Params:', params);

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error('Error executing query:', err.message);
      res.status(500).json({ error: 'Database error' });
    } else {
      console.log('Query Result:', rows);
      res.status(200).json(rows);
    }
  });
});

// POST endpoint to add a new grocery item
router.post('/', (req, res) => {
  const { item_name, quantity, category_id, note } = req.body;

  console.log('Received data for new item:', req.body);

  const query = `
    INSERT INTO grocery_items (item_name, quantity, category_id, note)
    VALUES (?, ?, ?, ?)
  `;
  const params = [item_name, quantity, category_id, note];

  db.run(query, params, function (err) {
    if (err) {
      console.error('Error inserting item:', err.message);
      res.status(500).json({ error: 'Failed to add item' });
    } else {
      console.log('Item added with ID:', this.lastID);
      res.status(201).json({ id: this.lastID, message: 'Item added successfully' });
    }
  });
});

// GET endpoint to fetch a single grocery item by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  const query = 'SELECT * FROM grocery_items WHERE id = ?';
  db.get(query, [id], (err, row) => {
    if (err) {
      console.error('Error fetching item:', err.message);
      res.status(500).json({ error: 'Failed to fetch item' });
    } else if (!row) {
      res.status(404).json({ error: 'Item not found' });
    } else {
      console.log('Fetched Item:', row);
      res.status(200).json(row);
    }
  });
});

// PUT endpoint to update a grocery item by ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { item_name, quantity, category_id, note } = req.body;

  const query = `
    UPDATE grocery_items
    SET item_name = ?, quantity = ?, category_id = ?, note = ?
    WHERE id = ?
  `;
  const params = [item_name, quantity, category_id, note, id];

  db.run(query, params, function (err) {
    if (err) {
      console.error('Error updating item:', err.message);
      res.status(500).json({ error: 'Failed to update item' });
    } else {
      console.log('Item updated successfully');
      res.status(200).json({ message: 'Item updated successfully' });
    }
  });
});

// DELETE endpoint to delete a grocery item by ID
router.delete('/:id', (req, res) => {
    const { id } = req.params; // Extract ID from route parameters
    console.log('Deleting item with ID:', id); // Debugging log
  
    const query = 'DELETE FROM grocery_items WHERE id = ?';
    db.run(query, [id], function (err) {
      if (err) {
        console.error('Error deleting item:', err.message);
        res.status(500).json({ error: 'Failed to delete item' });
      } else if (this.changes === 0) {
        res.status(404).json({ error: 'Item not found' });
      } else {
        console.log('Item deleted successfully:', id); // Debugging log
        res.status(200).json({ message: 'Item deleted successfully' });
      }
    });
  });
  

module.exports = router;
