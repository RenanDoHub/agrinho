let catcherLocation;
let catcherColor;
let catcherRadius;
let cursorImg;
let timer = 30;
let drops = [];
let drops2 = [];
let drops3 = [];
let drops4 = [];
let totalDropsCaught;
let bgImg;
let musicaFundo;

function preload() {
  musicaFundo = loadSound('fun.mp3'); // Carregar o som de fundo
  bgImg = loadImage('cidade.jpeg');  // Carregar a imagem de fundo
  cursorImg = loadImage('cesta.jpeg'); // Carregar a imagem do cursor
}

function setup() {
  createCanvas(500, 500);

  // Inicia o áudio com interação do usuário
  userStartAudio();

  catcherLocation = { 'x': 0, 'y': 0 };
  catcherColor = color(255, 200, 200);
  catcherRadius = 60;

  // Inicializar as gotas
  for (let i = 0; i < 2; i++) {
    let drop = { 'x': random(width), 'y': -20, 'r': 8, 'speed': random(4, 5), 'c': color(0), 'size': 30 };
    drops.push(drop);
  }

  for (let i = 0; i < 20; i++) {
    let drop2 = { 'x': random(width), 'y': -20, 'r': 8, 'speed': random(1, 3), 'c': color(0), 'size': 30 };
    drops2.push(drop2);
  }

  for (let i = 0; i < 5; i++) {
    let drop3 = { 'x': random(width), 'y': -20, 'r': 8, 'speed': random(3, 4), 'c': color(0), 'size': 30 };
    drops3.push(drop3);
  }

  for (let i = 0; i < 15; i++) {
    let drop4 = { 'x': random(width), 'y': -20, 'r': 8, 'speed': random(2, 3), 'c': color(0), 'size': 30 };
    drops4.push(drop4);
  }

  totalDropsCaught = 0;
  musicaFundo.loop(); // Reproduz a música em loop
}

function draw() {
  let framecounter = frameCount;
  if (framecounter % 60 === 0) {
    timer--;
  }

  if (bgImg) {
    image(bgImg, 0, 0, width, height);
  } else {
    background(220, 20, 60);
  }

  setCatcherLocation(mouseX, mouseY);
  displayCatcher1();

  // Movimentar e exibir as gotas
  for (let i = 0; i < drops.length; i++) {
    moveDrop(drops[i]);
    displayDrop(drops[i]);
    if (catcherIntersect(drops[i])) {
      caught(drops[i]);
      totalDropsCaught += 5;
    }
  }

  for (let i = 0; i < drops2.length; i++) {
    moveDrop(drops2[i]);
    displayDrop11(drops2[i]);
    if (catcherIntersect(drops2[i])) {
      caught(drops2[i]);
      totalDropsCaught++;
    }
  }

  for (let i = 0; i < drops3.length; i++) {
    moveDrop(drops3[i]);
    displayDrop12(drops3[i]);
    if (catcherIntersect(drops3[i])) {
      caught(drops3[i]);
      totalDropsCaught += 3;
    }
  }

  for (let i = 0; i < drops4.length; i++) {
    moveDrop(drops4[i]);
    displayDrop13(drops4[i]);
    if (catcherIntersect(drops4[i])) {
      caught(drops4[i]);
      totalDropsCaught -= 10;
    }
  }

  displayCatcher2();

  // Exibir o cursor
  image(cursorImg, mouseX - 15 * 6 / 2, mouseY - 21 * 6 / 2, 15 * 6, 21 * 6);

  // Exibir a quantidade de gotas pegadas e o tempo restante
  textSize(14);
  fill(255);
  stroke(0);
  strokeWeight(3);
  text('Raindrops caught: ' + totalDropsCaught, 10, 30);

  textSize(14);
  fill(255);
  stroke(0);
  strokeWeight(3);
  text("Timer: " + timer, 400, 30);

  if (totalDropsCaught >= 100) {
    totalDropsCaught = 10000;
    timer = 10000;
    background(34, 139, 34);
    textSize(25);
    stroke(0);
    strokeWeight(3);
    fill(255);
    text('Chegou a 100, você ganhou!', 80, 250);
    musicaFundo.stop(); // Parar a música quando o jogador ganhar
  }

  if (timer <= 0) {
    textSize(25);
    background(255, 0, 0);
    text("Acabou o tempo, você perdeu!", 80, 250);
    musicaFundo.stop(); // Parar a música quando o tempo acabar
  }

  if (totalDropsCaught < 0) {
    totalDropsCaught = 0;
  }
}

// Funções para movimentar e exibir as gotas
function moveDrop(drop) {
  drop.y += drop.speed;
  if (drop.y > height + drop.r) {
    drop.x = random(width);
    drop.y = random(-20, -100);
  }
}

function displayDrop(drop) {
  fill(drop.c);
  noStroke();
  push();
  translate(drop.x, drop.y);

  beginShape();
  fill(255, 0, 0);
  ellipse(0, 0, 20, 25);
  ellipse(12, 4, 20, 25);
  endShape(CLOSE);

  beginShape();
  noFill();
  stroke(0);
  strokeWeight(1);
  bezier(10, -8, 2, -10, 25, -25, 32, -15);
  endShape(CLOSE);

  beginShape();
  fill(34, 139, 34);
  ellipse(10, -20, 8, 15);
  pop();
}

function displayDrop11(drop2) {
  fill(drop2.c);
  noStroke();
  push();
  translate(drop2.x, drop2.y);
  rotate(-PI / 8);

  beginShape();
  fill(255, 255, 0);
  stroke(0);
  strokeWeight(1);
  ellipse(0, 0, 15, 40);

  fill(0);
  ellipse(0, -20, 7, 10);
  endShape(CLOSE);
  pop();
}

function displayDrop12(drop4) {
  fill(drop4.c);
  noStroke();
  push();
  translate(drop4.x, drop4.y);
  rotate(-PI / 8);

  stroke(0);
  strokeWeight(1);

  fill(255, 165, 0);
  ellipse(0, 0, 30, 30);

  beginShape();
  noFill();
  stroke(0);
  strokeWeight(1);
  bezier(0, -5, 2, -10, 25, -25, 27, -11);
  endShape(CLOSE);
  strokeWeight(1);
  fill(34, 139, 34);
  ellipse(10, -22, 8, 15);
  pop();
}

function displayDrop13(drop2) {
  fill(drop2.c);
  noStroke();
  push();
  translate(drop2.x, drop2.y);

  stroke(60);
  fill(139, 69, 19);
  rect(0, 0, 10, 50);
  triangle(-15, 25, 25, 25, 6, 60);

  pop();
}

// Funções para o coletor (cesta)
function setCatcherLocation(x, y) {
  catcherLocation.x = x;
  catcherLocation.y = y;
}

function displaySimpleCatcher() {
  stroke(0);
  fill(catcherColor);
  ellipse(catcherLocation.x, catcherLocation.y, catcherRadius * 2, catcherRadius * 2);
}

function displayCatcher1() {
  // O código para exibir o coletor pode ser adicionado aqui
}

function displayCatcher2() {
  // O código para exibir o coletor pode ser adicionado aqui
}

function catcherIntersect(drop) {
  let dx = catcherLocation.x - drop.x;
  let dy = catcherLocation.y - drop.y;
  let distance = sqrt(dx * dx + dy * dy);
  if (distance < (catcherRadius / 2 + drop.r)) {
    return true;
  } else {
    return false;
  }
}

function caught(drop) {
  drop.x = random(width);
  drop.y = random(-20, -100);
}