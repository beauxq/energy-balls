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
        function f(x: number, y: number): number {
            const dx = x - 200;
            const dy = y - 200;
            return 1 / (dx * dx + dy * dy);
        }

        const threshold = 0.0000625;

        const squareLength = 16;
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
                const squareCode =
                    (+(prevRow[xi - 1] > threshold) << 3) |
                    (+(prevRow[xi]     > threshold) << 2) |
                    (+(thisRow[xi - 1] > threshold) << 1) |
                    (+(thisRow[xi]     > threshold));
                const lines = cases[squareCode](f, x, y, squareLength, threshold);
                const b = Math.floor(255 * x / this.canvas.width);
                this.context.strokeStyle = `rgb(0, ${255 - b}, ${b})`;
                lines.forEach((line) => {
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
