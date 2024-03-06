const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/test');
        console.log('Database connected!');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

module.exports = connectDB;
