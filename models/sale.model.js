import {sequelize} from "../config/database.js";
import {DataTypes} from "sequelize";
import {User} from "./user.model.js";

export const Sale = sequelize.define('Sale', {
    id_sale: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    countPerson: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    countSale: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id_user'
        }
    }
}, {
    tableName: 'Sales',
    timestamps: false
});

Sale.belongsTo(User, { foreignKey: 'userId', as: 'user' });

