import { Router } from 'express';
import Product from '../models/product';
import { authenticateJWT } from '../middleware/auth';

const router = Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    const errorMessage = (err as Error).message;
    res.status(500).json({ error: errorMessage });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.json(product);
  } catch (err) {
    const errorMessage = (err as Error).message;
    res.status(500).json({ error: errorMessage });
  }
});

// Create a new product (Requires token)
router.post('/create', authenticateJWT, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (err) {
    const errorMessage = (err as Error).message;
    res.status(500).json({ error: errorMessage });
  }
});

export default router;
