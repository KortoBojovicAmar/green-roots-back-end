import { DataTypes } from 'sequelize';
import sequelize from '../configs/sequelize.js';

const CampaignPictures = sequelize.define('CampaignPictures', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  image_url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  campaignId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Campaigns', // nom de la table, pas du modèle
      key: 'id'
    }
  }
});

export default CampaignPictures;