// Cslider by Comissar
function createCSlider(a, b, c, d) {
  r = new CSlider(a, b, c, d);
  return r;
}

class CSlider {
  constructor(min, max, value = (min + max) / 2, step = 1) {
    this.width = 130;
    this.height = 20;
    let widthtoheight = this.width - this.height;
    this.ratio = this.width / widthtoheight;
    this.x = 10;
    this.y = -1000;
    this.spos = this.x + this.width / 2 - this.height / 2;
    this.newspos = this.spos;
    this.sposMin = this.x;
    this.sposMax = this.x + this.width - this.height;
    this.vmin = min;
    this.vmax = max;
    this.svalue = constrain(value, this.vmin, this.vmax);
    this.vstep = step;
    this.loose = 1;
    this.over = false;
    this.locked = false;
    this.scale = 1;
  }

  update() {
    if (this.overEvent()) {
      this.over = true;
    } else {
      this.over = false;
    }
    if (mouseIsPressed && this.over) {
      this.locked = true;
    }
    if (!mouseIsPressed) {
      this.locked = false;
    }
    if (this.locked) {
      this.newspos = constrain(mouseX / this.scale - this.height / 2, this.sposMin, this.sposMax);
      this.svalue = this.vmin + (this.vmax - this.vmin) * ((this.newspos - this.sposMin) / (this.sposMax - this.sposMin));
      if (this.vstep > 0) {
        this.svalue = constrain(this.vmin + round((this.svalue - this.vmin) / this.vstep) * this.vstep, this.vmin, this.vmax);
      }
      this.newspos = this.x + (this.width - this.height) * ((this.svalue - this.vmin) / (this.vmax - this.vmin));
    }
    if (abs(this.newspos - this.spos) > 1) {
      this.spos = this.spos + (this.newspos - this.spos) / this.loose;
    }
  }

  overEvent() {
    if (mouseX / this.scale > this.x && mouseX / this.scale < this.x + this.width &&
      mouseY / this.scale > this.y && mouseY / this.scale < this.y + this.height) {
      return true;
    } else {
      return false;
    }
  }

  display() {
    noStroke();
    fill(204);
    rect(this.x, this.y, this.width, this.height);
    if (this.over || this.locked) {
      fill(0, 0, 0);
    } else {
      fill(102, 102, 102);
    }
    rect(this.spos, this.y, this.height, this.height);
  }

  getPos() {
    // Convert spos to be values between
    // 0 and the total width of the scrollbar
    return this.spos * this.ratio;
  }

  value() {
    return this.svalue;
  }

  setScale(sc) {
    this.scale = sc;
  }

	size(sz) {
    this.width = sz;
  }

  position(xp, yp) {
    this.x = xp;
    this.y = yp;
    if (this.vstep > 0) {
      this.svalue = constrain(this.vmin + round((this.svalue - this.vmin) / this.vstep) * this.vstep, this.vmin, this.vmax);
    }
    this.spos = this.x + (this.width - this.height) * ((this.svalue - this.vmin) / (this.vmax - this.vmin));
    this.newspos = this.spos;
    this.sposMin = this.x;
    this.sposMax = this.x + this.width - this.height;
    push();
    this.update();
    this.display();
    pop();
  }
}