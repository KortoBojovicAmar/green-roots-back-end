import { Op } from 'sequelize';
import User from '../models/user.js';
import CampaignPictures from '../models/campaignPictures.js';
import Campaign from '../models/campaign.js';
import Trees from '../models/trees.js';
import bcrypt from 'bcrypt';


export default {


  dashboard: async (req, res) => {
    try {
      const users = await User.findAll(); // Envoie les utilisateurs à la vue adminDashboard
      const deletedUsers = await User.findAll({ // Envoie les utilisateurs supprimés à la vue adminDashboard
        where: {
          deletedAt: {
            [Op.ne]: null   //? Op.ne = Opérateur de comparaison "non égal à" de sequelize donc "deletedAt non égal à null"
          }
        },
        paranoid: false   //? "paranoid: false" signifie que vous récupérez les données supprimées en soft delete car par défaut, Sequelize ne les récupère pas
      }); // Récupérez tous les utilisateurs supprimés de votre base de données
      res.render('adminDashboard', { users, deletedUsers }); // Passez les utilisateurs et les utilisateurs supprimés à votre vue
    } catch (error) {
      console.error(error);
      res.status(500).render('adminDashboard', { error: 'Une erreur est survenue' });
    }
  },


  loginform: (req, res) => {
    res.render('adminLogin');
  },


  loginsub: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).render('adminLogin', { error: 'Un ou plusieurs champs obligatoires sont manquants' });
    }

    try {
      const user = await User.findOne({ where: { email } });

      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).render('adminLogin', { error: 'Identifiants invalides' });
      }

      if (user.role !== 'admin') {
        return res.status(403).render('adminLogin', { error: 'Accès refusé. Vous devez être administrateur pour accéder à cette ressource.' });
      }

      req.session.user = user; // Définir l'utilisateur dans la session

      res.redirect('/admin/dashboard');
    } catch (error) {
      console.error(error);
      res.status(500).render('adminLogin', { error: 'Une erreur est survenue' });
    }
  },


  logout: (req, res) => {
    req.session.destroy(); // Détruire la session
    res.redirect('/admin');
  },


  updateUser: (req, res) => {
    let userId = parseInt(req.params.id)

    // Vérifie si le champ id est cohérent
    if (!userId) {
      return res.status(400).json({ message: 'id non valide' });
    }


    User.findOne({ where: { id: userId }, raw: true })
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        // mise à jour de l'utilisateur
        User.update(req.body, { where: { id: req.params.id } })
          .then(() => res.json({ message: 'Utilisateur modifié' }))
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ message: 'erreur bdd', error }));
  },



  campaigns: async (req, res) => {
    try {
      const campaigns = await Campaign.findAll({
        include: [CampaignPictures]
      });
      const deletedCampaigns = await Campaign.findAll({
        where: {
          deletedAt: {
            [Op.ne]: null   //? Op.ne = Opérateur de comparaison "non égal à" de sequelize donc "deletedAt non égal à null"
          }
        },
        paranoid: false
      });
      res.render('campaigns', { campaigns, deletedCampaigns });
    } catch (error) {
      console.error(error);
      res.status(500).render('campaigns', { error: 'Une erreur est survenue' });
    }
  },


  trees: async (req, res) => {
    try {
      const trees = await Trees.findAll();
      const allTrees = await Trees.findAll({
        paranoid: false
      });

      const deletedTrees = allTrees.filter(tree => tree.deletedAt !== null);

      res.render('trees', { trees, deletedTrees });
    } catch (error) {
      console.error(error);
      res.status(500).render('trees', { error: 'Une erreur est survenue' });
    }
  },

  addUser: (req, res) => {
    const { lastname, firstname, email, password, role } = req.body // Récupère les données du formulaire 

    if (!lastname || !firstname || !email || !password || !role) {
      return res.status(400).json({ message: 'Un ou plusieurs champs obligatoires sont manquants' });
    }

    User.findOne({ where: { email: email }, raw: true })
      .then(user => {
        if (user) {
          return res.status(409).json({ message: 'Cet email est déjà utilisé' });
        }

        bcrypt.hash(password, 10)
          .then(hash => {
            req.body.password = hash;

            User.create(req.body)
              .then(() => res.redirect('/admin/dashboard'))
              .catch(error => res.status(500).json({ message: 'erreur bdd', error }));

          })
          .catch(error => res.status(500).json({ message: 'erreur bdd', error }));

      })
  },
}