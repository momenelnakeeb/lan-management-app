// models/Device.js
const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    default: 'offline',
  },
});

const Device = mongoose.model('Device', DeviceSchema);
module.exports = Device;
