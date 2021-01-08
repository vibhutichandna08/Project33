const Engine = Matter.Engine;
const World = Matter.World;
const Events = Matter.Events;
const Bodies = Matter.Bodies;

var particles = [];
var plinkos = [];

//variable divisions was not defined as an array
var divisions = [];

var divisionHeight = 300;
var score = 0;
var particle;
var count = 0;
var gameState = "play";
function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width / 2, height, width, 20);


  for (var k = 0; k <= width; k = k + 80) {
    divisions.push(new Divisions(k, height - divisionHeight / 2, 10, divisionHeight));
  }


  for (var j = 75; j <= width; j = j + 50) {

    plinkos.push(new Plinko(j, 75, 7.5));
  }

  for (var j = 50; j <= width - 10; j = j + 50) {

    plinkos.push(new Plinko(j, 175, 10));
  }

  for (var j = 75; j <= width; j = j + 50) {

    plinkos.push(new Plinko(j, 275, 7.5));
  }

  for (var j = 50; j <= width - 10; j = j + 50) {

    plinkos.push(new Plinko(j, 375, 10));
  }

  wallR = new Ground(805, height / 2, 10, height + 10);
  wallL = new Ground(-5, height / 2, 10, height + 10);
}



function draw() {
  background("black");
  textSize(20)
  text("Score : " + score, 20, 30);
  Engine.update(engine);
  textSize(30)
  text(" 500 ", 5, 550);
  text(" 500 ", 80, 550);
  text(" 500 ", 160, 550);
  text(" 500 ", 240, 550);
  text(" 100 ", 320, 550);
  text(" 100 ", 400, 550);
  text(" 100 ", 480, 550);
  text(" 200 ", 560, 550);
  text(" 200 ", 640, 550);
  text(" 200 ", 720, 550);

  wallL.display();
  wallR.display();

  for (var i = 0; i < plinkos.length; i++) {

    plinkos[i].display();

  }
  
  if (gameState == "end") {
    push();
    textSize(60);
    fill("white");
    text("Game Over", 200, 250);
    pop();
    push();
    textSize(30);
    fill("white");
    text("Press R to Reset", 250, 325);
    pop();
  }
  for (var k = 0; k < divisions.length; k++) {

    divisions[k].display();
  }

  if (particle != null) {
    particle.display();

    if (particle.body.position.y > 760) {
      if (particle.body.position.x < 300) {
        score = score + 500;
        particle = null;
        if (count >= 5) gameState = "end";
      }


      else if (particle.body.position.x < 600 && particle.body.position.x > 301) {
        score = score + 100;
        particle = null;
        if (count >= 5) gameState = "end";

      }
      else if (particle.body.position.x < 900 && particle.body.position.x > 601) {
        score = score + 200;
        particle = null;
        if (count >= 5) gameState = "end";

      }

    }

  }
}

function mousePressed() {
  if (gameState !== "end") {
    particle = new Particle(mouseX, 10, 10, 10);
    count++;
  }
}

function keyPressed() {
  if (keyCode === 82) {
    gameState = "play";
    count = 0;
    score = 0;
  }
}
