const mongoose = require('mongoose');
const { Schema, Types: { ObjectId } } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String,
    },
    orders: [{
        type: Schema.Types.ObjectId,
        ref: 'Order',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


module.exports = mongoose.model( 'User', userSchema );