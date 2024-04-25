let ParticleSimulation = {};

ParticleSimulation.setup = function () {
  let canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  this.context = canvas.getContext("2d");
  this.width = canvas.width;
  this.height = canvas.height;
  this.centerX = canvas.width / 2;
  this.centerY = canvas.height / 2;

  document.getElementsByTagName("body")[0].appendChild(canvas);

  this.stepCount = 0;
  this.particles = [];
  this.population = 150;

  this.initializeParticles();
};

ParticleSimulation.initializeParticles = function () {
  for (let i = 0; i < this.population; i++) {
    let particle = {
      x: this.width * Math.random(),
      y: this.height * Math.random(),
      xVelocity: 0,
      yVelocity: 0,
      size: 8 + 30 * Math.random(),
    };
    this.particles.push(particle);
  }
};

ParticleSimulation.evolve = function () {
  this.stepCount++;
  this.moveParticles();
  this.drawParticles();
};

ParticleSimulation.moveParticles = function () {
  for (let i = 0; i < this.particles.length; i++) {
    let particle = this.particles[i];

    particle.xVelocity += 1 * (-0.5 + Math.random());
    particle.yVelocity += 1 * (-0.5 + Math.random());

    let attractionStrength = 0.001;
    particle.xVelocity += attractionStrength * (this.centerX - particle.x);
    particle.yVelocity += attractionStrength * (this.centerY - particle.y);
    particle.xVelocity *= 0.99;
    particle.yVelocity *= 0.98;

    particle.x += particle.xVelocity;
    particle.y += particle.yVelocity;
  }
};

ParticleSimulation.drawParticles = function () {
  this.context.beginPath();
  this.context.clearRect(0, 0, this.width, this.height);
  this.context.closePath();

  for (let i = 0; i < this.particles.length; i++) {
    let particle = this.particles[i];
    this.context.beginPath();
    this.context.arc(
      particle.x,
      particle.y,
      particle.size,
      0,
      2 * Math.PI,
      true
    );
    this.context.fillStyle = "white";
    this.context.fill();
    this.context.closePath();
  }
};

function nameError() {
  const urlParams = new URLSearchParams(window.location.search);
  const codeValue = urlParams.get("code");

  let pageTitle = document.querySelector("title");
  let mainTitle = document.querySelector("h1.unselectable");

  if (codeValue === null) {
    pageTitle.innerText = "Error";
    mainTitle.innerText = "Error";
  } else {
    pageTitle.innerText = "Error: " + codeValue;
    mainTitle.innerText = codeValue;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  ParticleSimulation.setup();

  let animationFrame = function () {
    ParticleSimulation.evolve();
    requestAnimationFrame(animationFrame);
  };
  animationFrame();

  nameError();
});
