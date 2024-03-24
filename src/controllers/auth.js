import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default {
    // Routage de la ressource auth
    login: (req, res) => {
        const { email, password } = req.body;

        // Validation des données reçues
        if (!email || !password) {
            return res.status(400).json({ message: 'Un ou plusieurs champs obligatoires sont manquants' });
        }

        User.findOne({ where: { email: email }, raw: true })
            .then(user => {
                // vérifie si l'utilisateur existe déjà
                if (!user) {
                    return res.status(409).json({ message: 'Cet utilisateur n\'existe pas' });
                }

                // hashage du mot de passe avant de l'enregistrer
                bcrypt.compare(password, user.password)
                    .then(test => {
                        if (!test) {
                            return res.status(401).json({ message: 'Mauvais mot de passe' });
                        }

                        // Génération du token
                        const token = jwt.sign({
                            id: user.id,
                            lastname: user.lastname,
                            firstname: user.firstname,
                            email: user.email,
                            role: user.role
                        }, process.env.JWT_SECRET, { expiresIn: '24h' });
                        return res.json({ access_token: token });
                    })
                    .catch(error => res.status(500).json({ message: 'erreur dans le processus de connexion', error }));
            })
            .catch(error => res.status(500).json({ message: 'erreur bdd', error }));
    },
}