const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Your auth routes
const transactionRoutes = require('./routes/transactionRoutes');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api/transactions', transactionRoutes);


// Optional: Protected test route (requires JWT middleware)
const authMiddleware = require('./middleware/auth');
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: `Welcome ${req.user.email}, you are authenticated.` });
});

// MongoDB connection + server startup
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('✅ MongoDB connected');

    app.listen(PORT, () => {
      console.log(`🚀 Server is running at: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
  });
