// CCLab Mini Project - 9.R Particle World Template
let particles = [];

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent("p5-canvas-container");
  frameRate(120)
}

function draw() {
  background(97, 107, 135, 150);
  noStroke()
  //text(particles.length, 0, 10)
  let a = new Particle(mouseX, mouseY)
  particles.push(a)
  // update and display
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.update();
    p.delete(i)
    p.display();
  }
}

class Particle {
  // constructor function
  constructor(startX, startY) {
    // properties (variables): particle's characteristics
    this.x = width / 2;
    this.y = height / 2;
    this.dia = random(2, 5);
    this.speedx = random(-0.5, 0.5)
    this.speedy = random(-0.5, 0.5)
    //acceleration
    this.speedupx = startX
    this.speedupy = startY
    //color change
    this.lifespan = 0
    this.grow = 0.001
    this.color = ''
  }
  // methods (functions): particle's behaviors
  update() {
    // (add) 
    this.x += this.speedx
    this.y += this.speedy
    //let the particles to fly the opposite side of the mouse
    this.speedupx = map(mouseX, 0, width, 0.01, -0.01)
    this.speedupy = map(mouseY, 0, height, 0.01, -0.01)
    this.speedx += this.speedupx
    this.speedy += this.speedupy
    //color change
    this.lifespan += this.grow
    this.color = lerpColor('#3e0da1', '#d1f8ff', this.lifespan)
  }
  display() {
    // particle's appearance
    fill(this.color)
    push();
    translate(this.x, this.y);
    circle(0, 0, this.dia);
    pop();
  }
  //delete the particles that fly out of the canvas
  delete(i) {
    if (this.x > width || this.x < 0 || this.y > height || this.y < 0) {
      particles.splice(i, 1)
    }
  }
}
