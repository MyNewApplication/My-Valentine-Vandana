const express = require('express');
const { DateTime } = require('luxon');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = "srikant-loves-vandana-forever"; // Secret access key
const TIMEZONE = "Asia/Kolkata";

app.use(express.static('public', { index: false }));

// Data Loading
const vaultDataPath = path.join(__dirname, 'vaultData.json');
let vaultData = [];

try {
    vaultData = JSON.parse(fs.readFileSync(vaultDataPath, 'utf8'));
} catch (err) {
    console.error("Error reading vaultData.json:", err);
}

// Middleware to check secret key
const checkKey = (req, res, next) => {
    const key = req.query.key;
    if (key === SECRET_KEY) {
        next();
    } else {
        // Return 404 or access denied to keep it mysterious
        res.status(404).send("Nothing to see here.");
    }
};

// API Endpoint to get card status
app.get('/api/vault', checkKey, (req, res) => {
    const now = DateTime.now().setZone(TIMEZONE);

    const vaultStatus = vaultData.map(card => {
        const unlockDate = DateTime.fromISO(card.date, { zone: TIMEZONE }).startOf('day');

        // Debug unlock time
        // console.log(`Card ${card.day}: Unlocks ${unlockDate.toISO()}, Now: ${now.toISO()}`);

        if (now >= unlockDate) {
            return {
                ...card,
                isUnlocked: true,
                status: 'unlocked'
            };
        } else {
            // Return stripped data for locked cards
            return {
                id: card.id,
                day: card.day,
                date: card.date,
                isUnlocked: false,
                status: 'locked',
                title: "Locked", // Placeholder
                body: "This truth isn't ready yet.",
                quote: "..."
            };
        }
    });

    res.json({
        currentTime: now.toISO(),
        cards: vaultStatus
    });
});

// Serve the main page ONLY if key is valid (optional, but good for privacy)
// Actually, static middleware handles 'index.html' at '/', which might bypass checkKey if we aren't careful.
// Let's protect the root route.
app.get('/', (req, res) => {
    if (req.query.key === SECRET_KEY) {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    } else {
        res.status(404).send("Page not found.");
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Love Vault server running on port ${PORT}`);
    console.log(`Access Link: http://localhost:${PORT}/?key=${SECRET_KEY}`);
    console.log(`Timezone: ${TIMEZONE}`);
    console.log(`Current Time (IST): ${DateTime.now().setZone(TIMEZONE).toFormat('yyyy-MM-dd HH:mm:ss')}`);
});
