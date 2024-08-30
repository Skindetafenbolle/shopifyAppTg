import {sequelize} from "../config/database.js";
import {DataTypes} from "sequelize";

export const Bot = sequelize.define('Bot', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    apiToken: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    botName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    storeUrl: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Bots',
    timestamps: false
});

