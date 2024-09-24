import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Order from './order';
import OrderProduct from './orderproduct';

class Product extends Model {}

Product.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'Product',
});

Product.belongsToMany(Order, { through: OrderProduct, foreignKey: 'productId' });
Order.belongsToMany(Product, { through: OrderProduct, foreignKey: 'orderId' });

export default Product;
