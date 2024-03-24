import { DataTypes } from 'sequelize';
import sequelize from '../configs/sequelize.js';


const Campaign = sequelize.define('Campaign', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  starting_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  ending_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  place: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  deletedAt: {
    type: DataTypes.DATE
  }
}, {
  paranoid: true  // pour activer la suppression logique (soft delete) dans Sequelize (par défaut, la suppression logique est désactivée)
})

export default Campaign;