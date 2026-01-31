// this file is for only making the server up and the database conncection
const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGO_URL;

if (!MONGODB_URI) { 
  console.error('Error: MONGODB_URI is not defined in .env');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    
    // Start server only after successful DB connection
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(`API root: http://localhost:${PORT}/`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });
