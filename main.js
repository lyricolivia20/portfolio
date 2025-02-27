// Terminal Interface Component
const TerminalOS = {
  init: () => {
    return `
      💾 Initializing LyriCodes OS... [✅ SYSTEM ONLINE]
      🔮 Welcome, User. You have accessed a restricted AI interface.
      ⚡ Type a command or select an option:

      🟢 [1] View Projects
      📄 [2] Download Resume
      👤 [3] About Lyric
      📞 [4] Contact

      💡 Type "help" for more options.
    `;
  },

  // Core animation sequences
  animations: {
    terminalSlideDown: () => {
      // GSAP animation for terminal slide
      // ... existing code ...
    },
    
    contentPanelReveal: () => {
      // Holographic panel animation
      // ... existing code ...
    }
  },

  // Enhanced features
  features: {
    matrixRain: {
      enabled: true,
      opacity: 0.3,
      speed: 'medium'
    },
    
    glitchEffects: {
      frequency: 'occasional',
      intensity: 'medium'
    },
    
    aiChat: {
      enabled: true,
      model: 'gpt-4',
      contextWindow: 'portfolio-specific'
    }
  }
}; 