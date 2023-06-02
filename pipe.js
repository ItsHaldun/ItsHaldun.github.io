class pipe {

  // A single pipe is one of the two segments of the green obstacles in the game.
  constructor(x, y, w=50, h=50) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  display(sColor=color(0, 50, 0), fColor=color(0, 255, 0)) {
    stroke(sColor);
    fill(fColor);
    rect(this.x, this.y, this.w, this.h);
  }


  /* 
    This is box collusion detection I learned from http://www.jeffreythompson.org/collision-detection/
    It is used to detect collusion between the bird and the pipes.
  */
  detectCollusionWith(target) {
    if (
      this.x + this.w >= target.x &&
      this.x <= target.x + target.w &&
      this.y + this.h >= target.y &&
      this.y <= target.y + target.h
    ) {
      return true;
    } else {
      return false;
    }
  }
}
