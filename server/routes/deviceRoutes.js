const express = require('express');
const {
  getAllDevices,
  addDevice,
  updateDevice,
  deleteDevice,
  controlDevice,
} = require('../controllers/deviceController');
const { protect, admin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', protect, async (req, res) => {
  try {
    console.log("Fetching all devices");
    await getAllDevices(req, res);
  } catch (err) {
    console.error("Error in GET /devices:", err);
    res.status(500).send('Server error');
  }
});

router.post('/', protect, admin, async (req, res) => {
  try {
    console.log("Adding a device:", req.body);
    await addDevice(req, res);
  } catch (err) {
    console.error("Error in POST /devices:", err);
    res.status(500).send('Server error');
  }
});

router.put('/:id', protect, admin, async (req, res) => {
  try {
    console.log("Updating device with ID:", req.params.id);
    await updateDevice(req, res);
  } catch (err) {
    console.error("Error in PUT /devices/:id:", err);
    res.status(500).send('Server error');
  }
});

router.delete('/:id', protect, admin, async (req, res) => {
  try {
    console.log("Deleting device with ID:", req.params.id);
    await deleteDevice(req, res);
  } catch (err) {
    console.error("Error in DELETE /devices/:id:", err);
    res.status(500).send('Server error');
  }
});

router.post('/control', protect, admin, async (req, res) => {
  try {
    console.log("Controlling device with IP:", req.body.ip);
    await controlDevice(req, res);
  } catch (err) {
    console.error("Error in POST /devices/control:", err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
