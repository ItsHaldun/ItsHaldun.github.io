class Ray {
    constructor(angle, x=0, y=0) {
        this.pos = createVector(x, y);
        this.dir = createVector(1, 0);
        this.dir.rotate(-2*PI*angle/360);
        this.closest_distance = 999999;
    }

    updatePosition(x, y) {
        this.pos.x = x;
        this.pos.y = y;
    }

    cast_all(walls) {
        let points = [];
        let distances = [];
        for (let i=0; i<walls.length; i++) {
            let pt = this.cast(walls[i]);
            if (pt) {
                points.push(pt);
                distances.push(this.pos.dist(pt));
            }
        }

        if (points.length == 0) {
            this.closest_distance = 999999;
        }
        else {
            this.closest_distance = min(distances);
        }
    }

    cast(boundary) {
        const x1 = boundary.a.x;
        const y1 = boundary.a.y;
        const x2 = boundary.b.x;
        const y2 = boundary.b.y;

        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = this.pos.x + this.dir.x;
        const y4 = this.pos.y + this.dir.y;

        const denominator = (x1-x2)*(y3-y4) - (y1-y2)*(x3-x4);
        // This means they are parallel or coincident
        if(denominator==0){
            return;
        }

        const t = ((x1-x3)*(y3-y4) - (y1-y3)*(x3-x4)) / denominator;
        const u = ((x1-x3)*(y1-y2) - (y1-y3)*(x1-x2)) / denominator;

        if(t<1 && t>0 && u>0) {
            // Returns the point of intersection
            const p_x = x1 + t*(x2-x1);
            const p_y = y1 + t*(y2-y1);

            return createVector(p_x, p_y);
        }
        else {
            return;
        }
    }

    show() {
        stroke(220);
        strokeWeight(0.6);
        push();
        translate(this.pos.x, this.pos.y);
        line(0, 0, this.dir.x * this.closest_distance, this.dir.y * this.closest_distance);
        pop();
    }
}