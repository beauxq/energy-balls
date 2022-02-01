class Ball {
    /** radius squared */
    public radius2: number;
    public x: number;
    public y: number;
    public dx_ms: number;
    public dy_ms: number;

    constructor(radius2: number, x: number, y: number, dx_ms: number, dy_ms: number) {
        this.radius2 = radius2;
        this.x = x;
        this.y = y;
        this.dx_ms = dx_ms;
        this.dy_ms = dy_ms;
    }

    public update(dt: number, maxX: number, maxY: number) {
        this.x += dt * this.dx_ms;
        if (this.x > maxX) {
            this.x = maxX;
            this.dx_ms = -Math.abs(this.dx_ms);
        }
        else if (this.x < 0) {
            this.x = 0;
            this.dx_ms = Math.abs(this.dx_ms);
        }

        this.y += dt * this.dy_ms;
        if (this.y > maxY) {
            this.y = maxY;
            this.dy_ms = -Math.abs(this.dy_ms);
        }
        else if (this.y < 0) {
            this.y = 0;
            this.dy_ms = Math.abs(this.dy_ms);
        }
    }
}

export default Ball;
