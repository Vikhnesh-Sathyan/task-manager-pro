const express = require('express');
const cors = require('cors');
require('dotenv').config();

// 👇 Initialize database & tables
require('./models/userModel');
require('./models/taskModel');

// 👇 Import routes
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Task Manager Pro API running 🚀');
});

// Routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);


// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
