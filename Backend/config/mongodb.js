import mongoose from "mongoose";

const connectDB = async () => {

    try {
     
      await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "e-commerce"
      })   
    
      console.log("MongoDB connected successfully");

     } catch (error) {

        console.error('Error connecting to MongoDB:', error);
    }

 }


export default connectDB;