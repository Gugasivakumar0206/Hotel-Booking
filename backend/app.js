const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.pluralize(null);
const cors = require('cors');
const bodyParser = require('body-parser');

const fs = require('fs').promises;
const path = require('path');
const configPath = path.resolve(__dirname, 'helpers', 'config.json');

const machineId = require('node-machine-id');
let machineID;
let license = "u3Y65£,;7Y#I";

machineId.machineId()
  .then(id => { machineID = id; })
  .catch(error => console.error('Error getting machine ID:', error));

// 🔥 License middleware FIXED
app.use(async (req, res, next) => {
  try {
    const configData = await fs.readFile(configPath, 'utf-8');
    const config = JSON.parse(configData);
    const storedLicense = config.license;

    if (storedLicense.licenseCode === license && storedLicense.deviceId === machineID) {
      return next();
    } else {
      return res.status(401).json({ message: "Invalid license" });
    }
  } catch (error) {
    console.error("License read error:", error);
    return res.status(401).json({ message: "License verification failed" });
  }
});

require('dotenv/config');

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES
const feedbackRoutes = require('./routes/feedback');
const hostelRoutes = require('./routes/hostel');
const userRoutes = require('./routes/user');
const ownerRoutes = require('./routes/owner');
const adminRoutes = require('./routes/admin');
const bookingRoutes = require('./routes/booking');
const roomRoutes = require('./routes/room');

const api = process.env.API_URL;

app.use(`${api}/room`, roomRoutes);
app.use(`${api}/hostel`, hostelRoutes);
app.use(`${api}/feedback`, feedbackRoutes);
app.use(`${api}/user`, userRoutes);
app.use(`${api}/admin`, adminRoutes);
app.use(`${api}/owner`, ownerRoutes);
app.use(`${api}/booking`, bookingRoutes);

app.use('/public', express.static(path.join(__dirname, 'public')));

// DB CONNECTION
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'hotel'
})
  .then(() => console.log('Database Connection is ready...'))
  .catch(err => console.log(err));

// 🔥 RENDER FIX → port must bind to 0.0.0.0
const PORT = process.env.PORT || 4000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
