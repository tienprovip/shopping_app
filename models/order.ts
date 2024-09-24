import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Order extends Model {
  public id!: number;
  public user_id!: number;
  public status!: string;
}

Order.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Adjust this based on your User model name
        key: 'id',
      },
    },
    status: {
      type: DataTypes.ENUM('active', 'complete'),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Order',
  }
);

export default Order;
