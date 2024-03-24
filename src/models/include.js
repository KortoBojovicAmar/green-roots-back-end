import { DataTypes } from 'sequelize';
import sequelize from '../configs/sequelize.js';
import Purchase from './purchase.js';
import TreeVariety from './trees.js';

const Include = sequelize.define('Include', {
  purchase_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Purchase,
      key: 'id'
    }
  },
  tree_variety_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: TreeVariety,
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'Include',
  timestamps: false
});

export default Include;