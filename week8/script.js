class Particle {
  constructor(xPos, yPos, radius) {
    this.x = xPos;
    this.y = yPos;
    this.r = radius;
    this.svgElement;
    this.animDuration = random(5, 10);
  }

  drawParticle(svgCtx) {
    this.svgElement = drawCircle(this.x, this.y, this.r);
    svgCtx.appendChild(this.svgElement);
    this.addAnimation();
  }

  addAnimation() {
    // subtle radius animation
    let animElement = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    animElement.setAttribute('attributeName', 'r');
    animElement.setAttribute('values', `${random(width * 0.008, width * 0.003)}; ${random(width * 0.003, width * 0.001)}`);
    animElement.setAttribute('dur', `${this.animDuration}`);
    animElement.setAttribute('repeatCount', 'indefinite');
    this.svgElement.appendChild(animElement);

    //animationMotion calling gravityPath()
    let animMotElement = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
    animMotElement.setAttribute('attributeName', 'cy');
    animMotElement.setAttribute('path', gravityPath());
    animMotElement.setAttribute('dur', `${this.animDuration}`);
    animMotElement.setAttribute('repeatCount', 'indefinite');
    this.svgElement.appendChild(animMotElement);
  }
}

// particle array
function createParticlesArray(num) {
  let particleInstances = [];

  for (let i = 0; i < num; i++) {
    let particleX = width / 2;
    let particleY = height / 3;
    let particleSize = random(width * 0.005, width * 0.01);
    particleInstances.push(new Particle(particleX, particleY, particleSize));
  }

  return particleInstances;
}

let width = window.innerWidth;
let height = window.innerHeight;
const svg = document.getElementById("base-svg");

let particles = createParticlesArray(100);

for (let particle of particles) {
  particle.drawParticle(svg);
}

