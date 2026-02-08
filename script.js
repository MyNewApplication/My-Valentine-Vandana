document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('vault-grid');
    const REFRESH_INTERVAL = 60000; // Check every minute (optional) or just on load

    // Get Secret Key from URL
    const urlParams = new URLSearchParams(window.location.search);
    const key = urlParams.get('key');

    if (!key || key !== 'srikant-loves-vandana-forever') {
        document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;color:#444;">Access Denied</div>';
        return;
    }

    // Typing Effect Logic
    const welcomeOverlay = document.getElementById('welcome-overlay');
    const typingText = document.getElementById('typing-text');
    const enterBtn = document.getElementById('enter-vault');
    const message = "Status: Dil ka Connection Established 📶💖 | Coded by your Hubby Srikant Pandey👨‍💻 | Promise: Saat Janam tak No Bugs, Sirf Pyar! 💑✨";
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < message.length) {
            typingText.innerHTML += message.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 150);
        } else {
            // Show button after typing finishes
            setTimeout(() => {
                enterBtn.classList.add('visible');
            }, 500);
        }
    }

    // Start typing immediately
    typeWriter();

    enterBtn.addEventListener('click', () => {
        welcomeOverlay.classList.add('hidden');
        // Play sound if you added one (optional)
    });

    // EMBEDDED VAULT DATA (no server needed!)
    const vaultData = [
        {
            "id": 1,
            "day": "Rose Day",
            "date": "2026-02-07",
            "status": "locked",
            "icon": "🌹",
            "title": "A Single Rose",
            "body": "गुलाब दिया है आज एक निशानी,\nतुम हो मेरी हर सुबह, हर कहानी।\nरोज़ तुमसे प्रेम निभाता रहूँ,\nRose Day नहीं — जीवन भर की रवानी। 🌹👑😄",
            "quote": "Pyaar mein thoda paagalpan zaroori hai, aur tum meri favourite kind of crazy ho!",
            "link": "rose.html",
            "linkText": "Get Your Rose 🌹"
        },
        {
            "id": 2,
            "day": "Propose Day",
            "date": "2026-02-08",
            "status": "locked",
            "icon": "💍",
            "title": "A Question",
            "body": "Proposal toh ek bahana hai,\nAsli maqsad tumhe life-time pakana hai! 😄\nWill you be my designated driver,\nFor this crazy journey called life, forever? 💕",
            "quote": "Suno, market mein naya offer hai: Dil ke badle Dil free! Kabool hai? 💍😄",
            "link": "propose.html",
            "linkText": "Our Couple Rings 💍"
        },
        {
            "id": 3,
            "day": "Chocolate Day",
            "date": "2026-02-09",
            "status": "locked",
            "icon": "🍫",
            "title": "Sweetness & Light",
            "body": "Chocolate khatam ho jayegi,\nPar meri sweetness kabhi kam nahi aayegi! 🍫\nDairy Milk se zyada guilty pleasure ho tum,\nDiet crash karne ka reason ho tum! 😋",
            "quote": "Tum meri Five Star, mein tumhara Munch. Love you bunches and bunch! 🍬",
            "link": "chocolate.html",
            "linkText": "Sweet Chocolates 🍫"
        },
        {
            "id": 4,
            "day": "Teddy Day",
            "date": "2026-02-10",
            "status": "locked",
            "icon": "🧸",
            "title": "My Comfort",
            "body": "Teddy bear toh bas soft toy hai,\nAsli warmth toh tumhari hug mein hai! 🧸\nJab main na hoon, isse kaam chala lena,\nPar wapas aate hi, bas mujhe gale laga lena! 🤗",
            "quote": "Soft, cute aur cuddly? Sorry teddy, woh position already taken hai! 🐻",
            "link": "teddy.html",
            "linkText": "Your Teddy Bear 🧸"
        },
        {
            "id": 5,
            "day": "Promise Day",
            "date": "2026-02-11",
            "status": "locked",
            "icon": "🤞",
            "title": "My Vow",
            "body": "Saat janmo ka waada toh purana hai,\nHar roz tumhe coffee pilana hai! ☕\nGalti meri ho ya tumhari (mostly tumhari 😜),\nSorry pehle main hi bolunga, yeh jaana hai! 🤞",
            "quote": "Promise: Tumare saare tantrums uthaunga, aur badle mein bas thoda sa pyaar chahunga! (Okay, bahut saara!)",
            "link": "promise.html",
            "linkText": "Special Keychain 🔑"
        },
        {
            "id": 6,
            "day": "Hug Day",
            "date": "2026-02-12",
            "status": "locked",
            "icon": "🤗",
            "title": "Close to You",
            "body": "Jadoo ki jhappi ki hai sakht zaroorat,\nTumhare bina duniye lagti hai khubsurat... nahi, adhoori! 😅\nAa jao paas, mitado yeh doori,\nHug karna hai ab toh majboori! 🤗",
            "quote": "Doctor ne bola hai Vitamin 'U' ki kami hai. Ek tight hug de do, dose complete ho jayegi! 💊",
            "link": "hug.html",
            "linkText": "Perfect Gift 🎁"
        },
        {
            "id": 7,
            "day": "Kiss Day",
            "date": "2026-02-13",
            "status": "locked",
            "icon": "💋",
            "title": "Dinner Date",
            "body": "Hothon pe bas tera naam hai... (cheesy na? 🧀)\nChalo seedha point pe aate hain!\nDinner date is ready, mood is set,\nBest kiss ever? Wanna bet? 💋",
            "quote": "Kissing burns 6.4 calories a minute. Wanna workout? 😉😘",
            "link": "kiss.html",
            "linkText": "Our Dinner Reservation 🍽️"
        },
        {
            "id": 8,
            "day": "Maha Shivratri  × Valentine's Day  🕉️💖",
            "date": "2026-02-14",
            "status": "locked",
            "icon": "💘",
            "title": "The Truth Vault",
            "body": "चौदह फ़रवरी आई है,\nगुलाब भी है, शिवरात्रि भी आई है।\nमैं उलझन में था—पूजा करूँ या रोमांस,\nतभी वंदना बोली: ‘पहले चाय, फिर ट्रांस!’ 😄\n\nशिव जी से माँगी बुद्धि थोड़ी,\nकि पत्नी हँसे, न हो कोई अनबन जोड़ी।\nबोला—‘भोलेनाथ, बस इतना वर देना,\nValentine पर वंदना को हँसता देखना।’ 🙏\n\nव्रत भी रखा, दिल भी दिया,\nबिल्वपत्र के साथ गुलाब भी लिया।\nशिव-पार्वती जैसे अटूट हमारा साथ,\nहँसी, प्रेम और चाय—यही मेरी प्रार्थना हर रात।”",
            "quote": "Dil se nikli hai yeh baat, zubaan se nahi. Tumhare bina jeena? Na possible hai! जैसे शिव-पार्वती, हमारा प्रेम भी अमर! 💝🕉️",
            "link": "valentine.html",
            "linkText": "Trimbakeshwar Trip 🛕"
        }
    ];

    function loadVault() {
        // Check current date and unlock cards
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // strip time

        vaultData.forEach(card => {
            const [year, month, day] = card.date.split('-').map(Number);
            const cardDate = new Date(year, month - 1, day); // month is 0-indexed

            // If card date is today or earlier, unlock it
            if (cardDate <= today) {
                card.status = 'unlocked';
            } else {
                card.status = 'locked';
            }
        });

        renderCards(vaultData);
    }

    // Challenge Logic
    const challengeOverlay = document.getElementById('challenge-overlay');
    const questionEl = document.getElementById('challenge-question');
    const inputEl = document.getElementById('challenge-input');
    const submitBtn = document.getElementById('submit-challenge');
    const hintEl = document.getElementById('challenge-hint');
    const feedbackEl = document.getElementById('challenge-feedback');
    let currentLink = '';
    let currentAnswer = '';

    function showChallenge(challenge, link) {
        currentLink = link;
        currentAnswer = challenge.answer.toLowerCase();

        questionEl.textContent = challenge.question || "What is the magic word?";
        hintEl.textContent = "Need a hint?";
        hintEl.onclick = () => hintEl.textContent = challenge.hint || "It's all about love.";

        inputEl.value = '';
        feedbackEl.textContent = '';
        challengeOverlay.classList.remove('hidden');
        inputEl.focus();
    }

    submitBtn.addEventListener('click', validateChallenge);
    inputEl.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') validateChallenge();
    });

    function validateChallenge() {
        const userVal = inputEl.value.trim().toLowerCase();

        // Simple validation: check if user input includes the answer or is the answer
        // Making it lenient for better UX
        if (userVal.includes(currentAnswer) || (currentAnswer.includes(userVal) && userVal.length > 3)) {
            feedbackEl.textContent = "Correct! 💖 Opening Surprise...";
            feedbackEl.className = 'feedback-success';
            createHeartExplosion(window.innerWidth / 2, window.innerHeight / 2);

            setTimeout(() => {
                challengeOverlay.classList.add('hidden');
                window.open(currentLink, '_self');
            }, 1500);
        } else {
            feedbackEl.textContent = "Not quite. Try again! 💫";
            feedbackEl.className = 'feedback-error';
            challengeOverlay.animate([
                { transform: 'translateX(0)' },
                { transform: 'translateX(-10px)' },
                { transform: 'translateX(10px)' },
                { transform: 'translateX(0)' }
            ], { duration: 300 });
        }
    }

    // Close overlay if clicked outside
    challengeOverlay.addEventListener('click', (e) => {
        if (e.target === challengeOverlay) {
            challengeOverlay.classList.add('hidden');
        }
    });


    function renderCards(cards) {
        grid.innerHTML = '';
        cards.forEach((card, index) => {
            const cardEl = document.createElement('div');
            cardEl.className = `card ${card.status}`;

            if (card.day.includes("Valentine")) {
                cardEl.classList.add('valentine');
            }

            if (card.status === 'locked') {
                // Manual parsing to ensure consistent display regardless of client timezone
                const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                const [y, m, d] = card.date.split('-').map(Number);
                const dateText = `${months[m - 1]} ${d}`;

                cardEl.innerHTML = `
                    <div class="lock-icon">🔒</div>
                    <h2>${card.day}</h2>
                    <p>${card.body}</p>
                    <small style="color:#888; margin-top:1rem; display:block;">Unlocks on ${dateText}</small>
                `;
            } else {
                cardEl.innerHTML = `
                    <div class="card-icon">${card.icon || '❤️'}</div>
                    <h2>${card.title}</h2>
                    <p>${card.body}</p>
                    ${card.quote ? `<div class="quote">“${card.quote}”</div>` : ''}
                    ${card.link ? `<button class="gift-btn" data-link="${card.link}" data-challenge='${JSON.stringify(card.challenge || {})}'>${card.linkText || 'Open Surprise 🎁'}</button>` : ''}
                `;

                // Add click effect for unlocked cards (excluding the button)
                cardEl.addEventListener('click', (e) => {
                    if (!e.target.classList.contains('gift-btn')) {
                        createHeartExplosion(e.clientX, e.clientY);
                    }
                });

                // Attach button listener
                const btn = cardEl.querySelector('.gift-btn');
                if (btn) {
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation(); // Prevent card click
                        const link = btn.getAttribute('data-link');
                        // Navigate to internal surprise page
                        window.open(link, '_self');
                    });
                }
            }

            // Stagger animation
            cardEl.style.animationDelay = `${index * 0.15}s`;
            grid.appendChild(cardEl);
        });
    }

    function createHeartExplosion(x, y) {
        const heartCount = 15;
        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.classList.add('particle-heart');
            heart.innerText = '💗';
            document.body.appendChild(heart);

            const destinationX = (Math.random() - 0.5) * 200;
            const destinationY = (Math.random() - 0.5) * 200;
            const rotation = Math.random() * 360;

            heart.style.left = `${x}px`;
            heart.style.top = `${y}px`;

            const animation = heart.animate([
                { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
                { transform: `translate(${destinationX}px, ${destinationY}px) rotate(${rotation}deg)`, opacity: 0 }
            ], {
                duration: 1000 + Math.random() * 500,
                easing: 'cubic-bezier(0, .9, .57, 1)',
                fill: 'forwards'
            });

            animation.onfinish = () => heart.remove();
        }
    }

    loadVault();

    // Optional: Refresh periodically to auto-unlock at 12:00 AM if user is watching
    setInterval(loadVault, REFRESH_INTERVAL);
});
