class RayCast {
    constructor(number_of_rays) {
        this.rays = [];

        for(let i=0; i< number_of_rays; i++) {
            let angle = i * (360 / number_of_rays);
            this.rays.push(new Ray(angle));
          }
    }

    cast(walls) {
        for(let i=0; i<this.rays.length; i++) {
            this.rays[i].cast_all(walls);
        }
    }

    update(x, y) {
        for(let i=0; i<this.rays.length; i++) {
            this.rays[i].updatePosition(x, y);
        }
    }

    show() {
        for(let i=0; i<this.rays.length; i++) {
            this.rays[i].show();
        }
    }
}