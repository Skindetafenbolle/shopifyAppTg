import {sequelize} from "../config/database.js";
import {DataTypes} from "sequelize";
import {Bot} from "./bot.model.js";

export const User = sequelize.define('User', {
    id_user: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    refUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    countRef: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    discount: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0
    }
}, {
    tableName: 'Users',
    timestamps: false
});

User.belongsTo(Bot, { foreignKey: 'botId', as: 'bot' });

