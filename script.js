// ===== GAME STATE =====
let currentScene = 0;
let romanticChoicesCount = 0;
let totalChoices = 0;
let achievements = [];
let isMusicPlaying = true;
let gameData = { scenes: [], currentSceneData: null };
let promiseTokens = [];
let memoriesCount = {
    nightsTalked: 0,
    laughsMade: 0,
    momentsShared: 0,
    dreamsAboutThem: 0
};
let gameStartDate = new Date();

// ===== ACHIEVEMENTS =====
const achievementsList = [
    { id: 'first_choice', name: 'First Step', icon: '►', desc: 'Made your first choice', unlocked: false },
    { id: 'romantic_5', name: 'Sweet Heart', icon: '♡', desc: '5 romantic choices', unlocked: false },
    { id: 'romantic_10', name: 'True Love', icon: '♥', desc: '10 romantic choices', unlocked: false },
    { id: 'romantic_15', name: 'Soulmate', icon: '♥♥', desc: '15 romantic choices', unlocked: false },
    { id: 'halfway', name: 'Journey Together', icon: '★', desc: 'Reached scene 10', unlocked: false },
    { id: 'complete', name: 'Forever Story', icon: '◆', desc: 'Completed all scenes', unlocked: false },
    { id: 'perfect', name: 'Perfect Love', icon: '♛', desc: 'All romantic choices', unlocked: false },
    { id: 'minigame_master', name: 'Playful Love', icon: '◘', desc: 'Played 10 mini-games', unlocked: false }
];

let minigamesPlayed = 0;

// ===== SCENE DATA =====
const scenes = [
    { number: 1, title: "The Rainy Night ⛆", text: "Umuulan sa labas, Baby, pero safe ako kasi nandito ka.", background: "linear-gradient(135deg, #1a2a3a 0%, #2d4059 100%)", choices: [{ text: "Being with you makes everything better, Baby. ♥", romantic: true }, { text: "I love these quiet moments with you, Baby. ❀", romantic: false }, { text: "Sana lagi na lang ganito tayo, Baby. ♡", romantic: true }], minigame: "rain", ambientSound: "rain" },
    { number: 2, title: "The Quiet Moment ☽", text: "Hindi kailangan ng salita, Baby, naiintindihan na natin ang isa't isa.", background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)", choices: [{ text: "Your presence is enough for me, Baby. ♥♥", romantic: true }, { text: "I feel so comfortable around you, Baby. ★", romantic: false }, { text: "Don't go anywhere, stay here with me, Baby. ♡", romantic: true }], minigame: "candle", effect: "heartbeat" },
    { number: 3, title: "The Late Night Chat ☺", text: "Puyat na tayo pero ayaw ko pa ring matapos to, Baby.", background: "linear-gradient(135deg, #141e30 0%, #243b55 100%)", choices: [{ text: "I cherish every conversation with you, Baby. ♥", romantic: true }, { text: "You're the best part of my day, Baby. ❀", romantic: false }, { text: "Kahit anong oras, gusto ko kasama ka, Baby. ☺", romantic: true }], minigame: "chat", effect: "phoneGlow" },
    { number: 4, title: "The Moment I Knew ◆", text: "Bigla kong narealize, Baby… ikaw pala yung hinahanap ko all this time.", background: "linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)", choices: [{ text: "Everything makes sense when I'm with you, Baby. ♥♥", romantic: true }, { text: "I want to know every part of you, Baby. ♥", romantic: false }, { text: "You're irreplaceable to me, Baby. ✦", romantic: true }], minigame: "cake", effect: "confetti" },
    { number: 5, title: "Understanding Each Other ♡", text: "May misunderstanding tayo, Baby, pero mas mahalaga ka sa akin kaysa sa pride ko.", background: "linear-gradient(135deg, #2c1810 0%, #4a2a1f 100%)", choices: [{ text: "I never want to hurt you, Baby. ♥", romantic: true }, { text: "Let's work through this together, Baby. ❀", romantic: false }, { text: "You're too important to me, Baby. ♥♥", romantic: true }], minigame: "hearts", effect: "redGlow" },
    { number: 6, title: "Little Gestures ☐", text: "May dala akong something para sa'yo, Baby. Simple lang pero alam ko gusto mo.", background: "linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)", choices: [{ text: "You always think of me, Baby. ♥", romantic: true }, { text: "These little things mean so much, Baby. ❀", romantic: false }, { text: "You make me feel so special, Baby. ♡", romantic: true }], minigame: "gift", effect: "sparkles" },
    { number: 7, title: "Unspoken Promise ○", text: "Hindi pa natin sinasabi, Baby, pero alam ko pareho tayo ng nararamdaman.", background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", choices: [{ text: "I'll be here for you, always, Baby. ♥♥", romantic: true }, { text: "You mean everything to me, Baby. ♥", romantic: false }, { text: "Whatever happens, I choose you, Baby. ★", romantic: true }], minigame: "none", effect: "goldenSparkle" },
    { number: 8, title: "Morning Coffee Together ☕", text: "Umaga pa lang, Baby, pero ikaw na agad nasa isip ko.", background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)", choices: [{ text: "You make my mornings perfect, Baby. ♥", romantic: true }, { text: "I love starting my day with you, Baby. ❀", romantic: false }, { text: "Sana every morning kasama kita, Baby. ♡", romantic: true }], minigame: "coffee", effect: "steam" },
    { number: 9, title: "Walking Together ♣", text: "Walang destination, Baby, basta kasama kita okay na ako.", background: "linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)", choices: [{ text: "Being with you is what matters, Baby. ♥♥", romantic: true }, { text: "I'm happy wherever we go, Baby. ❦", romantic: false }, { text: "This moment is perfect, Baby. ❧", romantic: true }], minigame: "leaves", effect: "leafFall" },
    { number: 10, title: "Golden Hour ☀", text: "Ang ganda ng sunset, Baby, pero ikaw pa rin pinaka-maganda sa paningin ko.", background: "linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)", choices: [{ text: "I want more moments like this with you, Baby. ◆", romantic: true }, { text: "Time stops when I'm with you, Baby. ≈", romantic: false }, { text: "Sana forever na tayong ganito, Baby. ✦", romantic: true }], minigame: "waves", effect: "waterSparkle" },
    { number: 11, title: "Cooking Together ◖", text: "Sabay tayong nagluto, Baby, mas masaya pala lahat kapag kasama kita.", background: "linear-gradient(135deg, #fc4a1a 0%, #f7b733 100%)", choices: [{ text: "Everything's better with you, Baby. ♥", romantic: true }, { text: "I love how natural this feels, Baby. ♡", romantic: false }, { text: "Let's do this more often, Baby. ☺", romantic: true }], minigame: "ingredients", effect: "flourParticles" },
    { number: 12, title: "Cozy Night In ■", text: "Simpleng movie night lang, Baby, pero parang ang saya ko.", background: "linear-gradient(135deg, #434343 0%, #000000 100%)", choices: [{ text: "I'm so comfortable with you, Baby. ♥♥", romantic: true }, { text: "You're my favorite person, Baby. ★", romantic: false }, { text: "Sana walang matapos na to, Baby. ♡", romantic: true }], minigame: "popcorn", effect: "movieGlow" },
    { number: 13, title: "Under the Stars ✦", text: "Nakatingin tayo sa taas, Baby, pero ang totoo, ikaw lang nakikita ko.", background: "linear-gradient(135deg, #000428 0%, #004e92 100%)", choices: [{ text: "I see my future when I look at you, Baby. ★", romantic: true }, { text: "You're my brightest star, Baby. ✦", romantic: false }, { text: "Let's wish for this to last, Baby. ☆", romantic: true }], minigame: "stars", effect: "starTwinkle" },
    { number: 14, title: "Rain and Thoughts ☂", text: "Umuulan pero okay lang, Baby, kasi safe ako sayo.", background: "linear-gradient(135deg, #2c3e50 0%, #3498db 100%)", choices: [{ text: "You're my peace, Baby. ☔", romantic: true }, { text: "I feel safe with you, Baby. ♥", romantic: false }, { text: "Life with you just makes sense, Baby. ☽", romantic: true }], minigame: "raindrops", effect: "windowRain" },
    { number: 15, title: "Surprise Picnic ⌘", text: "Nag-prepare ako ng picnic, Baby, kasi alam kong pagod ka lately.", background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)", choices: [{ text: "You always know what I need, Baby. ◆", romantic: true }, { text: "This means so much to me, Baby. ❀", romantic: false }, { text: "I'm so lucky to have you, Baby. ♥♥", romantic: true }], minigame: "picnic", effect: "petalFall" },
    { number: 16, title: "Karaoke Night ♫", text: "Kinakanta natin ang favorite song, Baby, tawa lang nang tawa tayo.", background: "linear-gradient(135deg, #e100ff 0%, #7f00ff 100%)", choices: [{ text: "Your laugh is my favorite sound, Baby. ♪", romantic: true }, { text: "I love these fun moments with you, Baby. ♥", romantic: false }, { text: "This is our song now, Baby. ♬", romantic: true }], minigame: "notes", effect: "musicNotes" },
    { number: 17, title: "That Special Smile □", text: "Nakita ko yung ngiti mo, Baby… parang tumigil yung mundo ko for a moment.", background: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)", choices: [{ text: "Your smile is everything to me, Baby. ☂", romantic: true }, { text: "You light up my whole world, Baby. ♥♥", romantic: false }, { text: "I hope I'm the reason for that smile, Baby. ♥", romantic: true }], minigame: "windshield", effect: "carRain" },
    { number: 18, title: "By the Seashore ☀", text: "Sa beach tayo, Baby, ramdam ko yung hangin at yung init mo beside me.", background: "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)", choices: [{ text: "You're my warmest memory, Baby. ☀", romantic: true }, { text: "Perfect moments are with you, Baby. ♥", romantic: false }, { text: "Sana we can do this more, Baby. ≈", romantic: true }], minigame: "shells", effect: "beachSparkle" },
    { number: 19, title: "Garden Stroll ⚘", text: "Naglalakad tayo sa garden, Baby, ang peaceful ng feeling ko.", background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)", choices: [{ text: "You're more beautiful than any flower, Baby. ✿", romantic: true }, { text: "Everything reminds me of you, Baby. ♥", romantic: false }, { text: "This place feels special with you here, Baby. ✦", romantic: true }], minigame: "flowers", effect: "butterflies" },
    { number: 20, title: "Special Dinner ⊙", text: "Simple lang pero special, Baby, kasi kasama kita tonight.", background: "linear-gradient(135deg, #2c0703 0%, #5a1a0f 100%)", choices: [{ text: "You make everything feel magical, Baby. ♥♥", romantic: true }, { text: "This night is perfect because of you, Baby. ★", romantic: false }, { text: "I don't want this moment to end, Baby. ♥", romantic: true }], minigame: "candles", effect: "candleGlow" },
    { number: 21, title: "Unspoken Truth ♛", text: "Para sa'yo, Baby... May gusto akong sabihin.", background: "linear-gradient(135deg, #FF6B9D 0%, #C06C84 50%, #6C5B7B 100%)", choices: [{ text: "Mahal na mahal kita, Baby. I mean it. ♥♥♥", romantic: true, promiseToken: "love" }, { text: "You're my person, kahit walang label pa. ♛", romantic: true, promiseToken: "wait" }, { text: "Thank you for existing in my life, Baby. ✦", romantic: true, promiseToken: "choose" }], minigame: "constellation", effect: "heartReveal", isSecret: true }
];

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
    setupCursorEffects();
    createFloatingParticles();
    setupEventListeners();
});

function initializeGame() {
    gameData.scenes = scenes;
    showScreen('startScreen');
}

function setupEventListeners() {
    document.getElementById('startBtn').addEventListener('click', startGame);
    document.getElementById('replayBtn').addEventListener('click', replayGame);
    
    // Music controls
    document.getElementById('musicToggle').addEventListener('click', toggleMusic);
    document.getElementById('volumeSlider').addEventListener('input', (e) => {
        const bgMusic = document.getElementById('bgMusic');
        bgMusic.volume = e.target.value / 100;
    });
}

function startGame() {
    showScreen('gameScreen');
    currentScene = 0;
    romanticChoicesCount = 0;
    totalChoices = 0;
    minigamesPlayed = 0;
    achievementsList.forEach(a => a.unlocked = false);
    playBackgroundMusic();
    loadScene(currentScene);
}

function replayGame() {
    currentScene = 0;
    romanticChoicesCount = 0;
    showScreen('gameScreen');
    loadScene(currentScene);
}

function loadScene(sceneIndex) {
    if (sceneIndex >= scenes.length) {
        showEnding();
        return;
    }
    const scene = scenes[sceneIndex];
    gameData.currentSceneData = scene;
    document.getElementById('sceneNumber').textContent = `Scene ${scene.number}`;
    document.getElementById('sceneTitle').textContent = scene.title;
    document.getElementById('sceneText').textContent = scene.text;
    document.getElementById('sceneBackground').style.background = scene.background;
    const progress = ((sceneIndex + 1) / scenes.length) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
    loadChoices(scene.choices);
    applySceneEffect(scene.effect);
    if (scene.minigame && scene.minigame !== 'none') {
        setupMinigame(scene.minigame);
    }
}

function loadChoices(choices) {
    const container = document.getElementById('choicesContainer');
    container.innerHTML = '';
    choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'choice-btn';
        button.textContent = choice.text;
        button.addEventListener('click', (e) => handleChoice(choice, e));
        container.appendChild(button);
    });
}

function handleChoice(choice, event) {
    if (choice.romantic) romanticChoicesCount++;
    totalChoices++;
    
    // Collect promise token if available
    if (choice.promiseToken && !promiseTokens.includes(choice.promiseToken)) {
        promiseTokens.push(choice.promiseToken);
    }
    
    // Visual feedback
    createHeartBurst(event);
    createParticleBurst(event);
    event.target.classList.add('selected');
    playSound('chime');
    if (navigator.vibrate) navigator.vibrate(200);
    
    // Check achievements
    checkAchievements();
    
    // Proceed to next scene or ending
    setTimeout(() => { 
        currentScene++; 
        
        // Check if Scene 21 should be unlocked (after Scene 20 with perfect score)
        if (currentScene === 21 && romanticChoicesCount >= 18) {
            loadScene(21); // Load secret Scene 21
        } else if (currentScene >= scenes.length || (currentScene === 21 && romanticChoicesCount < 18)) {
            showEnding();
        } else {
            loadScene(currentScene);
        }
    }, 1500);
}

function showEnding() {
    showScreen('endingScreen');
    document.getElementById('loveMeter').classList.remove('visible');
    checkAchievements(); // Final check
    
    const endingTitle = document.getElementById('endingTitle');
    const endingBadge = document.getElementById('endingBadge');
    const endingText = document.getElementById('endingText');
    const endingMsg1 = document.getElementById('endingMessage1');
    const endingMsg2 = document.getElementById('endingMessage2');
    
    // Multiple ending variations
    if (romanticChoicesCount >= 21) {
        // ULTIMATE Perfect Ending (with Scene 21)
        endingTitle.textContent = 'Unconditional Love ♛♥♛';
        endingBadge.textContent = '♛ ♥♥♥ ♛';
        endingText.innerHTML = '<p>♥♥♥ Every single choice. Every single moment. Pure unconditional love.</p><p>Hindi pa tayo officially together, pero Baby...</p><p>Ikaw na yung feeling ko. Ikaw na yung forever ko.</p>';
        endingMsg1.textContent = 'You unlocked the secret of our hearts, Baby.';
        endingMsg2.textContent = 'Mahal na mahal kita. Walang kondisyon. Walang label. Just love.';
    } else if (romanticChoicesCount === 20) {
        // Perfect Ending
        endingTitle.textContent = 'Perfect Love Story ♛';
        endingBadge.textContent = '♛ ♥ ♛';
        endingText.innerHTML = '<p>♥ Every single choice was filled with pure love, Baby.</p><p>Our hearts beat as one, perfectly in sync.</p><p>This is the fairy tale that never ends.</p>';
        endingMsg1.textContent = 'You chose love at every single moment, Baby.';
        endingMsg2.textContent = 'Our love is absolutely perfect, forever and always.';
    } else if (romanticChoicesCount >= 17) {
        // True Love Ending
        endingTitle.textContent = 'True Love Forever ♥♥';
        endingBadge.textContent = '♥♥';
        endingText.innerHTML = '<p>♥ You chose love almost every time, Baby.</p><p>Our story is written in the stars, Baby.</p><p>Every heartbeat, every breath, forever yours.</p>';
        endingMsg1.textContent = 'You chose love in nearly every moment, Baby.';
        endingMsg2.textContent = 'This is just the beginning of our forever.';
    } else if (romanticChoicesCount >= 13) {
        // Sweet Love Ending
        endingTitle.textContent = 'Sweet Love Story ♡';
        endingBadge.textContent = '♡';
        endingText.innerHTML = '<p>♡ Our journey has been beautifully romantic, Baby.</p><p>Each choice brought us closer, Baby.</p><p>Together, we create magic.</p>';
        endingMsg1.textContent = 'Your heart led the way, Baby.';
        endingMsg2.textContent = 'Our story continues to grow more beautiful.';
    } else {
        // Beautiful Journey Ending
        endingTitle.textContent = 'Our Beautiful Journey ❀';
        endingBadge.textContent = '❀';
        endingText.innerHTML = '<p>❀ Our journey has been beautiful, Baby.</p><p>Each moment with you, a treasure, Baby.</p><p>Love grows in many ways.</p>';
        endingMsg1.textContent = 'Every moment was special, Baby.';
        endingMsg2.textContent = 'This is just the beginning of forever.';
    }
    
    // Display achievements
    displayAchievements();
    createMassiveConfetti();
    
    // Initialize Ultimate Romantic Features
    setTimeout(() => {
        if (typeof initializeUltimateFeatures === 'function') {
            initializeUltimateFeatures();
        }
    }, 1000);
}

// ===== SCREEN MANAGEMENT =====
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

// ===== MINI-GAMES =====
function setupMinigame(type) {
    const container = document.getElementById('minigameContainer');
    container.innerHTML = '';
    container.classList.add('active');
    const instruction = document.createElement('div');
    instruction.className = 'minigame-instruction';
    container.appendChild(instruction);
    
    // Track minigame for achievements
    minigamesPlayed++;
    checkAchievements();
    
    switch(type) {
        case 'rain': instruction.textContent = '💧 Tap the raindrops!'; createElementMinigame(container, ['💧', '💦', '☔'], 8); break;
        case 'candle': instruction.textContent = '🕯️ Click the candle!'; createSingleElement(container, '🕯️', 'candle-flicker'); break;
        case 'chat': instruction.textContent = '💬 Tap the chat bubbles!'; createElementMinigame(container, ['💬', '😊', '😏', '💕', '✨'], 6); break;
        case 'cake': instruction.textContent = '🎂 Click the cake!'; createSingleElement(container, '🎂'); break;
        case 'hearts': instruction.textContent = '💖 Tap the hearts!'; createElementMinigame(container, ['💖', '💕', '💗', '💞'], 5); break;
        case 'gift': instruction.textContent = '🎁 Tap the gift!'; createSingleElement(container, '🎁'); break;
        case 'coffee': instruction.textContent = '☕ Tap the steam!'; createSteamMinigame(container); break;
        case 'leaves': instruction.textContent = '🍃 Tap the leaves!'; createElementMinigame(container, ['🍂', '🍃', '🌿'], 10); break;
        case 'waves': instruction.textContent = '🌊 Tap the waves!'; createElementMinigame(container, ['🌊', '🌀', '💧'], 6); break;
        case 'ingredients': instruction.textContent = '🥘 Tap ingredients!'; createRowElements(container, ['🥕', '🍅', '🧄', '🧅', '🥔']); break;
        case 'popcorn': instruction.textContent = '🍿 Tap popcorn!'; createElementMinigame(container, ['🍿'], 8); break;
        case 'stars': instruction.textContent = '⭐ Tap the stars!'; createElementMinigame(container, ['⭐', '✨', '🌟'], 10); break;
        case 'raindrops': instruction.textContent = '💧 Swipe raindrops!'; createElementMinigame(container, ['💧', '💦'], 8); break;
        case 'picnic': instruction.textContent = '🧺 Tap items!'; createElementMinigame(container, ['🍎', '🍇', '🌻', '🧺'], 6); break;
        case 'notes': instruction.textContent = '🎵 Tap notes!'; createElementMinigame(container, ['🎵', '🎶', '🎼'], 8); break;
        case 'windshield': instruction.textContent = '🚗 Tap windshield!'; createElementMinigame(container, ['💧', '💦'], 10); break;
        case 'shells': instruction.textContent = '🐚 Tap shells!'; createElementMinigame(container, ['🐚', '🌊', '⭐'], 8); break;
        case 'flowers': instruction.textContent = '🌷 Tap flowers!'; createElementMinigame(container, ['🌷', '🌹', '🌺', '🌸'], 8); break;
        case 'candles': instruction.textContent = '🕯️ Tap candles!'; createRowElements(container, ['🕯️', '🕯️', '🕯️', '🕯️']); break;
        case 'constellation': 
            if (typeof createConstellationMinigame === 'function') {
                createConstellationMinigame();
            } else {
                instruction.textContent = '★ Make a wish on the stars ★'; 
                createElementMinigame(container, ['★', '✦', '☆', '✧'], 12);
            }
            break;
    }
}

function createElementMinigame(container, emojis, count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const elem = document.createElement('div');
            elem.className = 'minigame-element';
            elem.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            elem.style.left = Math.random() * 80 + 10 + '%';
            elem.style.top = Math.random() * 150 + 'px';
            elem.style.fontSize = Math.random() * 20 + 25 + 'px';
            elem.addEventListener('click', () => {
                playSound('giggle');
                createSparkles(elem.getBoundingClientRect().left, elem.getBoundingClientRect().top);
                elem.remove();
            });
            container.appendChild(elem);
        }, i * 300);
    }
}

function createSingleElement(container, emoji, animClass) {
    const elem = document.createElement('div');
    elem.className = 'minigame-element';
    elem.textContent = emoji;
    elem.style.fontSize = '80px';
    elem.style.left = '50%';
    elem.style.top = '50px';
    elem.style.transform = 'translateX(-50%)';
    elem.addEventListener('click', () => {
        if (animClass) elem.classList.add(animClass);
        createConfetti();
        playSound('chime');
        if (emoji === '🎂') elem.textContent = '🎆';
        if (emoji === '🎁') elem.textContent = '✨🎉✨';
    });
    container.appendChild(elem);
}

function createRowElements(container, emojis) {
    emojis.forEach((emoji, i) => {
        const elem = document.createElement('div');
        elem.className = 'minigame-element';
        elem.textContent = emoji;
        elem.style.left = (i * (80 / emojis.length) + 10) + '%';
        elem.style.top = '50px';
        elem.style.fontSize = '50px';
        elem.addEventListener('click', () => {
            elem.style.transform = 'scale(0)';
            createSparkles(elem.getBoundingClientRect().left, elem.getBoundingClientRect().top);
            playSound('giggle');
        });
        container.appendChild(elem);
    });
}

function createSteamMinigame(container) {
    const coffee = document.createElement('div');
    coffee.className = 'minigame-element';
    coffee.textContent = '☕';
    coffee.style.fontSize = '80px';
    coffee.style.left = '50%';
    coffee.style.top = '50px';
    coffee.style.transform = 'translateX(-50%)';
    
    const steamInterval = setInterval(() => {
        const steam = document.createElement('div');
        steam.textContent = '💨';
        steam.style.position = 'absolute';
        steam.style.left = '50%';
        steam.style.top = '10px';
        steam.style.fontSize = '20px';
        steam.style.animation = 'float 2s ease-out forwards';
        steam.addEventListener('click', () => {
            createHeartBurst({ clientX: steam.getBoundingClientRect().left + 10, clientY: steam.getBoundingClientRect().top });
            steam.remove();
        });
        coffee.appendChild(steam);
        setTimeout(() => steam.remove(), 2000);
    }, 1000);
    
    container.appendChild(coffee);
}

// ===== ENHANCED VISUAL EFFECTS =====
function createHeartBurst(event) {
    const hearts = ['♥', '♡', '♥♥', '❤', '♥', '♡'];
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart-burst';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = event.clientX + 'px';
            heart.style.top = event.clientY + 'px';
            const angle = (Math.PI * 2 * i) / 12;
            const distance = 100 + Math.random() * 50;
            heart.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
            heart.style.setProperty('--ty', Math.sin(angle) * distance + 'px');
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 1000);
        }, i * 50);
    }
}

function createConfetti() {
    const colors = ['#ffd700', '#ff69b4', '#ff1493', '#ffa500', '#ff6347'];
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '0';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 2000);
        }, i * 20);
    }
}

function createMassiveConfetti() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => createConfetti(), i * 500);
    }
}

function createSparkles(x, y) {
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.fontSize = '20px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.animation = 'float 1s ease-out forwards';
        sparkle.style.zIndex = '9999';
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
    }
}

function applySceneEffect(effect) {
    // Clear previous effects
    document.querySelectorAll('.scene-effect').forEach(e => e.remove());
    
    if (!effect) return;
    
    switch(effect) {
        case 'heartbeat': playSound('heartbeat'); break;
        case 'confetti': setTimeout(() => createConfetti(), 500); break;
        case 'goldenSparkle': createGoldenSparkles(); break;
        case 'starTwinkle': createStarField(); break;
    }
}

function createGoldenSparkles() {
    const container = document.createElement('div');
    container.className = 'scene-effect';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '10';
    
    setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.textContent = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.fontSize = '30px';
        sparkle.style.animation = 'float 3s ease-out forwards';
        container.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 3000);
    }, 300);
    
    document.body.appendChild(container);
}

function createStarField() {
    const container = document.createElement('div');
    container.className = 'scene-effect';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '10';
    
    for (let i = 0; i < 30; i++) {
        const star = document.createElement('div');
        star.textContent = '⭐';
        star.className = 'star-twinkle';
        star.style.position = 'absolute';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.fontSize = Math.random() * 15 + 10 + 'px';
        star.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(star);
    }
    
    document.body.appendChild(container);
}

// ===== CURSOR SPARKLE EFFECT =====
function setupCursorEffects() {
    const canvas = document.getElementById('sparkleCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particles = [];
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    document.addEventListener('mousemove', (e) => {
        for (let i = 0; i < 3; i++) {
            particles.push({
                x: e.clientX,
                y: e.clientY,
                size: Math.random() * 5 + 2,
                speedX: (Math.random() - 0.5) * 2,
                speedY: (Math.random() - 0.5) * 2,
                life: 1
            });
        }
    });
    
    function animateSparkles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            
            ctx.fillStyle = `rgba(255, 215, 0, ${p.life})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            
            p.x += p.speedX;
            p.y += p.speedY;
            p.life -= 0.02;
            p.size *= 0.96;
            
            if (p.life <= 0) {
                particles.splice(i, 1);
            }
        }
        
        requestAnimationFrame(animateSparkles);
    }
    
    animateSparkles();
}

// ===== FLOATING PARTICLES =====
function createFloatingParticles() {
    const container = document.getElementById('particlesContainer');
    const emojis = ['♥', '♡', '✦', '❀', '✿', '★', '☆', '◆'];
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(particle);
    }
}

// ===== AUDIO FUNCTIONS =====
function playBackgroundMusic() {
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic) {
        bgMusic.volume = 0.3;
        // Try to play immediately
        const playPromise = bgMusic.play();
        
        // If autoplay was prevented, try again on first user interaction
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                const playOnInteraction = () => {
                    bgMusic.play();
                    document.removeEventListener('click', playOnInteraction);
                    document.removeEventListener('keydown', playOnInteraction);
                };
                document.addEventListener('click', playOnInteraction, { once: true });
                document.addEventListener('keydown', playOnInteraction, { once: true });
            });
        }
    }
}

function playSound(type) {
    let audio;
    switch(type) {
        case 'heartbeat':
            audio = document.getElementById('sfxHeartbeat');
            break;
        case 'kiss':
            audio = document.getElementById('sfxKiss');
            break;
        case 'chime':
            audio = document.getElementById('sfxChime');
            break;
        case 'giggle':
            audio = document.getElementById('sfxGiggle');
            break;
    }
    
    if (audio) {
        audio.currentTime = 0;
        audio.volume = 0.5;
        audio.play().catch(e => console.log('Audio play prevented'));
    }
}

function playAmbientSound(type) {
    if (type === 'rain') {
        const rain = document.getElementById('sfxRain');
        rain.volume = 0.2;
        rain.play().catch(e => console.log('Ambient sound prevented'));
    }
}


// ===== ACHIEVEMENT SYSTEM =====
function checkAchievements() {
    // First choice
    if (totalChoices === 1 && !achievementsList.find(a => a.id === 'first_choice').unlocked) {
        unlockAchievement('first_choice');
    }
    
    // Romantic milestones
    if (romanticChoicesCount === 5 && !achievementsList.find(a => a.id === 'romantic_5').unlocked) {
        unlockAchievement('romantic_5');
    }
    if (romanticChoicesCount === 10 && !achievementsList.find(a => a.id === 'romantic_10').unlocked) {
        unlockAchievement('romantic_10');
    }
    if (romanticChoicesCount === 15 && !achievementsList.find(a => a.id === 'romantic_15').unlocked) {
        unlockAchievement('romantic_15');
    }
    
    // Scene milestones
    if (currentScene === 10 && !achievementsList.find(a => a.id === 'halfway').unlocked) {
        unlockAchievement('halfway');
    }
    if (currentScene === 20 && !achievementsList.find(a => a.id === 'complete').unlocked) {
        unlockAchievement('complete');
    }
    
    // Perfect love
    if (romanticChoicesCount === 20 && !achievementsList.find(a => a.id === 'perfect').unlocked) {
        unlockAchievement('perfect');
    }
    
    // Mini-game master
    if (minigamesPlayed === 10 && !achievementsList.find(a => a.id === 'minigame_master').unlocked) {
        unlockAchievement('minigame_master');
    }
}

function unlockAchievement(achievementId) {
    const achievement = achievementsList.find(a => a.id === achievementId);
    if (achievement && !achievement.unlocked) {
        achievement.unlocked = true;
        showAchievementNotification(achievement);
    }
}

function showAchievementNotification(achievement) {
    const notification = document.getElementById('achievementNotification');
    document.getElementById('achievementTitle').textContent = achievement.name;
    document.getElementById('achievementDesc').textContent = achievement.desc;
    
    notification.classList.add('show');
    playSound('chime');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function displayAchievements() {
    const container = document.getElementById('achievementList');
    container.innerHTML = '';
    
    achievementsList.forEach(achievement => {
        const item = document.createElement('div');
        item.className = 'achievement-item' + (achievement.unlocked ? ' unlocked' : '');
        item.innerHTML = `
            <div class="achievement-item-icon">${achievement.unlocked ? achievement.icon : '🔒'}</div>
            <div class="achievement-item-name">${achievement.unlocked ? achievement.name : '???'}</div>
        `;
        container.appendChild(item);
    });
}

// ===== MUSIC CONTROLS =====
function toggleMusic() {
    const bgMusic = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicToggle');
    
    if (isMusicPlaying) {
        bgMusic.pause();
        musicBtn.textContent = '🔇';
        musicBtn.classList.add('muted');
        isMusicPlaying = false;
    } else {
        bgMusic.play();
        musicBtn.textContent = '🎵';
        musicBtn.classList.remove('muted');
        isMusicPlaying = true;
    }
}

// ===== ENHANCED PARTICLE EFFECTS =====
function createParticleBurst(event) {
    const colors = ['#ffd700', '#ff69b4', '#ff1493', '#ffa500', '#ff6347'];
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'particle-burst';
            particle.style.left = event.clientX + 'px';
            particle.style.top = event.clientY + 'px';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            const angle = (Math.PI * 2 * i) / 20;
            const distance = 80 + Math.random() * 40;
            particle.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
            particle.style.setProperty('--ty', Math.sin(angle) * distance + 'px');
            
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 1500);
        }, i * 30);
    }
}
