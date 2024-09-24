import { Router } from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authenticateJWT } from '../middleware/auth';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

// Register User
router.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });
    res.json({ token });
  } catch (err) {
    const errorMessage = (err as Error).message;
    res.status(500).json({ error: errorMessage });
  }
});

// Login User
router.post('/login', async (req, res) => {
  const { firstName, password } = req.body;
  try {
    const user = await User.findOne({ where: { firstName } });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });
    res.json({ token });
  } catch (err) {
    const errorMessage = (err as Error).message;
    res.status(500).json({ error: errorMessage });
  }
});

// Protected: Get all users (Requires token)
router.get('/', authenticateJWT, async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    const errorMessage = (err as Error).message;
    res.status(500).json({ error: errorMessage });
  }
});

// Protected: Show user (Requires token)
router.get('/:id', authenticateJWT, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.json(user);
  } catch (err) {
    const errorMessage = (err as Error).message;
    res.status(500).json({ error: errorMessage });
  }
});

export default router;
