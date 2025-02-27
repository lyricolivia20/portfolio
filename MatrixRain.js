class MatrixRain {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.characters = 'アイウエオカキクケコサシスセソタチツテト';
    this.fontSize = 14;
    this.columns = canvas.width / this.fontSize;
    this.drops = [];
    
    this.init();
  }

  init() {
    for (let i = 0; i < this.columns; i++) {
      this.drops[i] = 1;
    }
    this.animate();
  }

  animate() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.ctx.fillStyle = '#0F0';
    this.ctx.font = this.fontSize + 'px monospace';
    
    for (let i = 0; i < this.drops.length; i++) {
      const text = this.characters.charAt(
        Math.floor(Math.random() * this.characters.length)
      );
      this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);
      
      if (this.drops[i] * this.fontSize > this.canvas.height && 
          Math.random() > 0.975) {
        this.drops[i] = 0;
      }
      this.drops[i]++;
    }
    requestAnimationFrame(() => this.animate());
  }
} 