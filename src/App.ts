import { cases } from './square';
import Ball from './Ball';

class App {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    private lastT: number;

    private balls: Ball[];

    constructor(width: number, height: number) {
        this.canvas = document.getElementById('c') as HTMLCanvasElement;
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext('2d')!;

        this.canvas.addEventListener('click', (e) => {
            console.log(`click: ${e.x} ${e.y}`);
        });

        this.lastT = 0;

        this.balls = [];
        this.makeBalls();

        requestAnimationFrame((t_ms) => {
            this.draw(t_ms);
        });
    }

    private makeBalls() {
        const ballCount = Math.floor(Math.min(12, Math.max(4, this.canvas.width * this.canvas.height / 150000 + 2)));
        console.log("" + ballCount + " balls");
        for (let _ = ballCount; _ > 0; --_) {
            this.balls.push(new Ball(Math.pow(Math.random() * Math.min(this.canvas.height, this.canvas.width) / 6 + 17, 2),
                                     Math.random() * this.canvas.width,
                                     Math.random() * this.canvas.height,
                                     Math.random() * 0.04,
                                     Math.random() * 0.04));
        }
    }

    public resize(width: number, height: number) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext('2d')!;
    }

    private draw(t_ms: number) {
        let dt = t_ms - this.lastT;
        if (dt > 500) {
            dt = 0;
        }
        this.lastT = t_ms;

        for (let ball of this.balls) {
            ball.update(dt, this.canvas.width, this.canvas.height);
        }

        const f = (x: number, y: number): number => {
            let total = 0;
            for (let ball of this.balls) {
                const dx = x - ball.x;
                const dy = y - ball.y;
                total += ball.radius2 / (dx * dx + dy * dy);
            }
            return total;
        }

        const threshold = 1;

        // I thought of making this dynamic based on frame rate, but probably not worth the overhead
        const squareLength = 8;
        const xiMax = (this.canvas.width / squareLength) + 1;
        const yiMax = (this.canvas.height / squareLength) + 1;

        let prevRow = [];
        for (let xi = 0; xi < xiMax; ++xi) {
            const x = xi * squareLength;
            const y = 0;
            prevRow.push(f(x, y));
        }
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let yi = 1; yi < yiMax; ++yi) {
            const y = yi * squareLength;
            const thisRow = [f(0, y)];
            for (let xi = 1; xi < xiMax; ++xi) {
                const x = xi * squareLength;
                thisRow.push(f(x, y));
                const corners: [number, number, number, number] = [
                    prevRow[xi - 1],
                    prevRow[xi],
                    thisRow[xi - 1],
                    thisRow[xi]
                ];
                const squareCode =
                    (+(corners[0] > threshold) << 3) |
                    (+(corners[1] > threshold) << 2) |
                    (+(corners[2] > threshold) << 1) |
                    (+(corners[3] > threshold));
                const lines = cases[squareCode](corners, x, y, squareLength, threshold, f);
                const b = Math.floor(255 * x / this.canvas.width);
                this.context.strokeStyle = `rgb(0, ${255 - b}, ${b})`;
                this.context.lineWidth = 3;
                lines.forEach((line) => {
                    this.context.beginPath();
                    this.context.moveTo(line[0], line[1]);
                    this.context.lineTo(line[2], line[3]);
                    this.context.stroke();
                });
            }
            prevRow = thisRow;
        }

        requestAnimationFrame((t_ms) => {
            this.draw(t_ms);
        });
    }
}

export default App;
