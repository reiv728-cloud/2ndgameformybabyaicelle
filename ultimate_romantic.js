// ===== ULTIMATE ROMANTIC FEATURES =====

// Fortune Cookie Messages
const fortuneMessages = [
    "Somewhere between friendship and forever, we found each other. ♥",
    "You're the 'not yet' that I'm willing to wait for. ✦",
    "Labels don't define us. This feeling does. ♛",
    "In a world of maybe, you're my definitely. ❀",
    "We're not dating, but you're already my favorite person. ♥",
    "No title needed when the heart already knows. ☆",
    "You're my home, even without the label. ♡",
    "Unconditional doesn't need 'official'. ♥♥",
    "Some connections are too deep for words or titles. ✦",
    "You're my always, even in the 'not yet'. ♛"
];

// Promise Token Descriptions
const promiseDescriptions = {
    love: { icon: "♥♥♥", text: "I Promise to Love You - Always, unconditionally, forever" },
    wait: { icon: "♛", text: "I Promise to Wait - For the right time, with patience" },
    choose: { icon: "✦", text: "I Promise to Choose You - Every day, in every way" }
};

// Display Random Fortune Cookie
function showFortuneCookie() {
    const fortuneElement = document.getElementById('fortuneText');
    const randomFortune = fortuneMessages[Math.floor(Math.random() * fortuneMessages.length)];
    
    fortuneElement.textContent = randomFortune;
    fortuneElement.style.animation = 'fadeInUp 2s ease';
}

// Display Promise Tokens
function displayPromiseTokens() {
    if (promiseTokens.length === 0) return;
    
    const promiseContainer = document.getElementById('promiseTokens');
    const tokenList = document.getElementById('tokenList');
    tokenList.innerHTML = '';
    
    promiseTokens.forEach(token => {
        const tokenData = promiseDescriptions[token];
        if (tokenData) {
            const tokenDiv = document.createElement('div');
            tokenDiv.className = 'promise-token-item';
            tokenDiv.innerHTML = `
                <div class="token-icon">${tokenData.icon}</div>
                <div class="token-text">${tokenData.text}</div>
            `;
            tokenList.appendChild(tokenDiv);
        }
    });
    
    promiseContainer.style.display = 'block';
    setTimeout(() => promiseContainer.style.animation = 'fadeInUp 1s ease', 500);
}

// Display Memories Counter
function displayMemoriesCounter() {
    const memoriesContainer = document.getElementById('memoriesCounter');
    const memoryStats = document.getElementById('memoryStats');
    
    // Calculate memories based on game progress
    memoriesCount.nightsTalked = Math.floor(currentScene / 3);
    memoriesCount.laughsMade = romanticChoicesCount * 2;
    memoriesCount.momentsShared = currentScene;
    memoriesCount.dreamsAboutThem = Math.floor(romanticChoicesCount / 2);
    
    memoryStats.innerHTML = `
        <div class="memory-stat">
            <div class="stat-icon">☽</div>
            <div class="stat-text">${memoriesCount.nightsTalked} late night conversations</div>
        </div>
        <div class="memory-stat">
            <div class="stat-icon">☺</div>
            <div class="stat-text">${memoriesCount.laughsMade} times you made me smile</div>
        </div>
        <div class="memory-stat">
            <div class="stat-icon">♥</div>
            <div class="stat-text">${memoriesCount.momentsShared} precious moments together</div>
        </div>
        <div class="memory-stat">
            <div class="stat-icon">★</div>
            <div class="stat-text">${memoriesCount.dreamsAboutThem} dreams where you appeared</div>
        </div>
    `;
    
    memoriesContainer.style.display = 'block';
    setTimeout(() => memoriesContainer.style.animation = 'fadeInUp 1s ease 0.5s backwards', 500);
}

// Display Secret Love Letter (Perfect Ending Only)
function displaySecretLetter() {
    if (romanticChoicesCount < 20) return; // Only for perfect ending
    
    const letterContainer = document.getElementById('secretLetter');
    const letterContent = document.getElementById('letterContent');
    
    letterContent.innerHTML = `
        <p class="letter-para">Hindi ko pa nasasabi ng direkta, pero alam mo ba?</p>
        <p class="letter-para">Every moment with you feels like coming home.</p>
        <br>
        <p class="letter-para">Hindi kita boyfriend. Hindi pa tayo 'official.'</p>
        <p class="letter-para">Pero ikaw na yung feeling ko eh. Ikaw na yung tao ko.</p>
        <br>
        <p class="letter-para">Salamat sa lahat ng late night talks.</p>
        <p class="letter-para">Salamat sa lahat ng tawanan.</p>
        <p class="letter-para">Salamat kasi kahit hindi mo alam, nagiging okay na araw ko</p>
        <p class="letter-para">kapag nakita lang kitang ngumiti.</p>
        <br>
        <p class="letter-para">Sana alam mo... mahal na mahal kita.</p>
        <p class="letter-para">Hindi dahil obligado ako.</p>
        <p class="letter-para">Kundi dahil ikaw yung tao na gusto kong piliin,</p>
        <p class="letter-para">araw-araw, kahit wala pang label.</p>
        <br>
        <p class="letter-para">This game? Para sa'yo lang to.</p>
        <p class="letter-para">Kasi deserve mo malaman kung gaano ka ka-special.</p>
        <br>
        <p class="letter-signature">- Yours, always ♥♥♥</p>
    `;
    
    letterContainer.style.display = 'block';
    
    // Show secret button to reveal letter
    const secretBtn = document.getElementById('secretBtn');
    secretBtn.style.display = 'inline-block';
    secretBtn.onclick = () => {
        letterContainer.scrollIntoView({ behavior: 'smooth' });
        letterContainer.style.animation = 'heartReveal 2s ease';
    };
}

// Display Ultimate Message (Hidden Easter Egg - Click Badge 3 times)
function setupUltimateMessage() {
    const badge = document.getElementById('endingBadge');
    let clickCount = 0;
    
    badge.addEventListener('click', () => {
        clickCount++;
        
        if (clickCount === 3) {
            const ultimateMessage = document.getElementById('ultimateMessage');
            const ultimateContent = document.getElementById('ultimateContent');
            
            ultimateContent.innerHTML = `
                <h2 class="ultimate-title">Baby...</h2>
                <br>
                <p class="ultimate-para">Remember this:</p>
                <br>
                <p class="ultimate-para">Even without the title,</p>
                <p class="ultimate-para">Even without 'official',</p>
                <p class="ultimate-para">Even with all the uncertainty...</p>
                <br>
                <p class="ultimate-highlight">Mahal kita. Unconditionally.</p>
                <br>
                <p class="ultimate-para">And when the time is right,</p>
                <p class="ultimate-para">When we're both ready,</p>
                <p class="ultimate-para">I'll still choose you.</p>
                <br>
                <p class="ultimate-para">For now, let this game be proof:</p>
                <p class="ultimate-para">Na mahal na mahal kita,</p>
                <p class="ultimate-para">Kahit hindi pa natin masabi sa mundo.</p>
                <br>
                <p class="ultimate-highlight">This is our truth.</p>
                <p class="ultimate-highlight">This is our love.</p>
                <br>
                <p class="ultimate-para">Thank you for existing, Baby.</p>
                <br>
                <p class="ultimate-signature">- Yours, forever and always ♥♥♥</p>
            `;
            
            ultimateMessage.style.display = 'block';
            ultimateMessage.style.animation = 'ultimateReveal 3s ease';
            
            // Add heart burst effect
            createMassiveHeartBurst();
            
            // Play heartbeat sound if available
            const heartbeatSound = document.getElementById('sfxHeartbeat');
            if (heartbeatSound) heartbeatSound.play();
        }
    });
}

// Massive Heart Burst Effect
function createMassiveHeartBurst() {
    const hearts = ['♥', '♡', '♥♥', '❤', '♥♥♥', '♛'];
    const container = document.body;
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart-burst massive';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = Math.random() * 100 + '%';
            heart.style.fontSize = (Math.random() * 40 + 20) + 'px';
            heart.style.animation = 'heartFloat 3s ease-out';
            
            container.appendChild(heart);
            
            setTimeout(() => heart.remove(), 3000);
        }, i * 50);
    }
}

// Animated Heart Reveal (for perfect ending)
function createAnimatedHeartReveal() {
    const container = document.createElement('div');
    container.className = 'heart-reveal-animation';
    container.innerHTML = '<div class="forming-heart">♥</div>';
    
    document.body.appendChild(container);
    
    setTimeout(() => {
        container.querySelector('.forming-heart').style.animation = 'heartForm 3s ease';
    }, 100);
    
    setTimeout(() => container.remove(), 4000);
}

// Constellation Mini-game (Scene 21)
function createConstellationMinigame() {
    const container = document.getElementById('minigameContainer');
    if (!container) return; // Add safety check
    container.innerHTML = '<div class="constellation-instruction">Connect the stars to form our constellation ★</div>';
    
    // Create stars that form "I ♥ U"
    const stars = [];
    for (let i = 0; i < 12; i++) {
        const star = document.createElement('div');
        star.className = 'constellation-star';
        star.textContent = '★';
        star.style.left = (Math.random() * 80 + 10) + '%';
        star.style.top = (Math.random() * 80 + 10) + '%';
        container.appendChild(star);
        stars.push(star);
    }
    
    // Animate stars to form heart shape
    setTimeout(() => {
        stars.forEach((star, index) => {
            star.style.transition = 'all 2s ease';
            const angle = (Math.PI * 2 * index) / stars.length;
            const radius = 30;
            star.style.left = (50 + Math.cos(angle) * radius) + '%';
            star.style.top = (50 + Math.sin(angle) * radius) + '%';
        });
    }, 1000);
    
    setTimeout(() => {
        const message = document.createElement('div');
        message.className = 'constellation-message';
        message.textContent = 'Among millions of stars, you are my brightest ♥';
        container.appendChild(message);
    }, 3500);
}

// Initialize all ultimate features on ending screen
function initializeUltimateFeatures() {
    showFortuneCookie();
    displayPromiseTokens();
    displayMemoriesCounter();
    displaySecretLetter();
    setupUltimateMessage();
    
    if (romanticChoicesCount === 21) {
        createAnimatedHeartReveal();
    }
}
