import {sequelize} from "../config/database.js";
import {DataTypes} from "sequelize";

import {User} from "./user.model.js";

export const Referral = sequelize.define('Referral', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    referralHash: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    referrerUserId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id_user'
        }
    },
    referredUserId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id_user'
        }
    }
}, {
    tableName: 'Referrals',
    timestamps: false
});

Referral.belongsTo(User, { as: 'referrer', foreignKey: 'referrerUserId' });
Referral.belongsTo(User, { as: 'referred', foreignKey: 'referredUserId' });

