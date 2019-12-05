PVector pos;
PVector vel;
PVector target;
float speed = 10;
float angle;
float easeRate = 0.05;
PImage img;

void setup() {
  size(1000,600);
  img=loadImage("plane.png");
  background(250);
  pos = new PVector(width/2, height/2);
  vel = new PVector(0, 0);
  target = new PVector(0,0);
  
}

void draw() {
  fill(250, 20);
  noStroke();
  imageMode(CORNER);
  //image(img, 0, 0, width, height);
  target.set(mouseX, mouseY);
  float angle = atan2(target.y - pos.y, target.x - pos.x);
  
  speed = pos.dist(target) * easeRate;
  
  vel.x = cos(angle) * speed;
  vel.y = sin(angle) * speed;
  
  pos.add(vel);
  translate(pos.x, pos.y);
  rotate(angle);
  fill(220);
  imageMode(CORNER);
  image(img,0, 0, 50, 50-speed);
  //background(0);
}
