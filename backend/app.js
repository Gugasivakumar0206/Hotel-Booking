const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.pluralize(null);
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

/* ==========================================================
   🚨 LICENSE CHECK REMOVED FOR SERVER (Render Deployment)
   If you want license on local only, add it in a separate file
   ========================================================== */

// =======================
//  BASIC MIDDLEWARE
// =======================
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  })
);
app.options('*', cors());

app.use(express.json());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// =======================
//  HEALTH CHECK (Needed for Render)
// =======================
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// =======================
//  ROUTES
// =======================
const feedbackRoutes = require('./routes/feedback');
const hostelRoutes = require('./routes/hostel');
const userRoutes = require('./routes/user');
const ownerRoutes = require('./routes/owner');
const adminRoutes = require('./routes/admin');
const bookingRoutes = require('./routes/booking');
const roomRoutes = require('./routes/room');

const api = process.env.API_URL || '/api/v1';

app.use(`${api}/room`, roomRoutes);
app.use(`${api}/hostel`, hostelRoutes);
app.use(`${api}/feedback`, feedbackRoutes);
app.use(`${api}/user`, userRoutes);
app.use(`${api}/admin`, adminRoutes);
app.use(`${api}/owner`, ownerRoutes);
app.use(`${api}/booking`, bookingRoutes);

app.use('/public', express.static(path.join(__dirname, 'public')));

// =======================
//  DATABASE
// =======================
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'hotel',
  })
  .then(() => {
    console.log('Database Connection is ready...');
  })
  .catch((err) => {
    console.log('DB error:', err);
  });

// =======================
//  SERVER
// =======================
const PORT = process.env.PORT || 4000;

// Render REQUIRES 0.0.0.0, NOT localhost
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
