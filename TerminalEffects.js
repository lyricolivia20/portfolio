const TerminalEffects = {
    typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        return new Promise(resolve => {
            const typing = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typing);
                    resolve();
                }
            }, speed);
        });
    },

    glitchText(element) {
        const original = element.textContent;
        const glitchChars = '!@#$%^&*()<>[]{}';
        let iterations = 0;

        const glitchEffect = setInterval(() => {
            element.textContent = original
                .split('')
                .map((char, index) => {
                    if (index < iterations) return char;
                    return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                })
                .join('');

            if (iterations >= original.length) {
                clearInterval(glitchEffect);
                element.textContent = original;
            }
            iterations += 1/3;
        }, 30);
    }
}; 