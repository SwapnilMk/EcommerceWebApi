const mongoose = require('mongoose')
const { Schema } = mongoose;

const productSchema = new Schema({
    id: {type: Number, unique: true},
    title: {type: String, unique: true},
    price: {type: Number},
    brand:  { type: String },
    category: { type: String },
    description: { type: String },
    thumbnail: {type: String, unique: true},
    date: { type: Date, default: Date.now },
});


exports.Product = mongoose.model('Product', productSchema);
