const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    qty: {
        type: Number,
        required: true,
    },
    sale_at: {
        type: Date,
        default: Date.now,
    },
    products_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    users_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;