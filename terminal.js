// Terminal functionality
const commands = {
    p: {
        description: 'View my projects',
        action: () => {
            addResponse("Redirecting to Projects page...");
            setTimeout(() => window.location.href = 'projects.html', 1000);
        }
    },
    a: {
        description: 'About me',
        action: () => {
            addResponse("Redirecting to About page...");
            setTimeout(() => window.location.href = 'about.html', 1000);
        }
    },
    c: {
        description: 'Get in touch',
        action: () => {
            addResponse("Redirecting to Contact page...");
            setTimeout(() => window.location.href = 'contact.html', 1000);
        }
    },
    x: {
        description: 'Enter chaos mode',
        action: () => initiateChaosMode()
    }
};

const bootSequence = [
    {
        text: "\n   // SYSTEM OS v2.1.3 //\n",
        delay: 800
    },
    {
        text: "[INIT] Establishing secure connection...",
        delay: 800
    },
    {
        text: "[CORE] ████████████████████████████  100%",
        delay: 400
    },
    {
        text: "[SYS]  ████████████████████████████  100%",
        delay: 400
    },
    {
        text: "[AUTH] Verifying credentials...",
        delay: 800
    },
    {
        text: "[AUTH] Access granted: Welcome, Traveler.",
        delay: 600
    },
    {
        text: "\n[SYS] :: Terminal ready. Available commands:\n",
        delay: 800
    },
    {
        text: "\n[P] - Projects       // Access project matrix\n",
        delay: 300
    },
    {
        text: "[A] - About         // Identity protocols\n",
        delay: 300
    },
    {
        text: "[C] - Contact       // Secure channel\n",
        delay: 300
    },
    {
        text: "[X] - Chaos Mode    // Enter at own risk\n",
        delay: 300
    },
    {
        text: "\n> _",
        delay: 300
    }
];

// Make terminal draggable
const terminalWrapper = document.querySelector('.terminal-wrapper');
let rotation = { x: -15, y: -5 }; // Initial tilt
let isDragging = false;
let isRotating = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

// Update event listeners
terminalWrapper.addEventListener('mousedown', startDragging);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', stopDragging);

function startDragging(e) {
    if (e.button === 2) { // Right click
        isRotating = true;
        initialX = e.clientX;
        initialY = e.clientY;
    } else { // Left click
        isDragging = true;
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
    }
    
    if (e.target.closest('.terminal-wrapper')) {
        terminalWrapper.style.cursor = isRotating ? 'grabbing' : 'move';
    }
}

function drag(e) {
    if (isDragging) {
        e.preventDefault();
        currentX = (e.clientX - initialX) * 0.3; // Reduced movement sensitivity
        currentY = (e.clientY - initialY) * 0.3; // Reduced movement sensitivity
        xOffset = currentX;
        yOffset = currentY;
        updateTransform();
    } else if (isRotating) {
        e.preventDefault();
        rotation.x += (e.clientY - initialY) * 0.15; // Reduced rotation sensitivity
        rotation.y += (e.clientX - initialX) * 0.15; // Reduced rotation sensitivity
        rotation.x = Math.min(Math.max(rotation.x, -20), 20); // More limited rotation
        rotation.y = Math.min(Math.max(rotation.y, -20), 20);
        initialX = e.clientX;
        initialY = e.clientY;
        updateTransform();
    }
}

function updateTransform() {
    const transform = `
        translate3d(${currentX}px, ${currentY}px, 0)
        rotateX(${rotation.x}deg)
        rotateY(${rotation.y}deg)
        translateZ(100px)
    `;
    
    terminalWrapper.style.transform = transform;
    terminalWrapper.style.transition = 'transform 0.1s cubic-bezier(0.4, 0, 0.2, 1)';
}

function stopDragging() {
    isDragging = false;
    isRotating = false;
    terminalWrapper.style.cursor = 'grab';
}

// Prevent context menu on terminal
terminalWrapper.addEventListener('contextmenu', e => e.preventDefault());

// Terminal functionality
function addResponse(text, isTyping = true) {
    const output = document.getElementById('terminal-output');
    const response = document.createElement('div');
    
    if (!isTyping) {
        // Instant display for user input
        response.textContent = text;
        output.appendChild(response);
        output.scrollTop = output.scrollHeight;
        return;
    }

    // Typing effect for system responses
    response.textContent = '';
    output.appendChild(response);
    
    let i = 0;
    const typeSpeed = 30; // Adjust typing speed (milliseconds)
    
    function typeChar() {
        if (i < text.length) {
            if (text.charAt(i) === '\n') {
                response.innerHTML += '<br>';
            } else {
                response.textContent += text.charAt(i);
            }
            i++;
            output.scrollTop = output.scrollHeight;
            setTimeout(typeChar, typeSpeed);
        }
    }
    
    typeChar();
}

// Handle commands
document.getElementById('command-input').addEventListener('keyup', function(e) {
    if (e.key !== 'Enter') return;
    
    const command = this.value.toLowerCase().trim();
    addResponse(`> ${this.value}`, false); // false for instant display
    
    if (command in commands) {
        commands[command].action();
    } else if (command !== '') {
        addResponse(`Command not found: ${command}\nType 'help' for available commands`);
    }
    
    this.value = '';
});

// Enhanced terminal initialization
async function initTerminal() {
    const output = document.getElementById('terminal-output');
    
    // Clear terminal
    output.innerHTML = '';
    
    // Add glitch effect during boot
    document.querySelector('.terminal-container').classList.add('booting');
    
    // Play boot sound if available
    const bootSound = new Audio('boot.mp3'); // Optional: Add your boot sound
    bootSound.volume = 0.3;
    try {
        await bootSound.play();
    } catch (e) {
        // Ignore audio play errors
    }

    // Run boot sequence
    for (const sequence of bootSequence) {
        await new Promise(resolve => setTimeout(resolve, sequence.delay));
        addResponse(sequence.text, true);
    }
    
    // Remove boot effect
    setTimeout(() => {
        document.querySelector('.terminal-container').classList.remove('booting');
    }, 3000);
}

// Chaos mode messages
const chaosMessages = [
    "SYSTEM OVERRIDE DETECTED",
    "SECURITY PROTOCOLS BYPASSED",
    "ACCESSING RESTRICTED DIRECTORIES",
    "INITIATING SYSTEM CHAOS SEQUENCE",
    "INJECTING UNSTABLE CODE FRAGMENTS",
    "WARNING: CRITICAL SYSTEM CORRUPTION",
    "SELF-DESTRUCT SEQUENCE INITIATED"
];

// Chaos mode functionality
async function initiateChaosMode() {
    const overlay = document.getElementById('chaos-overlay');
    const message = document.getElementById('chaos-message');
    const countdown = document.getElementById('chaos-countdown');
    
    overlay.classList.remove('hidden');
    
    // Display chaos messages
    for (const msg of chaosMessages) {
        message.textContent = msg;
        await new Promise(resolve => setTimeout(resolve, 1200));
    }
    
    // Countdown
    message.textContent = "SYSTEM DESTABILIZED";
    countdown.classList.remove('hidden');
    
    for (let i = 5; i >= 0; i--) {
        countdown.textContent = i;
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Reset
    setTimeout(() => {
        overlay.classList.add('hidden');
        countdown.classList.add('hidden');
        addResponse("\n✓ System restored from backup\n");
        addResponse("Type 'chaos' to initiate again...\n");
    }, 2000);
}

// Back button functionality
function updateBackButton() {
    const backButton = document.getElementById('floating-back');
    if (window.location.pathname === '/') {
        backButton.classList.add('hidden');
    } else {
        backButton.classList.remove('hidden');
    }
}

function goBack() {
    window.location.href = '/';
}

// Initialize
updateBackButton();
window.addEventListener('popstate', updateBackButton);

document.addEventListener('DOMContentLoaded', () => {
    initTerminal();
}); 