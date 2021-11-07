
/**
 * x and y are the bottom right corner of the square
 * 
 * returns an array of lines to draw
*/
export const cases: ((f: (x: number, y: number) => number, x: number, y: number, squareLength: number, threshold: number) => [number, number, number, number][])[] = [
    // 0 0
    // 0 0
    (_f: (x: number, y: number) => number, _x: number, _y: number, _squareLength: number) => {
        return [];
    },
    // 0 0
    // 0 1
    (_f: (x: number, y: number) => number, x: number, y: number, squareLength: number) => {
        // TODO: interpolate
        const halfLength = squareLength / 2;
        return [[x, y - halfLength, x - halfLength, y]];
    },
    // 0 0
    // 1 0
    (_f: (x: number, y: number) => number, x: number, y: number, squareLength: number) => {
        // TODO: interpolate
        const halfLength = squareLength / 2;
        return [[x - squareLength, y - halfLength, x - halfLength, y]];
    },
    // 0 0
    // 1 1
    (_f: (x: number, y: number) => number, x: number, y: number, squareLength: number) => {
        // TODO: interpolate
        const halfLength = squareLength / 2;
        return [[x - squareLength, y - halfLength, x, y - halfLength]];
    },
    // 0 1
    // 0 0
    (_f: (x: number, y: number) => number, x: number, y: number, squareLength: number) => {
        // TODO: interpolate
        const halfLength = squareLength / 2;
        return [[x - halfLength, y - squareLength, x, y - halfLength]];
    },
    // 0 1
    // 0 1
    (_f: (x: number, y: number) => number, x: number, y: number, squareLength: number) => {
        // TODO: interpolate
        const halfLength = squareLength / 2;
        return [[x - halfLength, y - squareLength, x - halfLength, y]];
    },
    // 0 1
    // 1 0
    (f: (x: number, y: number) => number, x: number, y: number, squareLength: number, threshold: number) => {
        // TODO: interpolate
        const halfLength = squareLength / 2;
        const xMid = x - halfLength;
        const yMid = y - halfLength;
        const middleIn = f(xMid, yMid) > threshold;
        if (middleIn) {
            return [
                [xMid, y - squareLength, x - squareLength, yMid],
                [x, yMid, xMid, y]
            ];
        }
        return [
            [xMid, y - squareLength, x, yMid],
            [x - squareLength, yMid, xMid, y]
        ];
    },
    // 0 1
    // 1 1
    (_f: (x: number, y: number) => number, x: number, y: number, squareLength: number) => {
        // TODO: interpolate
        const halfLength = squareLength / 2;
        return [[x - halfLength, y - squareLength, x - squareLength, y - halfLength]];
    },
    // 1 0
    // 0 0
    (_f: (x: number, y: number) => number, x: number, y: number, squareLength: number) => {
        // TODO: interpolate
        const halfLength = squareLength / 2;
        return [[x - halfLength, y - squareLength, x - squareLength, y - halfLength]];
    },
    // 1 0
    // 0 1
    (f: (x: number, y: number) => number, x: number, y: number, squareLength: number, threshold: number) => {
        // TODO: interpolate
        const halfLength = squareLength / 2;
        const xMid = x - halfLength;
        const yMid = y - halfLength;
        const middleIn = f(xMid, yMid) > threshold;
        if (!middleIn) {
            return [
                [xMid, y - squareLength, x - squareLength, yMid],
                [x, yMid, xMid, y]
            ];
        }
        return [
            [xMid, y - squareLength, x, yMid],
            [x - squareLength, yMid, xMid, y]
        ];
    },
    // 1 0
    // 1 0
    (_f: (x: number, y: number) => number, x: number, y: number, squareLength: number) => {
        // TODO: interpolate
        const halfLength = squareLength / 2;
        return [[x - halfLength, y - squareLength, x - halfLength, y]];
    },
    // 1 0
    // 1 1
    (_f: (x: number, y: number) => number, x: number, y: number, squareLength: number) => {
        // TODO: interpolate
        const halfLength = squareLength / 2;
        return [[x - halfLength, y - squareLength, x, y - halfLength]];
    },
    // 1 1
    // 0 0
    (_f: (x: number, y: number) => number, x: number, y: number, squareLength: number) => {
        // TODO: interpolate
        const halfLength = squareLength / 2;
        return [[x - squareLength, y - halfLength, x, y - halfLength]];
    },
    // 1 1
    // 0 1
    (_f: (x: number, y: number) => number, x: number, y: number, squareLength: number) => {
        // TODO: interpolate
        const halfLength = squareLength / 2;
        return [[x - squareLength, y - halfLength, x - halfLength, y]];
    },
    // 1 1
    // 1 0
    (_f: (x: number, y: number) => number, x: number, y: number, squareLength: number) => {
        // TODO: interpolate
        const halfLength = squareLength / 2;
        return [[x, y - halfLength, x - halfLength, y]];
    },
    // 1 1
    // 1 1
    (_f: (x: number, y: number) => number, _x: number, _y: number, _squareLength: number) => {
        return [];
    },
];
