import { User } from '../configs/relations.js';
import bcrypt from 'bcrypt';    // bcrypt est un package qui permet de hacher les mots de passe pour les sécuriser.
import { Op } from 'sequelize'; // Op est un opérateur de comparaison de sequelize utilisé pour éviter les injections SQL et pour permettre l'utilisation de noms de colonnes dynamiques.
import { isAdmin } from '../middlewares/isAdminMiddleware.js';

export default {

    //* récupérer tous les utilisateurs

    getAllUsers: (req, res) => {
        User.findAll()
            .then(users => res.json({ datas: users }))
            .catch(error => res.status(400).json({ message: 'erreur bdd', error }));
    },

    //* récupérer un utilisateur par son id

    getUsers: (req, res) => {
        let userId = parseInt(req.params.id)

        if (!userId) {
            return res.status(400).json({ message: 'id non valide' });
        }

        User.findOne({ where: { id: userId }, raw: true })
            .then(user => {
                if (user) {
                    res.json({ datas: user });
                } else {
                    res.status(404).json({ message: 'Utilisateur non trouvé' });
                }
            })
            .catch(error => res.status(500).json({ message: 'erreur bdd', error }));
    },

    //* créer un nouvel utilisateur

    addUser: (req, res) => {
        const { lastname, firstname, email, password, role } = req.body

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
                            .then((user) => res.json({ message: 'Utilisateur créé', data: user }))
                            .catch(error => res.status(500).json({ message: 'erreur bdd', error }));

                    })
                    .catch(error => res.status(500).json({ message: 'erreur bdd', error }));

            })
    },


    //* modifier un utilisateur existant

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
                    .then(() => {
                        if (isAdmin) {
                            // Si l'utilisateur est un admin, redirige vers /admin/dashboard pour ne pas changer de page et actualiser
                            res.redirect('/admin/dashboard');
                        } else {
                            res.json({ message: 'Utilisateur modifié' });
                        }
                    })
                    .catch(error => res.status(500).json({ error }));
            })
            .catch(error => res.status(500).json({ message: 'erreur bdd', error }));
    },

    //* router.delete sert à supprimer un utilisateur existant

    deleteUser: (req, res) => {
        let userId = parseInt(req.params.id)

        // Vérifie si le champ id est cohérent
        if (!userId) {
            return res.status(400).json({ message: 'id non valide' });
        }

        // suppression de l'utilisateur
        User.destroy({ where: { id: userId }, force: true })
            .then(() => {
                if (isAdmin) {
                    // Si l'utilisateur est un admin, redirige vers /admin/dashboard pour ne pas changer de page et actualiser
                    res.redirect('/admin/dashboard');
                } else {
                    res.json({ message: 'Utilisateur supprimé', id: req.params.id })
                }
            })
            .catch(error => res.status(500).json({ error }));
    },

    //* variante soft delete de l'utilisateur (user récupérable)
    softDeleteUser: (req, res) => {
        console.log(req.params);
        let userId = parseInt(req.params.id)

        // Vérifie si le champ id est cohérent
        if (!userId) {
            return res.status(400).json({ message: 'id non valide' });
        }

        // suppression de l'utilisateur
        User.destroy({ where: { id: userId } }) //? "force: true" enlevé pour soft delete
            .then(() => {
                if (isAdmin) {
                    // Si l'utilisateur est un admin, redirige vers /admin/dashboard pour ne pas changer de page et actualiser
                    res.redirect('/admin/dashboard');
                } else {
                    res.json({ message: 'Utilisateur supprimé', id: req.params.id });
                }
            })
            .catch(error => res.status(500).json({ error }));
    },

    //* restauration de l'utilisateur supprimé

    untrashUser: (req, res) => {
        let userId = parseInt(req.params.id)

        // Vérifie si le champ id est cohérent
        if (!userId) {
            return res.status(400).json({ message: 'id non valide' });
        }

        User.restore({ where: { id: userId } })
            .then(() => {
                if (isAdmin) {
                    // Si l'utilisateur est un admin, redirige vers /admin/dashboard pour ne pas changer de page et actualiser
                    res.redirect('/admin/dashboard');
                } else {
                    res.json({ message: 'Utilisateur restauré' });
                }
            })
            .catch(error => res.status(500).json({ error }));
    },

    //* récupérer tous les utilisateurs supprimés en soft delete

    getDeletedUsers: (req, res) => {
        User.findAll({
            where: {
                deletedAt: {
                    [Op.ne]: null //? Op.ne = Opérateur de comparaison "non égal à" de sequelize 
                }
            },
            paranoid: false //? "paranoid: false" pour récupérer les données supprimées en soft delete
        })
            .then(users => res.json({ datas: users }))
            .catch(error => res.status(400).json({ message: 'erreur bdd', error }));
    },
}