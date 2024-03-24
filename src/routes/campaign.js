import express from 'express';
import campaignCtrl from '../controllers/campaign.js';

const router = express.Router(); // crée un routeur

// Middleware pour log les dates de requêtes
router.use((req, res, next) => {
    const event = new Date();
    console.log('CAMPAIGN Time: ', event.toString());
    next();
});

router.get('/', campaignCtrl.getAllCampaigns); // récupérer les campagnes existantes
router.get('/:id', campaignCtrl.getCampaign); // récupérer une seule campagne existante

router.post('/', campaignCtrl.addCampaign); // créer une nouvelle campagne
router.post('/:id', campaignCtrl.updateCampaign); // modifier une campagne existante

router.post('/trash/:id', campaignCtrl.trashCampaign); // restaurer une campagne supprimée
router.post('/untrash/:id', campaignCtrl.untrashCampaign); // restaurer une campagne supprimée
router.post('/delete/:id', campaignCtrl.deleteCampaign); // supprimer une campagne définitivement

export default router;