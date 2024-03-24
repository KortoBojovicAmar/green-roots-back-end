import { Trees } from '../configs/relations.js';
import { isAdmin } from '../middlewares/isAdminMiddleware.js';

export default {

    // Créer une nouvelle campagne
    addTree: (req, res) => {
        Trees.create(req.body)
            .then(Tree => {
                if (isAdmin) { return res.redirect('/admin/trees') }
                else {
                    res.status(201).json({ message: 'tree créé', data: Tree })
                }
            })
            .catch(error => res.status(500).json({ message: 'Erreur lors de la création de la tree', error }));
    },

    // Obtenir toutes les trees
    getAllTrees: (req, res) => {
        Trees.findAll()
            .then(Trees => res.json(Trees))
            .catch(error => res.status(500).json({ message: 'Erreur lors de la récupération des trees', error }));
    },

    // Obtenir une tree par ID
    getTree: (req, res) => {
        let TreeId = parseInt(req.params.id)

        if (!TreeId) {
            return res.status(400).json({ message: 'id non valide' });
        }

        Trees.findOne({ where: { id: TreeId }, raw: true })
            .then(Tree => {
                if (Tree) {
                    res.json(Tree);
                } else {
                    res.status(404).json({ message: 'tree non trouvée' });
                }
            })
            .catch(error => res.status(500).json({ message: 'Erreur lors de la récupération de tree', error }));
    },

    // Mettre à jour une tree par ID
    updateTree: (req, res) => {
        let TreeId = parseInt(req.params.id)

        if (!TreeId) {
            return res.status(400).json({ message: 'id non valide' });
        }

        Trees.findOne({ where: { id: TreeId } })
            .then(tree => {
                if (!tree) {
                    return res.status(404).json({ message: 'tree non trouvé' });
                }

                // Mettre à jour les propriétés de l'arbre
                for (let prop in req.body) {
                    tree[prop] = req.body[prop];
                }

                // Sauvegarder l'arbre mis à jour
                tree.save()
                    .then(() => {
                        if (isAdmin) {
                            // Si l'utilisateur est un admin, redirige vers /admin/trees pour ne pas changer de page et actualiser
                            res.redirect('/admin/trees');
                        } else {
                            res.json({ message: 'tree modifié' })
                        }
                    })
                    .catch(error => res.status(500).json({ error }));
            })
            .catch(error => res.status(500).json({ message: 'Erreur lors de la mise à jour de tree', error: error }));
    },

    // Supprimer une tree par ID (soft delete)
    trashTree: (req, res) => {
        let TreeId = parseInt(req.params.id)

        if (!TreeId) {
            return res.status(400).json({ message: 'id non valide' });
        }

        Trees.destroy({ where: { id: TreeId } })
            .then(() => {
                if (isAdmin) {
                    // Si l'utilisateur est un admin, redirige vers /admin/trees pour ne pas changer de page et actualiser
                    res.redirect('/admin/trees');
                } else {
                    res.json({ message: 'tree supprimé' })
                }
            })
            .catch(error => res.status(500).json({ error }));
    },

    // Restaurer une tree supprimée par ID
    untrashTree: (req, res) => {
        let TreeId = parseInt(req.params.id)

        if (!TreeId) {
            return res.status(400).json({ message: 'id non valide' });
        }

        Trees.restore({ where: { id: TreeId } })
            .then(() => {
                if (isAdmin) {
                    // Si l'utilisateur est un admin, redirige vers /admin/trees pour ne pas changer de page et actualiser
                    res.redirect('/admin/trees');
                } else {
                    res.json({ message: 'tree restauré' })
                }
            })
            .catch(error => res.status(500).json({ error }));
    },

    // Supprimer définitivement une tree par ID
    deleteTree: (req, res) => {
        let TreeId = parseInt(req.params.id)

        if (!TreeId) {
            return res.status(400).json({ message: 'id non valide' });
        }

        Trees.destroy({ where: { id: TreeId }, force: true })
            .then(() => {
                if (isAdmin) {
                    // Si l'utilisateur est un admin, redirige vers /admin/trees pour ne pas changer de page et actualiser
                    res.redirect('/admin/trees');
                } else {
                    res.json({ message: 'tree supprimé définitivement' })
                }
            })
            .catch(error => res.status(500).json({ error }));
    }
}