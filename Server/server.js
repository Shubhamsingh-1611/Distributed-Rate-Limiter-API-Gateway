import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './Database/Connect.js';
import userRoutes from './Routes/userRoutes.js';


dotenv.config();

const app = express();


app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // frontend URL
    credentials: true  // necessary to pass cookies from client to server
}));
app.use(cookieParser());


const PORT = process.env.PORT || 5000;


app.use('/api/users',userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});

app.get('/', (req, res) => {
  res.send("working");
});


