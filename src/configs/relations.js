import sequelize from './sequelize.js';
import User from '../models/user.js';
import Purchase from '../models/purchase.js';
import Campaign from '../models/campaign.js';
import Trees from '../models/trees.js';
import TrackedTree from '../models/trackedTree.js';
import TrackingSnapshot from '../models/trackingSnapshot.js';
import CampaignPictures from '../models/campaignPictures.js';
import Include from '../models/include.js';
import bcrypt from 'bcrypt';

//? Associer Purchase à User avec une contrainte de rôle (user) pour les achats
User.hasMany(Purchase, { foreignKey: 'id_user', constraints: false, scope: { role: ['user'] } });
Purchase.belongsTo(User, { foreignKey: 'id_user', constraints: false });

//? Associer Campaign à User avec une contrainte de rôle (admin, manager) pour les campagnes
User.hasMany(Campaign, { foreignKey: 'id_user', constraints: false, scope: { role: ['admin', 'manager'] } });
Campaign.belongsTo(User, { foreignKey: 'id_user', constraints: false });

//? Associer Tree à Campaign avec une contrainte de rôle (admin, manager) pour les variétés d'arbres
Campaign.hasMany(Trees, { foreignKey: 'campaignId', constraints: false });
Trees.belongsTo(Campaign, { foreignKey: 'campaignId', constraints: false });

//? Associer TrackedTree à User avec une contrainte de rôle (admin, partner) pour les arbres suivis
User.hasMany(TrackedTree, { foreignKey: 'id_user', constraints: false, scope: { role: ['admin', 'partner'] } });
TrackedTree.belongsTo(User, { foreignKey: 'id_user', constraints: false });

//? Associer TrackedTree à Campaign avec une contrainte de rôle (admin, partner) pour les arbres suivis
TrackedTree.hasMany(TrackingSnapshot, { foreignKey: 'id_tracked_tree' });
TrackingSnapshot.belongsTo(TrackedTree, { foreignKey: 'id_tracked_tree' });

//? Associer Campaign à CampaignPictures avec une contrainte de rôle (admin, manager) pour les images de campagne
Campaign.hasMany(CampaignPictures, { foreignKey: 'campaignId' });
CampaignPictures.belongsTo(Campaign, { foreignKey: 'campaignId' });

//? Associer Tree à Include avec une contrainte de rôle (admin, manager) pour les variétés d'arbres incluses
Include.belongsTo(Purchase, { foreignKey: 'purchaseId' });
Include.belongsTo(Trees, { foreignKey: 'treeId' });

//? Associer Purchase à Include avec une contrainte de rôle (user) pour les achats
Purchase.hasMany(Include, { foreignKey: 'purchaseId' });
Trees.hasMany(Include, { foreignKey: 'treeId' });

//? Synchroniser les modèles avec la base de données
sequelize.sync({ alter: true }).then(async () => {
    console.log('Models synchronisés avec succès');



    // //? Création d'un admin ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // const admin = await User.create({ lastname: 'admin', firstname: 'admin', password: bcrypt.hashSync('admin', 10), email: 'admin@admin.com', role: 'admin', }); console.log("Admin créé avec ID: ", admin.id);


    // //? Tableau d'utilisateurs à créer -----------------------------------------------------------------------------------------------------------------------------------------------------------
    // const users = [
    //     { lastname: 'Terieur', firstname: 'Alain', password: 'password', email: 'alain.terieur@mail.com', role: 'partner' },
    //     { lastname: 'Marchand', firstname: 'Gerard', password: 'password', email: 'gerard.marchand@mail.com', role: 'partner' },
    //     { lastname: 'Terieur', firstname: 'Alex', password: 'password', email: 'alex.terieur@mail.com', role: 'partner' },
    //     { lastname: 'Perrier', firstname: 'Robert', password: 'password', email: 'robert.perrier@mail.com', role: 'partner' },
    //     { lastname: 'Husse', firstname: 'Anne', password: 'password', email: 'anne.husse@mail.com', role: 'manager' },
    //     { lastname: 'Petit', firstname: 'Nathalie', password: 'password', email: 'nathalie.petit@mail.com', role: 'manager' },
    //     { lastname: 'Dupont', firstname: 'Jean', password: 'password', email: 'jean.dupont@mail.com', role: 'user' },
    //     { lastname: 'Martin', firstname: 'Pierre', password: 'password', email: 'pierre.martin@mail.com', role: 'user' },
    //     { lastname: 'Lefevre', firstname: 'Julie', password: 'password', email: 'julie.lefevre@mail.com', role: 'user' },
    //     { lastname: 'Lemoine', firstname: 'Sophie', password: 'password', email: 'sophie.lemoine@mail.com', role: 'user' },
    //     { lastname: 'Moreau', firstname: 'Luc', password: 'password', email: 'luc.moreau@mail.com', role: 'user' },
    //     { lastname: 'Simon', firstname: 'Paul', password: 'password', email: 'paul.simon@mail.com', role: 'user' },
    //     { lastname: 'Laurent', firstname: 'Claire', password: 'password', email: 'claire.laurent@mail.com', role: 'user' },
    //     { lastname: 'Roux', firstname: 'Nicolas', password: 'password', email: 'nicolas.roux@mail.com', role: 'user' },
    //     { lastname: 'Bertrand', firstname: 'Marie', password: 'password', email: 'marie.bertrand@mail.com', role: 'user' },
    //     { lastname: 'Girard', firstname: 'David', password: 'password', email: 'david.girard@mail.com', role: 'user' },
    //     { lastname: 'Leroy', firstname: 'Isabelle', password: 'password', email: 'isabelle.leroy@mail.com', role: 'user' },
    //     { lastname: 'Morel', firstname: 'Marc', password: 'password', email: 'marc.morel@mail.com', role: 'user' },
    //     { lastname: 'Fournier', firstname: 'Valérie', password: 'password', email: 'valerie.fournier@mail.com', role: 'user' },
    //     { lastname: 'Guerin', firstname: 'Thomas', password: 'password', email: 'thomas.guerin@mail.com', role: 'user' },
    //     { lastname: 'Fontaine', firstname: 'Catherine', password: 'password', email: 'catherine.fontaine@mail.com', role: 'user' },
    //     { lastname: 'Lefebvre', firstname: 'Philippe', password: 'password', email: 'philippe.lefebvre@mail.com', role: 'user' },
    //     { lastname: 'Leroux', firstname: 'Christine', password: 'password', email: 'christine.leroux@mail.com', role: 'user' },
    //     { lastname: 'Morel', firstname: 'Francois', password: 'password', email: 'francois.morel@mail.com', role: 'user' },
    //     { lastname: 'Fournier', firstname: 'Martine', password: 'password', email: 'martine.fournier@mail.com', role: 'user' },
    //     { lastname: 'Girard', firstname: 'Bernard', password: 'password', email: 'bernard.girard@mail.com', role: 'user' },
    //     { lastname: 'Andre', firstname: 'Daniel', password: 'password', email: 'daniel.andre@mail.com', role: 'user' },
    //     { lastname: 'Mercier', firstname: 'Patrick', password: 'password', email: 'patrick.mercier@mail.com', role: 'user' },
    //     { lastname: 'Blanc', firstname: 'Marcel', password: 'password', email: 'marcel.blanc@mail.com', role: 'user' },
    //     { lastname: 'Guerin', firstname: 'Nicole', password: 'password', email: 'nicole.guerin@mail.com', role: 'user' },
    //     { lastname: 'Lemoine', firstname: 'Stephane', password: 'password', email: 'stephane.lemoine@mail.com', role: 'user' },
    //     { lastname: 'Roux', firstname: 'Sylvie', password: 'password', email: 'sylvie.roux@mail.com', role: 'user' },
    //     { lastname: 'Vincent', firstname: 'Thierry', password: 'password', email: 'thierry.vincent@mail.com', role: 'user' },
    //     { lastname: 'Leroy', firstname: 'Dominique', password: 'password', email: 'dominique.leroy@mail.com', role: 'user' },
    //     { lastname: 'Bourgeois', firstname: 'Claude', password: 'password', email: 'claude.bourgeois@mail.com', role: 'user' },
    //     { lastname: 'Renaud', firstname: 'Isabelle', password: 'password', email: 'isabelle.renaud@mail.com', role: 'user' },
    // ];


    // //? boucle sur le tableau d'utilisateurs pour les créer -------------------------------------------------------------------------------------------------------------------------------------
    // for (let i = 0; i < users.length; i++) {
    //     const user = await User.create({
    //         lastname: users[i].lastname,
    //         firstname: users[i].firstname,
    //         password: bcrypt.hashSync(users[i].password, 10),
    //         email: users[i].email,
    //         role: users[i].role,
    //     });
    // }


    // //? Tableau de campagnes à créer -----------------------------------------------------------------------------------------------------------------------------------------------------------
    // const Campaigns = [
    //     {
    //         name: 'Campagne forêt de Sherwood',
    //         description: 'Campagne de plantation d\'arbres en forêt de Sherwood pour lutter contre la déforestation et le réchauffement climatique en partenariat avec Robin des Bois',
    //         starting_date: new Date(),
    //         ending_date: new Date(2028, 11, 30),
    //         place: 'Sherwood',
    //         images: [
    //             "https://images.unsplash.com/photo-1591081658714-f576fb7ea3ed?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //             "https://images.unsplash.com/photo-1531370356290-5892e5dce3b7?q=80&w=2077&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //             "https://plus.unsplash.com/premium_photo-1687879693831-88cd336c13fb?q=80&w=1940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //             "https://images.unsplash.com/photo-1622541228926-ead8a35fbdd7?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    //         ]
    //     },
    //     {
    //         name: 'Campagne forêt de Fangorn',
    //         description: 'Campagne de plantation d\'arbres en forêt de Fangorn pour lutter contre la déforestation et le réchauffement climatique en partenariat avec les Ents',
    //         starting_date: new Date(),
    //         ending_date: new Date(2029, 11, 30),
    //         place: 'Fangorn',
    //         images: [
    //             "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_1280.jpg",
    //             "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //             "https://images.unsplash.com/photo-1622541228926-ead8a35fbdd7?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    //         ]
    //     },
    //     {
    //         name: 'Campagne forêt de Mirkwood',
    //         description: 'Campagne de plantation d\'arbres en forêt de Mirkwood pour lutter contre la déforestation et le réchauffement climatique en partenariat avec les Elfes',
    //         starting_date: new Date(),
    //         ending_date: new Date(2030, 11, 30),
    //         place: 'Mirkwood',
    //         images: [
    //             "https://cdn.pixabay.com/photo/2015/12/01/20/28/forest-1072828_1280.jpg",
    //             "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //             "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    //         ]
    //     },
    //     {
    //         name: 'Campagne forêt de Lothlorien',
    //         description: 'Campagne de plantation d\'arbres en forêt de Lothlorien pour lutter contre la déforestation et le réchauffement climatique en partenariat avec les Elfes',
    //         starting_date: new Date(),
    //         ending_date: new Date(2031, 11, 30),
    //         place: 'Lothlorien',
    //         images: [
    //             "https://cdn.pixabay.com/photo/2018/04/06/00/25/trees-3294681_1280.jpg",
    //             "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //             "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    //         ]
    //     },
    //     {
    //         name: 'Campagne forêt de Doriath',
    //         description: 'Campagne de plantation d\'arbres en forêt de Doriath pour lutter contre la déforestation et le réchauffement climatique en partenariat avec les Elfes',
    //         starting_date: new Date(),
    //         ending_date: new Date(2032, 11, 30),
    //         place: 'Doriath',
    //         images: [
    //             "https://cdn.pixabay.com/photo/2016/11/18/21/46/fog-1837025_1280.jpg",
    //             "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //             "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    //         ]
    //     },
    //     {
    //         name: 'Campagne forêt de Greenwood',
    //         description: 'Campagne de plantation d\'arbres en forêt de Greenwood pour lutter contre la déforestation et le réchauffement climatique en partenariat avec les Elfes',
    //         starting_date: new Date(),
    //         ending_date: new Date(2033, 11, 30),
    //         place: 'Greenwood',
    //         images: [
    //             "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //             "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //             "https://images.pexels.com/photos/3632689/pexels-photo-3632689.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //         ]
    //     },
    //     {
    //         name: 'Du bambou pour la Chine',
    //         description: 'Campagne de plantation de bambous en Chine pour sauver les pandas qui en dépendent pour leur alimentation et leur habitat naturel',
    //         starting_date: new Date(),
    //         ending_date: new Date(2034, 11, 30),
    //         place: 'Chine',
    //         images: [
    //             "https://images.pexels.com/photos/52706/pexels-photo-52706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //             "https://images.pexels.com/photos/3632689/pexels-photo-3632689.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //             "https://images.pexels.com/photos/6793716/pexels-photo-6793716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //         ]
    //     },
    //     {
    //         name: 'Reforestation de l\'Amazonie',
    //         description: 'L\'Amazonie est le poumon de la planète, il est urgent de la reboiser pour lutter contre la déforestation due à l\'exploitation minière et agricole, ainsi que les incendies de forêt et la culture intensive',
    //         starting_date: new Date(),
    //         ending_date: new Date(2035, 11, 30),
    //         place: 'Mirkwood',
    //         images: [
    //             "https://images.pexels.com/photos/2739664/pexels-photo-2739664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //             "https://images.pexels.com/photos/975771/pexels-photo-975771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //             "https://images.pexels.com/photos/2739664/pexels-photo-2739664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //         ]
    //     },
    //     {
    //         name: 'Campagne forêt de Mirkwood',
    //         description: 'Campagne de plantation d\'arbres en forêt de Mirkwood pour lutter contre la déforestation et le réchauffement climatique en partenariat avec les Elfes',
    //         starting_date: new Date(),
    //         ending_date: new Date(2036, 11, 30),
    //         place: 'Mirkwood',
    //         images: [
    //             "https://images.pexels.com/photos/18142907/pexels-photo-18142907/free-photo-of-nature-foret-arbres-vert.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //             "https://images.pexels.com/photos/18142905/pexels-photo-18142905/free-photo-of-nature-foret-arbres-centrale.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //             "https://images.pexels.com/photos/3089988/pexels-photo-3089988.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //         ]
    //     },
    //     {
    //         name: 'Reforestation en Australie',
    //         description: 'Campagne de reforestation en Australie pour lutter contre les incendies de forêt et le réchauffement climatique',
    //         starting_date: new Date(),
    //         ending_date: new Date(2022, 11, 24),
    //         place: 'Australie',
    //         images: [
    //             "https://cdn.pixabay.com/photo/2013/04/21/03/47/kyoto-106056_960_720.jpg",
    //             "https://images.pexels.com/photos/18142905/pexels-photo-18142905/free-photo-of-nature-foret-arbres-centrale.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //             "https://images.pexels.com/photos/3089988/pexels-photo-3089988.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //         ]
    //     },
    //     {
    //         name: 'Sauvons la forêt boréale',
    //         description: 'Campagne de protection de la forêt boréale en Russie pour lutter contre la déforestation, en partenariat avec les ONG locales',
    //         starting_date: new Date(),
    //         ending_date: new Date(2023, 11, 30),
    //         place: 'Russie',
    //         images: [
    //             "https://cdn.pixabay.com/photo/2022/01/06/06/08/katun-river-6918707_1280.jpg",
    //             "https://images.pexels.com/photos/18142907/pexels-photo-18142907/free-photo-of-nature-foret-arbres-vert.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //             "https://images.pexels.com/photos/18142905/pexels-photo-18142905/free-photo-of-nature-foret-arbres-centrale.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //             "https://images.pexels.com/photos/3089988/pexels-photo-3089988.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //         ]
    //     },
    //     {
    //         name: 'Un toit pour les orangs-outans',
    //         description: 'Campagne de plantation de forêts en Indonésie pour sauver les orangs-outans qui en dépendent pour leur alimentation et leur habitat naturel',
    //         starting_date: new Date(),
    //         ending_date: new Date(2024, 11, 30),
    //         place: 'Indonésie',
    //         images: [
    //             "https://cdn.pixabay.com/photo/2017/04/09/09/56/avenue-2215317_1280.jpg",
    //             "https://images.pexels.com/photos/18142907/pexels-photo-18142907/free-photo-of-nature-foret-arbres-vert.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //             "https://images.pexels.com/photos/18142905/pexels-photo-18142905/free-photo-of-nature-foret-arbres-centrale.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //             "https://images.pexels.com/photos/3089988/pexels-photo-3089988.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //         ]
    //     },
    //     {
    //         name: 'Protégeons la forêt de Sherwood',
    //         description: 'Campagne de protection de la forêt de Sherwood en Angleterre pour lutter contre la déforestation, en partenariat avec Robin des Bois',
    //         starting_date: new Date(),
    //         ending_date: new Date(2025, 11, 30),
    //         place: 'Angleterre',
    //         images: [
    //             "https://cdn.pixabay.com/photo/2021/12/16/15/26/forest-6874717_1280.jpg",
    //             "https://images.pexels.com/photos/18142907/pexels-photo-18142907/free-photo-of-nature-foret-arbres-vert.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //             "https://images.pexels.com/photos/18142905/pexels-photo-18142905/free-photo-of-nature-foret-arbres-centrale.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //             "https://images.pexels.com/photos/3089988/pexels-photo-3089988.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //         ]
    //     },
    //     {
    //         name: 'Sauvons la forêt tropicale',
    //         description: 'Campagne de protection de la forêt tropicale en Afrique pour lutter contre la déforestation, en partenariat avec les communautés locales',
    //         starting_date: new Date(),
    //         ending_date: new Date(2026, 11, 30),
    //         place: 'Afrique',
    //         images: [
    //             "https://cdn.pixabay.com/photo/2022/05/15/17/25/forest-7198607_960_720.jpg",
    //             "https://images.pexels.com/photos/18142907/pexels-photo-18142907/free-photo-of-nature-foret-arbres-vert.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //             "https://images.pexels.com/photos/18142905/pexels-photo-18142905/free-photo-of-nature-foret-arbres-centrale.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //             "https://images.pexels.com/photos/3089988/pexels-photo-3089988.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //         ]
    //     },

    // ];


    // //? boucle sur le tableau de campagnes pour les créer -------------------------------------------------------------------------------------------------------------------------------------
    // let createdCampaigns = [];
    // for (let campaignData of Campaigns) {
    //     const campaign = await Campaign.create({
    //         name: campaignData.name,
    //         description: campaignData.description,
    //         starting_date: campaignData.starting_date,
    //         ending_date: campaignData.ending_date,
    //         place: campaignData.place,
    //         id_user: admin.id
    //     });

    //     for (let imageUrl of campaignData.images) {
    //         await CampaignPictures.create({
    //             image_url: imageUrl,
    //             campaignId: campaign.id
    //         })
    //     }
    //     createdCampaigns.push(campaign);
    // }


    // //? Créer 10 autres arbres avec des noms réels --------------------------------------------------------------------------------------------------------------------------------------------
    // const treeData = [
    //     { name: 'Chêne', kind: 'Feuillu', description: 'Arbre robuste et durable', price: 35.00, quantity: 200, image_url: "https://images.unsplash.com/photo-1603097121892-709f30dd2f29?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    //     { name: 'Érable', kind: 'Feuillu', description: 'Arbre à sirop', price: 30.00, quantity: 150, image_url: "https://images.unsplash.com/photo-1606958955675-1a42178361a0?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    //     { name: 'Palmier', kind: 'Tropical', description: 'Arbre des régions chaudes', price: 50.00, quantity: 50, image_url: "https://images.unsplash.com/photo-1432298026442-0eabd0a98870?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    //     { name: 'Bouleau', kind: 'Feuillu', description: 'Arbre à écorce blanche', price: 25.00, quantity: 175, image_url: "https://images.unsplash.com/photo-1589993859515-5864e1114164?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    //     { name: 'Cèdre', kind: 'Conifère', description: 'Arbre à bois parfumé', price: 40.00, quantity: 120, image_url: "https://plus.unsplash.com/premium_photo-1667926195926-b210e1963e2f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    //     { name: 'Frêne', kind: 'Feuillu', description: 'Arbre à bois dur', price: 33.00, quantity: 21, image_url: "https://images.unsplash.com/photo-1632357436983-a2a3725c4ba2?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    //     { name: 'Hêtre', kind: 'Feuillu', description: 'Arbre à bois clair', price: 28.00, quantity: 230, image_url: "https://images.unsplash.com/photo-1589720246565-9aae8c02932a?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    //     { name: 'If', kind: 'Conifère', description: 'Arbre à baies rouges', price: 45.00, quantity: 90, image_url: "https://images.unsplash.com/photo-1610193469261-105750d6c192?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    //     { name: 'Peuplier', kind: 'Feuillu', description: 'Arbre à croissance rapide', price: 20.00, quantity: 300, image_url: "https://images.unsplash.com/photo-1598491339978-c577ab6e77a3?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    //     { name: 'Séquoia', kind: 'Conifère', description: 'Arbre géant', price: 60.00, quantity: 30, image_url: "https://images.unsplash.com/photo-1531966662811-c6501e46eda6?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    // ];


    // //? boucle sur le tableau des campagnes pour les créer -------------------------------------------------------------------------------------------------------------------------------------
    // for (const campaign of createdCampaigns) {
    //     const trees = treeData.map(data => ({
    //         name: data.name,
    //         kind: data.kind,
    //         description: data.description,
    //         price: data.price,
    //         quantity: data.quantity,
    //         campaignId: campaign.id,
    //         image_url: data.image_url,
    //     }));

    //     await Trees.bulkCreate(trees); //? bulkCreate est une méthode de sequelize qui permet de créer plusieurs enregistrements en une seule fois
    // }
});


export { User, Purchase, Campaign, Trees, TrackedTree, TrackingSnapshot, CampaignPictures, Include } 
