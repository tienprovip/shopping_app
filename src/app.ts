import express from 'express';
import userRoutes from '../routes/userRoutes';
import productRoutes from '../routes/productRoutes';
import orderRoutes from '../routes/orderRoutes';
import sequelize from '../config/database';

const app = express();
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

sequelize.sync({ force: true }).then(() => {
  console.log('Database & tables created!');
});

export default app;
