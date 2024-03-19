const express  = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./src/config/database')

// routers 
const productRouter = require( './src/routes/product' )
const userRouter = require( './src/routes/user' )

const port = process.env.PORT;

// database connection 
connectDB()


app.use('/product', productRouter);
app.use('/user', userRouter);



app.listen(port, ()=>{
    console.log(`server is listening on port http://localhost:${port}`)
})
