const Device = require('../models/Device');
const axios = require('axios');

exports.getAllDevices = async (req, res) => {
  try {
    console.log("Fetching all devices");
    const devices = await Device.find();
    res.status(200).json(devices);
  } catch (err) {
    console.error("Error fetching devices:", err);
    res.status(500).send('Server error');
  }
};

exports.addDevice = async (req, res) => {
  const { name, ip } = req.body;
  try {
    console.log("Adding device:", name, ip);
    let device = await Device.findOne({ ip });

    if (device) {
      console.log("Device already exists:", ip);
      return res.status(400).json({ message: 'Device already exists' });
    }

    device = new Device({ name, ip });
    await device.save();
    console.log("Device added successfully:", name, ip);
    res.status(201).json(device);
  } catch (err) {
    console.error("Error adding device:", err);
    res.status(500).send('Server error');
  }
};

exports.updateDevice = async (req, res) => {
  const { id } = req.params;
  const { name, ip } = req.body;
  try {
    console.log("Updating device:", id, name, ip);
    const device = await Device.findByIdAndUpdate(id, { name, ip }, { new: true });
    res.status(200).json(device);
  } catch (err) {
    console.error("Error updating device:", err);
    res.status(500).send('Server error');
  }
};

exports.deleteDevice = async (req, res) => {
  const { id } = req.params;
  try {
    console.log("Deleting device:", id);
    await Device.findByIdAndDelete(id);
    res.status(200).json({ message: 'Device deleted' });
  } catch (err) {
    console.error("Error deleting device:", err);
    res.status(500).send('Server error');
  }
};

exports.controlDevice = async (req, res) => {
  const { ip, command } = req.body;
  try {
    console.log("Sending command to device:", ip, command);
    const response = await axios.post(`http://${ip}:4000/control`, { command });
    res.status(200).json({ message: 'Command sent', response: response.data });
  } catch (err) {
    console.error("Error sending command to device:", err);
    res.status(500).send('Server error');
  }
};
