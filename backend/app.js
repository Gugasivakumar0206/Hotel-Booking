const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.pluralize(null);
const cors = require('cors');
const bodyParser = require('body-parser');

const fs = require('fs').promises;
const path = require('path');
const configPath = path.resolve(__dirname,    'helpers', 'config.json');

const machineId = require('node-machine-id');
let machineID; // Declare machineID variable
let license ="u3Y65£,;7Y#I";

// Get the machine ID
machineId.machineId()
  .then(id => {
    machineID = id;
    //console.log('Machine ID:', id);
    //console.log('license ID:', license);
  })
  .catch(error => {
    console.error('Error getting machine ID:', error);
  });

  

// Middleware to check for a valid license
app.use(async (req, res, next) => {
  try {
    const configData = await fs.readFile(configPath, 'utf-8');
    const config = JSON.parse(configData);
    const storedLicense = config.license;

    if (storedLicense.licenseCode === license && storedLicense.deviceId === machineID) {
     // console.log('Valid license');
      next();
      // Send a success response
      //return res.json({ message: 'Valid license' });
    } 
    
  
  } catch (error) {
    console.error('Invalid or missing license information. Please verify the license.');
    process.exit(1); // Exit the application if the license is not valid
  }
});




require('dotenv/config');

app.use(cors());
app.options('*', cors())

//middleware
app.use(express.json());

//app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//"email": "john.doe@example.com",
//"password": "yourpassword"

//Routes

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


//CONNECTION_STRING = 'mongodb://localhost:27017/';
//  http://localhost:4000/api/v1/business/
//CONNECTION_STRING = mongodb://0.0.0.0:27017/


//Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false, // Add this line
    dbName: 'hotel'
})
.then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=> {
    console.log(err);
})

//Server
app.listen(4000, ()=>{

    console.log('server is running http://localhost:4000');
})

{/*
app.get("/message", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
*/}