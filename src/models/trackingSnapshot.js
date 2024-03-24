import { DataTypes } from 'sequelize';
import sequelize from '../configs/sequelize.js';


const TrackingSnapshot = sequelize.define('TrackingSnapshot', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date_snapshot: {
    type: DataTypes.DATE,
    allowNull: true
  },
  state: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  height: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  width: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  picture_url: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

export default TrackingSnapshot;