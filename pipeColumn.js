class pipeColumn {
  /* 
  A pipeColumn is made out of two pipes, upperPipe and lowerPipe.
  There is a gap between them that can be customized.
  */
  constructor(x, thickness, gapHeight, gapSize) {
    this.upperPipe = new pipe(x, 0, thickness, height - gapHeight);
    this.lowerPipe = new pipe(x, height - gapHeight + gapSize, thickness, height);
    
    this.pointGiven = false;
  }
  
  display() {
    this.upperPipe.display();
    this.lowerPipe.display();
  }
  
  // Pipes need to move to the left side of the screen.
  move(speed=1) {
    this.upperPipe.x = this.upperPipe.x - speed;
    this.lowerPipe.x = this.lowerPipe.x - speed;
  }
  
  // Detects if player (target) collided with either half of the pipeColumn.
  detectCollusion(target) {
    if (this.upperPipe.detectCollusionWith(target) ||
        this.lowerPipe.detectCollusionWith(target)) {
      return true;
    }
    else {return false;}
  }
  
  // Detects if the player is to the right of this column. Used in scoring.
  isPassed(player) {
    if (player.x > this.upperPipe.x + this.upperPipe.w && this.pointGiven == false) {
      this.pointGiven = true;
      return true;
    }
    else {return false;}
  }
  
}