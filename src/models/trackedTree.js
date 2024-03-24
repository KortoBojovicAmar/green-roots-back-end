import { DataTypes } from 'sequelize';
import sequelize from '../configs/sequelize.js';


const TrackedTree = sequelize.define('TrackedTree', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date_plantation: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

export default TrackedTree;