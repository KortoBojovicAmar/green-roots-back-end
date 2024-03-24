import express from 'express';
import userCtrl from '../controllers/user.js';

const router = express.Router(); // crée un routeur

// Middleware pour log les dates de requêtes

router.use((req, res, next) => {
    const event = new Date();
    console.log('Request on User at: ', event.toString());
    console.log('Request Method: ', req.method);
    console.log('Request URL: ', req.url);
    console.log('Form Data: ', req.body);
    next();
});


router.get('/', userCtrl.getAllUsers); // récupérer les utilisateurs existants
router.get('/:id', userCtrl.getUsers); // récupérer un seul utilisateur existant

router.post('', userCtrl.addUser); // créer un nouvel utilisateur
router.post('/modif/:id', userCtrl.updateUser); // modifier un utilisateur existant

router.post('/:id', userCtrl.deleteUser); // supprimer un utilisateur existant
router.post('/trash/:id', userCtrl.softDeleteUser); // supprimer un utilisateur existant (soft delete donc récupérable)
router.post('/untrash/:id', userCtrl.untrashUser); // restaurer un utilisateur supprimé
router.get('/deleted', userCtrl.getDeletedUsers);    // récupérer tous les utilisateurs supprimés en soft delete

export default router; 