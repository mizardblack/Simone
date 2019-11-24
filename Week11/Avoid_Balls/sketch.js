//reference: https://www.openprocessing.org/sketch/772882
let difficulity = 1;
let timer = 5
let plocation, pvelocity;
let glocation = []
let gvelocity = [];
let scene = 1;

function setup() {
  //textFont('Courier New');
  createCanvas(600, 400);
  frameRate(60);
  plocation = createVector(20, 20);
  pvelocity = createVector(0, 0);
  noStroke();
}

function draw() {
  if (scene === 1) {
    background(255);
    fill(0);
  } else if (scene === 2) {
    background(0);
    fill(255);
  } else if (scene === 3) {
    background(114, 5, 5);
    fill(255);
  }

  rect(0, 0, 40, 40);
  rect(width - 40, height - 40, 40, 40);
  textSize(12);
  text("'<' = Previous Scene, '>' = Next Scene. Enter Difficulity:", 150, 17);
  textSize(20);
  text(difficulity, width - 140, 20);
  textSize(20);
  text("Hit RETURN to start.", 210, 40);
  if (plocation.x > width - 30 && plocation.y > height - 30
  ) {
    text("You made it!!!", width - 200, height - 30);
    text("Next Level Strats in ", width - 250, height - 10);
    text(timer, width - 60, height - 10);
    if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
      timer--;
    }
    if (timer == 0 && scene < 3) {
      timer = 5;
      scene++;
      glocation = [];
      gvelocity = [];
      plocation = createVector(20, 20);
      for (let n = 0; n < scene * 5 * difficulity; n++) {
        glocation[n] = createVector(Math.floor(random(50, width - 50)), Math.floor(random(50, height - 50)));
        gvelocity[n] = createVector(random(-1, 1), random(-1, 1));
      }
    } else if (timer == 0 && scene == 3) {
      background(0);
      scene = 0;
      glocation = [];
      gvelocity = [];
      textAlign(CENTER, CENTER);
      textSize(50);
      text("You Beat It!", width / 2+10, height / 2-20);
      textSize(30);
      text("Reload Page to restart.", width / 2+15, height / 2 +50);
      noloop();
    }
  }

  fill(255, 0, 0);
  ellipse(plocation.x, plocation.y, 20, 20); //player
  if (plocation.x >= 10 && plocation.x <= width - 10 && plocation.y >= 10 && plocation.y <= height - 10) {
    if (plocation.x == 10 && pvelocity.x == -1) {
      pvelocity.x++;
    } else if (plocation.x == width - 10 && pvelocity.x == 1) {
      pvelocity.x--;

    } else if (plocation.y == 10 && pvelocity.y == -1) {
      pvelocity.y++;
    } else if (plocation.y == height - 10 && pvelocity.y == 1) {
      pvelocity.y--;
    }
    plocation.add(pvelocity);
  }
  fill(0, 200, 0);
  if (glocation != undefined) {
    for (let i = 0; i < glocation.length; i++) {
      glocation[i].add(gvelocity[i]);
      ellipse(glocation[i].x, glocation[i].y, 20, 20);
      if ((glocation[i].x < 10 || glocation[i].x > width - 10) ||
        (Math.floor(glocation[i].x) == 50 && glocation[i].y < 50) ||
        (Math.floor(glocation[i].x) == width - 50 && glocation[i].y > height - 50)) {
        gvelocity[i].x = gvelocity[i].x * (-1);
      }
      // else if ((glocation[i].y < 10 || glocation[i].y > width - 10) ||
      //   (Math.floor(glocation[i].y) == 50 && glocation[i].x < 50) ||
      //   (Math.floor(glocation[i].y) == width - 50 && glocation[i].x > height - 50)) {
      //   gvelocity[i].y = gvelocity[i].y * (-1);
      // }
      gvelocity[i].y = 0;
      if (sq(plocation.x - glocation[i].x) + sq(plocation.y - glocation[i].y) < 400) {
        plocation = createVector(20, 20);
      }
    }
  }
}

function keyTyped() {
  if (key === ',' && scene != 1) {
    scene--;
  } else if (key === '.' && scene < 3) {
    scene++;
  }
  if (key === ',' || key === '.' || keyCode === ENTER) {
    glocation = [];
    gvelocity = [];
    plocation = createVector(20, 20);
    for (let n = 0; n < scene * 5 * difficulity; n++) {
      glocation[n] = createVector(Math.floor(random(50, width - 50)), Math.floor(random(50, height - 50)));
      gvelocity[n] = createVector(random(-1, 1), random(-1, 1));
    }
  }

  if (key === '1') {
    difficulity = 1;
  } else if (key === '2') {
    difficulity = 2;
  } else if (key === '3') {
    difficulity = 3;
  } else if (key === '4') {
    difficulity = 4;
  } else if (key === '5') {
    difficulity = 5;
  } else if (key === '6') {
    difficulity = 6;
  } else if (key === '7') {
    difficulity = 7;
  } else if (key === '8') {
    difficulity = 8;
  } else if (key === '9') {
    difficulity = 9;
  }
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    pvelocity.x++;
  } else if (keyCode === LEFT_ARROW) {
    pvelocity.x--;
  } else if (keyCode === DOWN_ARROW) {
    pvelocity.y++;
  } else if (keyCode === UP_ARROW) {
    pvelocity.y--;
  }
}


function keyReleased() {
  if (keyCode === RIGHT_ARROW && plocation.x < width - 10) {
    pvelocity.x--;
  } else if (keyCode === LEFT_ARROW && plocation.x > 10) {
    pvelocity.x++;
  } else if (keyCode === DOWN_ARROW && plocation.y < height - 10) {
    pvelocity.y--;
  } else if (keyCode === UP_ARROW && plocation.y > 10) {
    pvelocity.y++;
  }
}