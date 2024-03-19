const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
        });
        console.log('mongodb Connected !')
    }
    catch (error) {
        console.log(`an error occurred while connecting database ${error.message}`)
        process.exit(1);
    }

};
module.exports = connectDB;
