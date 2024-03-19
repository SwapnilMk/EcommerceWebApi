const mongoose = require( 'mongoose' );
const { Schema, Types: { ObjectId } } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    image: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: ObjectId,
        ref: 'Category',
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },
    reviews: [
        {
            type: ObjectId,
            ref: 'Review',
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


module.exports = mongoose.model('Product', productSchema);