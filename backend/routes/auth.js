const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Simulated OTP
const DUMMY_OTP = '123';

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      isVerified: false, // OTP required
    });

    res.status(201).json({ userId: newUser._id, otp_required: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: 'User not found' });
    
    console.log("pass ",user.password)
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch)
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });

    if (!user.isVerified) {
      // Still needs OTP
      return res.status(200).json({ userId: user._id, otp_required: true });
    }

    // Already verified — issue token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({ token,'username':user.username });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
});

router.post('/verify-otp', async (req, res) => {
  const { userId, otp } = req.body;

  try {
    if (otp !== DUMMY_OTP) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { isVerified: true },
      { new: true }
    );

    if (!user)
      return res.status(400).json({ message: 'User not found' });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'OTP verification failed', error: err.message });
  }
});

module.exports = router;
