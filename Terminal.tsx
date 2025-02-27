const commands: Command[] = [
    { id: 'P', label: 'PROJECTS', command: 'projects', action: () => setLocation('/projects') },
    { id: 'T', label: 'TESTIMONIALS', command: 'testimonials', action: () => setLocation('/testimonials') },
    { id: 'R', label: 'RESUME', command: 'resume', action: () => window.open('/resume.pdf', '_blank') },
    { id: 'A', label: 'ABOUT', command: 'about', action: () => setLocation('/about') },
    { id: 'C', label: 'CONTACT', command: 'contact', action: () => setLocation('/contact') },
    { 
        id: 'X', 
        label: 'CHAOS', 
        command: 'chaos', 
        action: () => {
            addResponse("⚠️ INITIATING CHAOS MODE ⚠️\n");
            setTimeout(() => {
                addResponse("SYSTEM OVERRIDE INITIATED...");
                // Add glitch effect to terminal
                document.querySelector('.terminal-container')?.classList.add('glitch');
                
                // Random matrix characters appearing
                let chaosText = '';
                const chaosChars = '01アカサタナハマヤラワガザダバパイキシチニヒミリヰギジヂビピウクスツヌフムユルエケセテネヘメレヱゲゼデベペオコソトノホモヨロヲゴゾドボポヴ';
                
                const chaosInterval = setInterval(() => {
                    chaosText += chaosChars[Math.floor(Math.random() * chaosChars.length)];
                    addResponse(chaosText);
                }, 100);

                // Stop the chaos after 5 seconds
                setTimeout(() => {
                    clearInterval(chaosInterval);
                    document.querySelector('.terminal-container')?.classList.remove('glitch');
                    addResponse("\nCHAOS MODE DEACTIVATED");
                }, 5000);
            }, 1000);
        }
    },
];

// Helper function to add response to history
const addResponse = (text: string) => {
    setHistory(prev => [...prev, text]);
}; 