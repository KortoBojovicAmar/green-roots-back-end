import { Campaign, CampaignPictures, Trees } from '../configs/relations.js';
import { isAdmin } from '../middlewares/isAdminMiddleware.js';


export default {

    // Créer une nouvelle campagne
    addCampaign: (req, res) => {
        Campaign.create(req.body)
            .then(async campaign => {
                const imageUrls = req.body.image_urls.split(',');
                const picturesPromises = imageUrls.map(url => CampaignPictures.create({ image_url: url.trim(), campaignId: campaign.id }));
                await Promise.all(picturesPromises);
                if (isAdmin) { return res.redirect('/admin/campaigns'); }
                else {
                    res.status(201).json({ message: 'Campagne créée', data: campaign });
                }
            })
            .catch(error => res.status(500).json({ message: 'Erreur lors de la création de la campagne', error }));
    },

    // Obtenir toutes les campagnes
    getAllCampaigns: (req, res) => {
        Campaign.findAll({ include: [CampaignPictures, Trees] })
            .then(campaigns => res.json(campaigns))
            .catch(error => res.status(500).json({ message: 'Erreur lors de la récupération des campagnes', error }));
    },

    // Obtenir une campagne par ID
    getCampaign: (req, res) => {
        let campaignId = parseInt(req.params.id)

        if (!campaignId) {
            return res.status(400).json({ message: 'id non valide' });
        }

        Campaign.findOne({
            where: { id: campaignId },
            include: [CampaignPictures, Trees], // Inclure CampaignPictures
        })
            .then(campaign => {
                if (campaign) {
                    res.json(campaign);
                } else {
                    res.status(404).json({ message: 'Campagne non trouvée' });
                }
            })
            .catch(error => res.status(500).json({ message: 'Erreur lors de la récupération de la campagne', error }));
    },

    // Mettre à jour une campagne par ID
    updateCampaign: (req, res) => {
        let campaignId = parseInt(req.params.id)

        if (!campaignId) {
            return res.status(400).json({ message: 'id non valide' });
        }

        Campaign.findOne({ where: { id: campaignId }, include: [CampaignPictures] })
            .then(campaign => {
                if (!campaign) {
                    return res.status(404).json({ message: 'Campagne non trouvée' });
                }

                // Mise à jour de la campagne
                campaign.update(req.body)
                    .then(async () => {
                        // Mise à jour des images de la campagne
                        const { image_urls } = req.body;
                        for (let i = 0; i < campaign.CampaignPictures.length; i++) {
                            campaign.CampaignPictures[i].image_url = image_urls[i];
                            await campaign.CampaignPictures[i].save();
                        }

                        if (isAdmin) {
                            // Si l'utilisateur est un admin, redirige vers /admin/campaigns pour ne pas changer de page et actualiser
                            res.redirect('/admin/campaigns');
                        } else {
                            res.json({ message: 'campagne modifiée' })
                        }
                    })
                    .catch(error => res.status(500).json({ error }));
            })
            .catch(error => res.status(500).json({ message: 'Erreur lors de la mise à jour de la campagne', error }));
    },

    // Supprimer une campagne par ID
    deleteCampaign: (req, res) => {
        let campaignId = parseInt(req.params.id)

        if (!campaignId) {
            return res.status(400).json({ message: 'id non valide' });
        }

        Campaign.destroy({ where: { id: campaignId }, force: true })
            .then(() => {
                if (isAdmin) {
                    // Si l'utilisateur est un admin, redirige vers /admin/campaigns pour ne pas changer de page et actualiser
                    res.redirect('/admin/campaigns');
                } else {
                    res.json({ message: 'campagne supprimée' })
                }
            })
            .catch(error => res.status(500).json({ error }));
    },

    // Supprimer une campagne par ID (soft delete)
    trashCampaign: (req, res) => {
        let campaignId = parseInt(req.params.id)

        if (!campaignId) {
            return res.status(400).json({ message: 'id non valide' });
        }

        Campaign.destroy({ where: { id: campaignId } })
            .then(() => {
                if (isAdmin) {
                    // Si l'utilisateur est un admin, redirige vers /admin/campaigns pour ne pas changer de page et actualiser
                    res.redirect('/admin/campaigns');
                } else {
                    res.json({ message: 'campagne supprimée' })
                }
            })
            .catch(error => res.status(500).json({ error }));
    },

    // Restaurer une campagne par ID
    untrashCampaign: (req, res) => {
        let campaignId = parseInt(req.params.id)

        if (!campaignId) {
            return res.status(400).json({ message: 'id non valide' });
        }

        Campaign.restore({ where: { id: campaignId } })
            .then(() => {
                if (isAdmin) {
                    // Si l'utilisateur est un admin, redirige vers /admin/campagnes pour ne pas changer de page et actualiser
                    res.redirect('/admin/campaigns');
                } else {
                    res.json({ message: 'campagne restaurée' })
                }
            })
            .catch(error => res.status(500).json({ error }));
    },
}