// Music Toggle Logic
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');

// Set volume to 50%
bgMusic.volume = 0.5;
let isPlaying = false;
let hasStarted = false;

// Try to autoplay immediately
const attemptAutoplay = () => {
    if (hasStarted) return;
    
    bgMusic.play().then(() => {
        hasStarted = true;
        isPlaying = true;
        musicIcon.setAttribute('icon', 'solar:pause-bold');
        musicToggle.classList.add('animate-spin-slow');
        musicToggle.classList.remove('animate-pulse');
        console.log('Music started automatically');
    }).catch(() => {
        console.log('Autoplay blocked - waiting for user interaction');
        musicToggle.classList.add('animate-pulse');
    });
};

// Try autoplay after loader
setTimeout(attemptAutoplay, 1600);

// Also try on first user interaction (any type)
const startOnInteraction = () => {
    if (!hasStarted) {
        attemptAutoplay();
    }
};

// Listen for various user interactions
['click', 'touchstart', 'keydown', 'scroll'].forEach(eventType => {
    document.addEventListener(eventType, startOnInteraction, { once: true, passive: true });
});

musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicIcon.setAttribute('icon', 'solar:music-note-2-bold');
        musicToggle.classList.remove('animate-spin-slow');
    } else {
        bgMusic.play();
        musicIcon.setAttribute('icon', 'solar:pause-bold');
        musicToggle.classList.add('animate-spin-slow');
    }
    isPlaying = !isPlaying;
});

// Add custom animation for music button
const style = document.createElement('style');
style.textContent = `
    @keyframes spin-slow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    .animate-spin-slow {
        animation: spin-slow 3s linear infinite;
    }
`;
document.head.appendChild(style);
