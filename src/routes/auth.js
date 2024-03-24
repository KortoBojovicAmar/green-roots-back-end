import express from 'express';
import userCtrl from '../controllers/auth.js'

// Récupération du routeur express
const router = express.Router();

// Middleware pour log les dates de requêtes

router.use((req, res, next) => {
    const event = new Date();
    console.log('AUTH Time: ', event.toString());
    next();
});


// Routage de la ressource auth
router.post('/login', userCtrl.login); // connexion d'un utilisateur existant

export default router;