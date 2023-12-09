class Ray {
    constructor(angle, x=0, y=0, maxCanvasWidth) {
        this.pos = createVector(x, y);
        this.dir = createVector(1, 0);
        this.dir.rotate(-2*PI*angle/360);

        this.maxDistance = maxCanvasWidth / 3;

        this.closest_distance = this.maxDistance;
    }

    updatePosition(x, y) {
        this.pos.x = x;
        this.pos.y = y;
    }

    rotate(angle) {
        this.dir.rotate(angle);
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
            this.closest_distance = this.maxDistance;
        }
        else {
            this.closest_distance = min(distances);
        }
    }

    cast(boundary) {
			// Line-line Intersection. 
			// See: https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection#Given_two_points_on_each_line_segment

        const x1 = boundary.a.x;
        const y1 = boundary.a.y;
        const x2 = boundary.b.x;
        const y2 = boundary.b.y;

        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = this.pos.x + this.maxDistance*this.dir.x;
        const y4 = this.pos.y + this.maxDistance*this.dir.y;

        const denominator = (x1-x2)*(y3-y4) - (y1-y2)*(x3-x4);
        // This means they are parallel or coincident
        if(denominator==0){
            return;
        }

        const t = ((x1-x3)*(y3-y4) - (y1-y3)*(x3-x4)) / denominator;
        const u = ((x1-x3)*(y1-y2) - (y1-y3)*(x1-x2)) / denominator;


        if(t<=1 && t>=0 && u>=0 && u<=1) {
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
        push();
        stroke(150,20,98);
        strokeWeight(0.6);
        
        translate(this.pos.x, this.pos.y);
        line(0, 0, this.dir.x * this.closest_distance, this.dir.y * this.closest_distance);
        pop();
    }
}