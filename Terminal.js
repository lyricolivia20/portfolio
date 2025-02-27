class TerminalOS {
  constructor() {
    this.commands = {
      projects: () => this.showProjects(),
      about: () => this.showAbout(),
      contact: () => this.showContact(),
      help: () => this.showHelp(),
      clear: () => this.clearTerminal(),
      matrix: () => this.toggleMatrix()
    };
    
    this.init();
  }

  init() {
    return `
      ${this.renderHeader()}
      ${this.renderWelcome()}
    `;
  }

  renderHeader() {
    return `
      💾 LyriCodes_OS v2.1 [ONLINE]
      🔮 Neural Interface Active
    `;
  }

  renderWelcome() {
    return `
      ⚡ Available commands:
      
      🟢 projects  - View my work
      👤 about     - Who am I?
      📞 contact   - Get in touch
      ❔ help      - Show all commands
      
      Type a command to begin...
    `;
  }
} 