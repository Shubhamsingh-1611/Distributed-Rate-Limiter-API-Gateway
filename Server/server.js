import express from 'express';
import dotenv from 'dotenv';
import connectDB from './Database/Connect.js';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});

app.get('/', (req, res) => {
  res.send("working");
});


