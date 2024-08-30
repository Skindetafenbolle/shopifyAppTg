import {Bot} from "./bot.model.js";
import {User} from "./user.model.js";
import {BotSettings} from "./botSettings.model.js";
import {Referral} from "./referral.model.js";
import {Sale} from "./sale.model.js";

import {sequelize} from "../config/database.js";

export const  syncDb= sequelize.sync({ force: false, alter: true })
    .then(() => {
        console.log('Database & tables created and synchronized!');
    })
    .catch(error => console.log(error));
