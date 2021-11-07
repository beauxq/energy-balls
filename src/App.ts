import { cases } from './square';

class App {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor(width: number, height: number) {
        this.canvas = document.getElementById('c') as HTMLCanvasElement;
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext('2d')!;

        this.canvas.addEventListener('click', (e) => {
            console.log(`click: ${e.x} ${e.y}`);
        });
        this.canvas.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            console.log(`right click: ${e.x} ${e.y}`);
        });
        this.canvas.addEventListener('wheel', (e) => {
            const down = e.deltaY > 0;
            const x = e.offsetX;
            const y = e.offsetY;
            
            console.log(`wheel event:  offsetX ${x}  offsetY ${y}  down ${down}`);
        });

        requestAnimationFrame(() => {
            this.draw();
        });
    }

    public resize(width: number, height: number) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext('2d')!;
    }

    private draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const now = Math.floor(Math.abs((Date.now() / 20) % (2 * this.canvas.height) - this.canvas.height));

        const radii = [125, 100];
        const xs = [200, 400];
        const ys = [200, now];

        function f(x: number, y: number): number {
            let total = 0;
            for (let i = 0; i < 2; ++i) {
                const dx = x - xs[i];
                const dy = y - ys[i];
                total += (radii[i] * radii[i]) / (dx * dx + dy * dy);
            }
            return total;
        }

        const threshold = 1;

        const squareLength = 12;  // TODO: dynamic based on frame rate
        const xiMax = (this.canvas.width / squareLength) + 1;
        const yiMax = (this.canvas.height / squareLength) + 1;

        let prevRow = [];
        for (let xi = 0; xi < xiMax; ++xi) {
            const x = xi * squareLength;
            const y = 0;
            prevRow.push(f(x, y));
        }
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
                lines.forEach((line) => {
                    this.context.beginPath();
                    this.context.moveTo(line[0], line[1]);
                    this.context.lineTo(line[2], line[3]);
                    this.context.stroke();
                });
            }
            prevRow = thisRow;
        }

        requestAnimationFrame(() => {
            this.draw();
        });
    }
}

export default App;
