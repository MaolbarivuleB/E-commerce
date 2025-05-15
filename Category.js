const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
});

module.exports = mongoose.model('Product', productSchema);



const express = require('express');
const Category = require('../models/Category');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const router = express.Router();

router.post('/', authenticateToken, authorizeRole('admin'), async (req, res) => {
    const { name } = req.body;
    try {
        const category = new Category({ name });
        await category.save();
        res.status(201).json({ message: 'Category created successfully', category });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;