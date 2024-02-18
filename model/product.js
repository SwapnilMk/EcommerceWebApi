const mongoose = require('mongoose')
const { Schema } = mongoose;

const productSchema = new Schema({
    id: Number,
    title: String,
    description: String,
    price: Number,
    date: { type: Date, default: Date.now },
    hidden: Boolean,
});


exports.Product = mongoose.model('Product', productSchema);