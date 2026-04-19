require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
const stationRoutes = require('./routes/stationRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

app.use('/stations', stationRoutes);
app.use('/booking', bookingRoutes);
app.use('/payment', paymentRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.json({
    message: 'Smart EV Orchestration Backend is running',
    version: '1.0.0'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
