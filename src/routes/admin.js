import express from 'express';
import adminCtrl from '../controllers/admin.js';
import { isAdmin } from '../middlewares/isAdminMiddleware.js';
import checkSession from '../middlewares/checkSession.js';

const router = express.Router();

router.use((req, res, next) => { // Middleware pour log les dates de requêtes 
    const event = new Date();
    console.log('ADMIN request on User at: ', event.toString());
    console.log('Request Method: ', req.method);
    console.log('Request URL: ', req.url);
    console.log('Form Data: ', req.body);
    next();
});

// Routes pour l'admin
router.get('', adminCtrl.loginform);
router.post('/login', adminCtrl.loginsub);
router.get('/dashboard', checkSession, isAdmin, adminCtrl.dashboard); // Affiche le tableau de l'admin.
router.get('/campaigns', checkSession, adminCtrl.campaigns); // Affiche les campagnes de l'admin.
router.get('/trees', checkSession, adminCtrl.trees); // Affiche les arbres de l'admin.
router.post('/modif/:id', checkSession, adminCtrl.updateUser); // Modifie un utilisateur.
router.post('/adduser', checkSession, adminCtrl.addUser); // Ajoute un utilisateur.
router.get('/logout', adminCtrl.logout); // Déconnecte l'admin.

export default router; 