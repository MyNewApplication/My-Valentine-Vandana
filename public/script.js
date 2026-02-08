document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('vault-grid');
    const REFRESH_INTERVAL = 60000; // Check every minute (optional) or just on load

    // Get Secret Key from URL
    const urlParams = new URLSearchParams(window.location.search);
    const key = urlParams.get('key');

    if (!key) {
        document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;color:#444;">Access Denied</div>';
        return;
    }

    // Typing Effect Logic
    const welcomeOverlay = document.getElementById('welcome-overlay');
    const typingText = document.getElementById('typing-text');
    const enterBtn = document.getElementById('enter-vault');
    const message = "Coded with ❤️ by your Developer Husband...Srikant Pandey---Because flowers wilt, but Git commits are forever! 😄💻";
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

    async function loadVault() {
        try {
            const response = await fetch(`/api/vault?key=${key}`);
            if (!response.ok) {
                throw new Error('Vault Locked');
            }
            const data = await response.json();
            renderCards(data.cards);
        } catch (error) {
            console.error(error);
            grid.innerHTML = '<div class="error">The vault remains sealed.</div>';
        }
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
                window.open(currentLink, '_blank');
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

            if (card.day === "Valentine's Day") {
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
                        window.open(link, '_blank');
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
