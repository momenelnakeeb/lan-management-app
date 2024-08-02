const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    console.log("Registering user:", email);
    let user = await User.findOne({ email });

    if (user) {
      console.log("User already exists:", email);
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({ name, email, password, role });
    await user.save();

    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    console.log("User registered successfully:", email);
    res.status(201).json({ token });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("User login attempt:", email);
    const user = await User.findOne({ email });

    if (!user) {
      console.log("Invalid credentials for email:", email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      console.log("Invalid password for email:", email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    console.log("User logged in successfully:", email);
    res.status(200).json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send('Server error');
  }
};

exports.getProfile = (req, res) => {
  console.log("Fetching profile for user:", req.user.email);
  res.status(200).json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  });
};
exports.updateProfile = async (req, res) => {
  const { name, email, password } = req.body;
  const { id } = req.params;
  console.log("Updating profile for user ID:", req.user.id);

  // Check if the user making the request is the same user or an admin
  if (req.user.id !== id && req.user.role !== 'admin') {
    console.log("Update error: Unauthorized attempt by user ID:", req.user.id);
    return res.status(403).json({ message: 'Unauthorized' });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, { name, email, password }, { new: true });
    console.log("User updated successfully:", updatedUser.email);
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).send('Server error');
  }
};

exports.deleteProfile = async (req, res) => {
  const { id } = req.params;
  console.log("Deleting profile for user ID:", id);

  // Check if the user making the request is the same user or an admin
  if (req.user.id !== id && req.user.role !== 'admin') {
    console.log("Delete error: Unauthorized attempt by user ID:", req.user.id);
    return res.status(403).json({ message: 'Unauthorized' });
  }

  try {
    await User.findByIdAndDelete(id);
    console.log("User deleted successfully:", id);
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).send('Server error');
  }
};