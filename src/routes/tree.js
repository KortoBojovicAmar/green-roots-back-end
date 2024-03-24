import express from 'express';
import treeCtrl from '../controllers/tree.js';

const router = express.Router(); // crée un routeur

// Middleware pour log les dates de requêtes
router.use((req, res, next) => {
    const event = new Date();
    console.log('TREE Time: ', event.toString());
    next();
});

router.get('/', treeCtrl.getAllTrees); // récupérer les tree existants
router.get('/:id', treeCtrl.getTree); // récupérer un seul tree

router.post('/', treeCtrl.addTree); // créer un nouveau tree
router.post('/:id', treeCtrl.updateTree); // modifier un tree existant

router.post('/untrash/:id', treeCtrl.untrashTree); // restaurer un tree supprimé
router.post('/trash/:id', treeCtrl.trashTree); // supprimer un tree existant
router.post('/untrash/:id', treeCtrl.untrashTree); // restaurer un tree supprimé
router.post('/delete/:id', treeCtrl.deleteTree); // supprimer un tree définitivement

export default router;