// Animated math symbols canvas for hero section
(function() {
  const canvas = document.getElementById('math-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const symbols = ['∇', '∫', '∑', 'σ', 'θ', 'λ', 'μ', '∂', 'Σ', '∈', '⊗', 'α', 'β', 'η', 'ε', '∞', '∏', 'Ω'];

  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function Particle() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.sym = symbols[Math.floor(Math.random() * symbols.length)];
    this.size = Math.random() * 20 + 10;
    this.alpha = Math.random() * 0.5 + 0.1;
    this.speed = Math.random() * 0.3 + 0.05;
    this.drift = (Math.random() - 0.5) * 0.2;
  }

  function init() {
    resize();
    particles = Array.from({ length: 40 }, () => new Particle());
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.font = '';

    particles.forEach(p => {
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = '#64ffda';
      ctx.font = `${p.size}px IBM Plex Mono, monospace`;
      ctx.fillText(p.sym, p.x, p.y);

      p.y -= p.speed;
      p.x += p.drift;

      if (p.y < -30) {
        p.y = H + 10;
        p.x = Math.random() * W;
      }
      if (p.x < -20 || p.x > W + 20) {
        p.x = Math.random() * W;
      }
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  init();
  draw();
})();
