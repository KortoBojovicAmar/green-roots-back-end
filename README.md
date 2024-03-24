# API REST Express de Green roots

Création d'un API dans le cadre d'un projet tutoré en groupe du nom de green roots (projet fictif), le but étant d'envoyer du json à notre front react qui se trouve dans un hébergement séparé.

Green roots est un site de "vente" d'arbres qui seront plantés par les entreprises proposant des campagnes de reforestation, avec un suivi personnel de nos arbres, c'est à dire leur santé, leur taille etc.

Etant donné que c'est un projet d'études, les logs d'erreur restent détaillés après production, et les informations sur la sécurité du site sont dévoilées ci-dessous.

## Comment interagir sur les utilisateurs dans la bdd

Tout d'abord pour toute interaction avec les données utilisateur il faut utiliser le JSON web token.

**Récupérer tous les utilisateurs :**

Méthode : GET  
URL : /users  
Exemple de réponse : `200 OK, { datas: [ { id: 1, lastname: "Doe", firstname: "John", ... }, ... ] }`

**Récupérer un utilisateur spécifique :**

Méthode : GET  
URL : /users/:id  
Remplacez :id par l'ID de l'utilisateur que vous souhaitez récupérer.  
Exemple de réponse : `200 OK, { datas: { id: 1, lastname: "Doe", firstname: "John", ... } }`

**Créer un nouvel utilisateur :**

Méthode : PUT  
URL : /users  
Corps de la requête : JSON avec les champs lastname, firstname, email, password, role.  
Exemple de réponse : `201 Created, { message: 'Utilisateur créé', data: { id: 123, lastname: "Doe", firstname: "John", ... } }`

**Modifier un utilisateur existant :**

Méthode : PATCH  
URL : /users/:id  
Remplacez :id par l'ID de l'utilisateur que vous souhaitez modifier.  
Corps de la requête : JSON avec les champs que vous souhaitez modifier.  
Exemple de réponse : `200 OK, { message: 'Utilisateur modifié', data: { id: 123, lastname: "Doe", firstname: "John", ... } }`

**Supprimer un utilisateur existant :**

Méthode : DELETE  
URL : /users/:id  
Remplacez :id par l'ID de l'utilisateur que vous souhaitez supprimer.  
Exemple de réponse : `200 OK, { message: 'Utilisateur supprimé' }`

**Supprimer un utilisateur existant (soft delete) :**

Méthode : DELETE  
URL : /users/trash/:id  
Remplacez :id par l'ID de l'utilisateur que vous souhaitez supprimer.  
Exemple de réponse : `200 OK, { message: 'Utilisateur déplacé à la corbeille' }`

**Restaurer un utilisateur supprimé :**

Méthode : POST  
URL : /users/untrash/:id  
Remplacez :id par l'ID de l'utilisateur que vous souhaitez restaurer.  
Exemple de réponse : `200 OK, { message: 'Utilisateur restauré', data: { id: 123, lastname: "Doe", firstname: "John", ... } }`

**Se connecter avec un utilisateur**

Méthode : POST
URL : /auth/login
Corps de la requête : JSON avec les champs email et password.

## Authentification JWT

Le token JWT est généré par le serveur lorsqu'un utilisateur se connecte avec succès.  
Ce token est ensuite renvoyé au client et stocké côté client, généralement dans les cookies ou dans le stockage local.  
Pour chaque requête ultérieure que le client envoie au serveur, il inclut ce token JWT dans l'en-tête de la requête.  
Le serveur utilise ce token pour authentifier l'utilisateur et vérifier ses autorisations.  
Exemple d'en-tête : `Authorization: Bearer <token>`

On peut voir le contenu de ce token quand on le récupère, sur https://jwt.io/ en le collant simplement.

En l'occurence, sur ce projet, le token est programmé pour durer 24H, au delà de cette durée, il sera re-généré au moment de la première connexion pour 24h.

## Hash du password avec BCRYPT

Sert à stocker le password des utilisateurs en version hashée (cryptée),  
pour éviter que lors d'un piratage, les mots de passe des utilisateurs soient récupérés.

C'est une obligation légale de sécuriser le stockage des données sensibles.
