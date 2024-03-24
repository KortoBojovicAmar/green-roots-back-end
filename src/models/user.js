import sequelize from '../configs/sequelize.js';
import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    lastname: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    firstname: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    phone_number: DataTypes.STRING,
    address: DataTypes.STRING,
    zip_code: DataTypes.STRING,
    city: DataTypes.STRING,
    role: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            isIn: {
                args: [['admin', 'user', 'guest', 'partner', 'manager']], // Liste des rôles possibles
                msg: "Le rôle doit être 'admin', 'user', 'guest', 'partner' ou 'manager'"
            },
        },
    }
}, {
    paranoid: true,
});


export default User;