import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
// App configuration

const app = express();
const port = process.env.PORT || 4000;

// Middleware

app.use(cors());
app.use(express.json()); 

// API endPoints

app.use('/api/user', userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart', cartRouter)

connectDB()
.then(()=>connectCloudinary())
.then(()=>{
    app.listen(port, ()=>{
    console.log(`Server is running on port : ${port}`);
    })
})
.catch((error)=>{
    console.log('Server start failed',error.message)
});




