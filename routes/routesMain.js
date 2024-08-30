import express from 'express';
import { startBot, bots, referrals } from '../instanceBot.js';

const router = express.Router();

router.post('/start-bot', (req, res) => {
    const { apiToken, storeUrl, username } = req.body;

    if (!apiToken || !storeUrl || !username) {
        return res.status(400).json({ error: 'API token, store URL, and username are required' });
    }

    startBot(apiToken, storeUrl, username);

    res.status(200).json({ status: 'Bot started successfully' });
});

router.get('/allBots', (req, res) => {
    const activeBots = Object.keys(bots).map(apiToken => ({
        apiToken,
        username: bots[apiToken].username,
        storeUrl: bots[apiToken].storeUrl
    }));
    return res.status(200).json({ activeBots });
});

router.get('/referral/:hash', (req, res) => {
    const { hash } = req.params;
    if (referrals[hash]) {
        const { apiToken, chatIds } = referrals[hash];
        return res.status(200).json({ apiToken, chatIds: Array.from(chatIds) });
    }
    return res.status(404).json({ error: 'Referral not found' });
});

export default router;
