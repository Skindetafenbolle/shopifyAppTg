import {DataTypes} from "sequelize";
import {sequelize} from "../config/database.js";
import {Bot} from "./bot.model.js";

export const BotSettings = sequelize.define('BotSettings', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    buttonInfoText: {
        type: DataTypes.STRING,
        allowNull: false
    },
    buttonInfoUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    buttonHelpText: {
        type: DataTypes.STRING,
        allowNull: false
    },
    buttonHelpUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    discountReferralCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    discountPercentage: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0
    },
    botId: {
        type: DataTypes.INTEGER,
        references: {
            model: Bot,
            key: 'id'
        }
    }
}, {
    tableName: 'BotSettings',
    timestamps: false
});

BotSettings.belongsTo(Bot, { foreignKey: 'botId', as: 'bot' });
Bot.hasOne(BotSettings, { foreignKey: 'botId', as: 'settings' });
