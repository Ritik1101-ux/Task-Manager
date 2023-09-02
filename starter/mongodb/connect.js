import mongoose from 'mongoose'

const connectDB=(uri)=>{
    mongoose.set('strictQuery',true);

    mongoose.connect(uri)
    .then(()=>console.log("Database Connected"))
    .catch((error)=>console.log(error));
    
}

export default connectDB;