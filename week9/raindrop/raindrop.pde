// reference from Daniel Shiffman http://codingtra.in http://patreon.com/codingtrain

Drop[] drops = new Drop[100]; // array of drop objects

void setup() {
  size(640, 360); 
  for (int i = 0; i < drops.length; i++) {
    drops[i] = new Drop();
  }
}

void draw() {
  background(0); 
  for (int i = 0; i < drops.length; i++) {
    drops[i].fall(); 
    drops[i].show();
  }
}

class Drop {
  float x; 
  float y; 
  float z; // determines whether the drop is far or near
  float len; // length of the drop
  float yspeed; // speed of te drop

  Drop() {
    x  = random(width); 
    y  = random(-500, -50); // drop first begins off screen to give a realistic effect
    z  = random(0, 20); 
    len = map(z, 0, 20, 10, 20); 
    yspeed  = map(z, 0, 20, 1, 20); 
  }

  //sets the shape and speed of drop
  void fall() { 
    y = y + yspeed; // increment y position to give the effect of falling 
    float grav = map(z, 0, 20, 0, 0.2); // if z is near then gravity on drop is more
    yspeed = yspeed + grav; // speed increases as gravity acts on the drop

    if (y > height) { // repositions the drop after it has 'disappeared' from screen
      y = random(-200, -100);
      yspeed = map(z, 0, 20, 4, 10);
    }
  }

  // render drop
  void show() { // function to render the drop onto the screen
    float thick = map(z, 0, 20, 1, 3); //if z is near , drop is more thicker 
    strokeWeight(thick); // weight of the drop
    stroke(138, 43, 226); // purple color
    line(x, y, x, y+len); // draws the line with two points
  }
}
