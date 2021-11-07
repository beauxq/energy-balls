type two2one = (x: number, y: number) => number;

/**
 * x and y are the bottom right corner of the square
 * 
 * returns an array of lines to draw
*/
export const cases: ((corners: [number, number, number, number],
                      x: number,
                      y: number,
                      squareLength: number,
                      threshold: number,
                      _f: two2one) => [number, number, number, number][])[] = [
    // 0 0
    // 0 0
    () => {
        return [];
    },
    // 0 0
    // 0 1
    (corners, x, y, squareLength, threshold, _f) => {
        const sideY = y - squareLength * (corners[3] - threshold) / (corners[3] - corners[1]);
        const edgeX = x - squareLength * (corners[3] - threshold) / (corners[3] - corners[2]);
        return [[x, sideY, edgeX, y]];
    },
    // 0 0
    // 1 0
    (corners, x, y, squareLength, threshold, _f) => {
        const sideY = y - squareLength * (corners[2] - threshold) / (corners[2] - corners[0]);
        const edgeX = x - squareLength * (threshold - corners[3]) / (corners[2] - corners[3]);
        return [[x - squareLength, sideY, edgeX, y]];
    },
    // 0 0
    // 1 1
    (corners, x, y, squareLength, threshold, _f) => {
        const leftY = y - squareLength * (corners[2] - threshold) / (corners[2] - corners[0]);
        const rightY = y - squareLength * (corners[3] - threshold) / (corners[3] - corners[1]);
        return [[x - squareLength, leftY, x, rightY]];
    },
    // 0 1
    // 0 0
    (corners, x, y, squareLength, threshold, _f) => {
        const sideY = y - squareLength * (threshold - corners[3]) / (corners[1] - corners[3]);
        const edgeX = x - squareLength * (corners[1] - threshold) / (corners[1] - corners[0]);
        return [[edgeX, y - squareLength, x, sideY]];
    },
    // 0 1
    // 0 1
    (corners, x, y, squareLength, threshold, _f) => {
        const topX = x - squareLength * (corners[1] - threshold) / (corners[1] - corners[0]);
        const bottomX = x - squareLength * (corners[3] - threshold) / (corners[3] - corners[2]);
        return [[topX, y - squareLength, bottomX, y]];
    },
    // 0 1
    // 1 0
    (corners, x, y, squareLength, threshold, f) => {
        const topX = x - squareLength * (corners[1] - threshold) / (corners[1] - corners[0]);
        const bottomX = x - squareLength * (threshold - corners[3]) / (corners[2] - corners[3]);
        const leftY = y - squareLength * (corners[2] - threshold) / (corners[2] - corners[0]);
        const rightY = y - squareLength * (threshold - corners[3]) / (corners[1] - corners[3]);

        const halfLength = squareLength / 2;
        const middleIn = f(x - halfLength, y - halfLength) > threshold;
        if (middleIn) {
            return [
                [topX, y - squareLength, x - squareLength, leftY],
                [x, rightY, bottomX, y]
            ];
        }
        return [
            [topX, y - squareLength, x, rightY],
            [x - squareLength, leftY, bottomX, y]
        ];
    },
    // 0 1
    // 1 1
    (corners, x, y, squareLength, threshold, _f) => {
        const sideY = y - squareLength * (corners[2] - threshold) / (corners[2] - corners[0]);
        const edgeX = x - squareLength * (corners[1] - threshold) / (corners[1] - corners[0]);
        return [[edgeX, y - squareLength, x - squareLength, sideY]];
    },
    // 1 0
    // 0 0
    (corners, x, y, squareLength, threshold, _f) => {
        const sideY = y - squareLength * (threshold - corners[2]) / (corners[0] - corners[2]);
        const edgeX = x - squareLength * (threshold - corners[1]) / (corners[0] - corners[1]);
        return [[edgeX, y - squareLength, x - squareLength, sideY]];
    },
    // 1 0
    // 0 1
    (corners, x, y, squareLength, threshold, f) => {
        const topX = x - squareLength * (threshold - corners[1]) / (corners[0] - corners[1]);
        const bottomX = x - squareLength * (corners[3] - threshold) / (corners[3] - corners[2]);
        const leftY = y - squareLength * (threshold - corners[2]) / (corners[0] - corners[2]);
        const rightY = y - squareLength * (corners[3] - threshold) / (corners[3] - corners[1]);

        const halfLength = squareLength / 2;
        const middleIn = f(x - halfLength, y - halfLength) > threshold;
        if (middleIn) {
            return [
                [topX, y - squareLength, x, rightY],
                [x - squareLength, leftY, bottomX, y]
            ];
        }
        return [
            [topX, y - squareLength, x - squareLength, leftY],
            [x, rightY, bottomX, y]
        ];
    },
    // 1 0
    // 1 0
    (corners, x, y, squareLength, threshold, _f) => {
        const topX = x - squareLength * (threshold - corners[1]) / (corners[0] - corners[1]);
        const bottomX = x - squareLength * (threshold - corners[3]) / (corners[2] - corners[3]);
        return [[topX, y - squareLength, bottomX, y]];
    },
    // 1 0
    // 1 1
    (corners, x, y, squareLength, threshold, _f) => {
        const sideY = y - squareLength * (corners[3] - threshold) / (corners[3] - corners[1]);
        const edgeX = x - squareLength * (threshold - corners[1]) / (corners[0] - corners[1]);
        return [[edgeX, y - squareLength, x, sideY]];
    },
    // 1 1
    // 0 0
    (corners, x, y, squareLength, threshold, _f) => {
        const leftY = y - squareLength * (threshold - corners[2]) / (corners[0] - corners[2]);
        const rightY = y - squareLength * (threshold - corners[3]) / (corners[1] - corners[3]);
        return [[x - squareLength, leftY, x, rightY]];
    },
    // 1 1
    // 0 1
    (corners, x, y, squareLength, threshold, _f) => {
        const sideY = y - squareLength * (threshold - corners[2]) / (corners[0] - corners[2]);
        const edgeX = x - squareLength * (corners[3] - threshold) / (corners[3] - corners[2]);
        return [[x - squareLength, sideY, edgeX, y]];
    },
    // 1 1
    // 1 0
    (corners, x, y, squareLength, threshold, _f) => {
        const sideY = y - squareLength * (threshold - corners[3]) / (corners[1] - corners[3]);
        const edgeX = x - squareLength * (threshold - corners[3]) / (corners[2] - corners[3]);
        return [[x, sideY, edgeX, y]];
    },
    // 1 1
    // 1 1
    () => {
        return [];
    },
];
