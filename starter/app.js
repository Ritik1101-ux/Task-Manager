import express from 'express';
import taskRouter from './routes/task.route.js';
import connectDB from './mongodb/connect.js';
import * as dotenv from 'dotenv';
import notFound from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
const app=express();
dotenv.config();

//Midlleware

app.use(express.static('./public'))
app.use(express.json()) // It is Used for json parse 



app.use('/api/v1/tasks',taskRouter)

app.use(notFound);
app.use(errorHandlerMiddleware);

const PORT=process.env.PORT || 3000;  

const startServer=()=>{
    connectDB(process.env.MONGODB_URL);
    app.listen(PORT,console.log(`Server is Listening on Port ${PORT}`)); 
}

startServer();