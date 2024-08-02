const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
const deviceRoutes = require('./routes/deviceRoutes');
require('./config/passport')(passport); // Assuming you have a passport configuration file
const cors = require('cors');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001; // Ensure this matches the port you're using in Electron

console.log("Server starting...");
console.log("Connecting to database...");

mongoose.connect(process.env.MONGO_URI, {

})
.then(() => {
  console.log("Connected to database");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch(err => {
  console.error("Database connection error:", err);
});

app.use(express.json());
console.log("Middleware set up for JSON parsing.");

// Initialize Passport middleware
app.use(passport.initialize());
console.log("Passport middleware initialized.");

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/devices', deviceRoutes);

console.log("Routes set up.");

app.use(cors());