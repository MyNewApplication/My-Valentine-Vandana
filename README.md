# 7 Days, 1 Truth – Love Vault

A minimalist, time-locked Valentine Week experience.

## Features
- **Time-Locked Cards**: 7 cards that unlock automatically at 12:00 AM IST on their respective days.
- **Secure Access**: Content is only accessible via a secret URL token.
- **Minimalist Design**: Dark theme, glassmorphism, and subtle animations.
- **No Database**: Simple JSON file for content storage.

## Setup

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Start Server**:
    ```bash
    npm start
    ```
    The server will run on `http://localhost:3000`.

3.  **Access the Vault**:
    Use the secret link printed in the console:
    `http://localhost:3000/?key=LOVE2026`

## Configuration

### Editing Content
Open `vaultData.json`. You can edit the `title`, `body`, and `quote` for each day.
**Do not change the `id` or `day` names unless you update the code logic.**

### Changing Unlock Dates
Edit the `date` field in `vaultData.json` (Format: `YYYY-MM-DD`).
The server uses `Asia/Kolkata` timezone to determine if a card is unlocked.

### Changing the Secret Key
Open `server.js` and change the `SECRET_KEY` variable:
```javascript
const SECRET_KEY = "YOUR_NEW_SECRET";
```

## Deployment
This project is ready for deployment on platforms like Render, Vercel, or Heroku.
- **Render/Heroku**: Just push the code. The `start` script is already configured.
- **Timezone**: Ensure the server timezone is set to `Asia/Kolkata` or rely on the code's explicit timezone handling (which uses `luxon` and is robust regardless of server time).

## Project Structure
- `server.js`: Main backend logic and time-locking.
- `vaultData.json`: Content data.
- `public/`: Frontend files (HTML, CSS, JS).
