import express from "express";
import session from "express-session";
import cors from 'cors';
import sequelize from './src/configs/sequelize.js'; // importe la connexion à la base de données
import router from "./src/routes/router.js";

//initialisation de l'API

const app = express(); // on execute la fonction express

app.use(session({
    resave: false, // évite de sauvegarder la session à chaque requête
    secret: process.env.SECRET, // on ajoute une part d'aléatoire dans (.env) 
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(cors());

app.use(express.json()); // parse le body des requêtes en json (parse = analyse)
app.use(express.urlencoded({ extended: true })); // sert à encoder les données de la requête en url

app.use(express.static('./public')); // Pour accéder au fichier  statique ( CSS, img, js) stocké dans ./public,

// mise en place du routage
app.use(router);

//*********************** */
app.set('view engine', 'ejs'); // Pour utiliser les fichiers EJS pour définir et rendre les vues
app.set('views', './src/views');
//*********************** */

const port = process.env.SERVER_PORT || 3000; // variable port = 3000 ou la valeur de la variable d'environnement PORT

sequelize.authenticate() // vérifie la connexion à la base de données en utilisant les identifiants fournis dans le fichier db.config.js
    .then(() => console.log('Connexion à la base de données réussie'))
    .then(() => app.listen(port, () => {
        console.log(`Server en route sur http://localhost:${port}/`)
        console.log(`Back-office admin sur http://localhost:${port}/admin`)

    }))
    .catch((error) => console.error('Impossible de se connecter à la base de données:', error));
