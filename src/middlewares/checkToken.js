import jwt from 'jsonwebtoken';
import { isAdmin } from './isAdminMiddleware.js';

// Extraction du token

const extractBearer = (authorization) => {
    if (typeof authorization !== 'string') {
        return false;
    }

    // On isole le token
    const matches = authorization.match(/(Bearer)\s+(\S+)/i); // expression régulière qui signifie "Bearer" suivi d'un ou plusieurs caractères non blancs (espace, tabulation, retour à la ligne) et qui est insensible à la casse (i)

    return matches && matches[2];
}

// Vérification de la présence du token

const checkTokenMiddleware = (req, res, next) => {
    const token = req.headers.authorization && extractBearer(req.headers.authorization);

    if (token) {
        // Vérification de la validité du token
        jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
            if (error) {
                return res.status(401).json({ message: 'Token invalide' });
            }
            // res.locals.user = decodedToken;
            next();
        });
    } else {
        isAdmin(req, res, next);
    }
}




export default checkTokenMiddleware;