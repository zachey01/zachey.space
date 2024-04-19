let App = {};
App.setup = function () {
  let canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  this.ctx = canvas.getContext("2d");
  this.width = canvas.width;
  this.height = canvas.height;
  this.xC = canvas.width / 2;
  this.yC = canvas.height / 2;

  document.getElementsByTagName("body")[0].appendChild(canvas);

  this.stepCount = 0;
  this.particles = [];
  this.population = 150;

  this.birth();
};
App.birth = function () {
  for (let i = 0; i < this.population; i++) {
    let particle = {
      x: this.width * Math.random(),
      y: this.height * Math.random(),
      xSpeed: 0,
      ySpeed: 0,
      size: 8 + 30 * Math.random(),
    };
    this.particles.push(particle);
  }
};
App.evolve = function () {
  this.stepCount++;
  App.move();
  App.draw();
};
App.move = function () {
  for (let i = 0; i < this.particles.length; i++) {
    let p = this.particles[i];

    p.xSpeed += 1 * (-0.5 + Math.random());
    p.ySpeed += 1 * (-0.5 + Math.random());

    let k = 0.001;
    p.xSpeed += k * (this.xC - p.x);
    p.ySpeed += k * (this.yC - p.y);
    p.xSpeed *= 0.99;
    p.ySpeed *= 0.98;

    p.x += p.xSpeed;
    p.y += p.ySpeed;
  }
};
App.draw = function () {
  this.ctx.beginPath();
  this.ctx.clearRect(0, 0, this.width, this.height);
  this.ctx.closePath();

  for (let i = 0; i < this.particles.length; i++) {
    let p = this.particles[i];
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI, true);
    this.ctx.fillStyle = "white";
    this.ctx.fill();
    this.ctx.closePath();
  }
};

document.addEventListener("DOMContentLoaded", function () {
  App.setup();
  App.draw();

  let frame = function () {
    App.evolve();
    requestAnimationFrame(frame);
  };
  frame();
});
