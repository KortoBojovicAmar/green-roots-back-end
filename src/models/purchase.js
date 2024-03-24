import { DataTypes } from 'sequelize';
import sequelize from '../configs/sequelize.js';


const Purchase = sequelize.define('Purchase', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date_of_purchase: {
    type: DataTypes.DATE,
    allowNull: false
  },
  state_of_purchase: {
    type: DataTypes.TEXT,
    allowNull: false
  }
})


export default Purchase;