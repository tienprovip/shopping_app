import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class OrderProduct extends Model {
  public id!: number;
  public orderId!: number;
  public productId!: number;
  public quantity!: number;
}

OrderProduct.init(
  {
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Orders', // Adjust this based on your Order model name
        key: 'id',
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products', // Adjust this based on your Product model name
        key: 'id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'OrderProduct',
  }
);

export default OrderProduct;
