import TelegramBot from 'node-telegram-bot-api';
import express from 'express';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import { syncDb } from "./models/syncDb.js";
import routes from './routes/routesMain.js';

const app = express();
app.use(bodyParser.json());

export const bots = {};
export const referrals = {}; // Сюда будем добавлять уникальные рефералы для каждого бота, разделяя их по токену
const userReferrals = {}; // Аналогично, разделим по токену

function generateReferralHash() {
    return crypto.randomBytes(16).toString('hex');
}

export function startBot(apiToken, storeUrl, username) {
    if (bots[apiToken]) {
        console.log(`Bot with token ${apiToken} is already running.`);
        return;
    }

    const bot = new TelegramBot(apiToken, { polling: true });
    bots[apiToken] = { botInstance: bot, username, storeUrl };

    // Инициализация структуры данных для рефералов бота
    referrals[apiToken] = {};
    userReferrals[apiToken] = {};

    bot.onText(/\/start/, async (msg) => {
        const chatId = msg.chat.id;
        const startCommand = msg.text.split(' ')[1];

        // Работа с реферальной ссылкой, только если она относится к данному боту
        if (startCommand && referrals[apiToken][startCommand]) {
            const referral = referrals[apiToken][startCommand];
            if (!referral.chatIds.has(chatId)) {
                referral.chatIds.add(chatId);
                userReferrals[apiToken][chatId] = startCommand;

                bot.sendMessage(chatId, 'Referral registered successfully!');
            }
        }

        bot.sendMessage(chatId, 'Bot working! Use /getreferral to get your referral link.');
    });

    bot.onText(/\/getreferral/, (msg) => {
        const chatId = msg.chat.id;
        if (userReferrals[apiToken][chatId]) {
            bot.sendMessage(chatId, 'You already have a referral link.');
            return;
        }

        const referralHash = generateReferralHash();
        referrals[apiToken][referralHash] = { apiToken, chatIds: new Set() };
        userReferrals[apiToken][chatId] = referralHash;

        const referralLink = `https://t.me/${username}?start=${referralHash}`;
        bot.sendMessage(chatId, `Here is your referral link: ${referralLink}`);
    });

    bot.onText(/\/myreferrals/, (msg) => {
        const chatId = msg.chat.id;
        const referralHash = userReferrals[apiToken][chatId];
        if (referralHash) {
            const referral = referrals[apiToken][referralHash];
            const referralCount = referral ? referral.chatIds.size : 0;
            const referralLink = `https://t.me/${username}?start=${referralHash}`;

            bot.sendMessage(chatId, `Your referral link: ${referralLink} has ${referralCount} referral(s).`);
        } else {
            bot.sendMessage(chatId, 'You have not created a referral link yet.');
        }
    });

    bot.onText(/\/info/, (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, 'Bot is working and configured.');
    });

    console.log(`Bot with token ${apiToken} is started.`);
}

// Подключаем маршруты
app.use(routes);

app.listen(3000, async () => {
    (await syncDb);
    console.log('Node.js server is running on port 3000');
});
