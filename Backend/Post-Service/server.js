import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'
import bodyParser from 'body-parser';

import postRoutes from './routes/postRoutes.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

app.use(cors({    
    origin: '*', // Allow all origins (for development, be more specific in production)  
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods  
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
      
  }));


// Connect to MongoDB
mongoose.connect(process.env.DataBase_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));




// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Posts Microservice!');
});

app.use('/api/posts', postRoutes);





app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
