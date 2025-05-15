const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
});

module.exports = mongoose.model('Product', productSchema);


const express = require('express');
const Product = require('../models/Product');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const router = express.Router();

router.post('/', authenticateToken, authorizeRole('admin'), async (req, res) => {
    const { name, price, category } = req.body;
    try {
        const product = new Product({ name, price, category });
        await product.save();
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;