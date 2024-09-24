import { Router } from 'express';
import Order from '../models/order';
import { authenticateJWT } from '../middleware/auth';
import OrderProduct from './../models/orderproduct';

const router = Router();

// Get current order by user (Requires token)
router.get('/current', authenticateJWT, async (req, res) => {
  try {
    const order = await Order.findOne({
      where: { user_id: req.body.userId, status: 'active' },
    });
    res.json(order);
  } catch (err) {
    const errorMessage = (err as Error).message;
    res.status(500).json({ error: errorMessage });
  }
});

// Create a new order (Requires token)
router.post('/', authenticateJWT, async (req, res) => {
  const { products } = req.body; // Expecting an array of { productId, quantity }

  try {
    // Create the order
    const order = await Order.create({ user_id: req.body.userId, status: 'active' });

    // Add products to the order
    if (products && products.length > 0) {
      const orderProducts = products.map(({ productId, quantity }: { productId: number; quantity: number }) => ({
        orderId: order.id,
        productId,
        quantity,
      }));
      
      await OrderProduct.bulkCreate(orderProducts);
    }

    res.status(201).json(order);
  } catch (err) {
    const errorMessage = (err as Error).message;
    res.status(500).json({ error: errorMessage });
  }
});

export default router;
