import express from 'express';

const router = express.Router();

import checkToken from '../middlewares/checkToken.js';
import user_router from './user.js';
import auth_router from './auth.js';
import adminRoutes from './admin.js';
import campaign_router from './campaign.js';
import tree_router from './tree.js';


// mise en place du routage

router.get('/', (req, res) => res.send('Hello World!')) // crée une route qui renvoie "Hello World!" en réponse à une requête GET sur la racine du serveur

router.use('/users', user_router);
router.use('/auth', auth_router);
router.use('/campaign', campaign_router);
router.use('/tree', tree_router);
router.use('/admin', adminRoutes);
router.get('*', (req, res) => res.status(501).send('la ressource n\'existe pas')) // crée une route qui renvoie une erreur 501 en réponse à une requête GET sur n'importe quelle autre route

export default router;