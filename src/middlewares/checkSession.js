function checkSession(req, res, next) {
    if (req.session && req.session.user) {
        req.user = req.session.user;
        next();
    } else {
        res.status(401).send('Non autorisé'); // Si l'utilisateur n'est pas connecté, on renvoie une erreur 401
    }
}

export default checkSession;