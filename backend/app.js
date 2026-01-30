// app.js
const express = require('express');
const cors = require('cors');
const rateLimit = require("express-rate-limit");
const contactRoute = require("./routes/contact");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const contactLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 min
  max: 5, // 5 requests per minute per IP
  message: "Too many requests from this IP, please try again later."
});

app.use("/api/contact", contactLimiter);

// Routes
app.use('/api/skills', require('./routes/skills'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/contributions', require('./routes/contributions'));
app.use('/api/quotes', require('./routes/quotes'));
app.use("/api/contact", contactRoute);
app.use("/api/admin",require('./routes/admin'));

// Root test route
app.get('/', (req, res) => {
  res.json({
    message: 'Habiba Portfolio API is running!',
    endpoints: [
      '/api/skills',
      '/api/projects',
      '/api/contributions',
      '/api/quotes'
    ]
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!', error: err.message });
});

module.exports = app;