class rectangleWall {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.sides = [];
        this.sides.push(new Boundary(x,y,x+width,y));   							//Top
        this.sides.push(new Boundary(x+width,y,x+width,y+height));   	//Right
        this.sides.push(new Boundary(x,y+height, x+width,y+height));  //Bottom
        this.sides.push(new Boundary(x,y,x,y+height));   							//Left
    }

    show() {
        push();
        fill(255);
        rectMode(CORNER);
        rect(this.x, this.y, this.width, this.height);
        pop();
    }
}