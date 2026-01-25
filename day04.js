import {load} from './util.js';


function isAccessible(x, y, lines) {
    if (lines[y][x] !== '@') {
        return false;
    }

    let papers = 0;
    if (y >= 1 && x >= 1 && lines[y - 1][x - 1] === '@') {
        // console.log(1);
        papers++;
    }
    if (y >= 1 && lines[y - 1][x] === '@') {
        // console.log(2);
        papers++;
    }
    if (y >= 1 && x < lines[y].length && lines[y - 1][x + 1] === '@') {
        // console.log(3);
        papers++;
    }

    if (x >= 1 && lines[y][x - 1] === '@') {
        // console.log(4);
        papers++;
    }
    if (x < lines[y].length && lines[y][x + 1] === '@') {
        // console.log(5);
        papers++;
    }

    if (y < lines.length-1 && x >= 1 && lines[y + 1][x - 1] === '@') {
        // console.log(6);
        papers++;
    }
    if (y < lines.length-1 && lines[y + 1][x] === '@') {
        // console.log(7);
        papers++;
    }
    if (y < lines.length-1 && x < lines[y].length && lines[y + 1][x + 1] === '@') {
        // console.log(8);
        papers++;
    }

    return papers < 4;
}

function part1(lines) {
    // console.log(isAccessible(1, 1, lines));
    let freeRolls = 0;
    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[y].length; x++) {
            if (isAccessible(x, y, lines)) {
                freeRolls++;
            }
        }
    }

    return freeRolls;
}

function computeFreeRolls(lines) {
    let freeRolls = [];
    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[y].length; x++) {
            if (isAccessible(x, y, lines)) {
                freeRolls.push([x, y]);
            }
        }
    }

    return freeRolls;
}

function part2(lines) {
    // console.log(isAccessible(1, 1, lines));
    let sum = 0;
    while (true) {
        let freeRolls = computeFreeRolls(lines);
        if (freeRolls.length === 0) {
            break;
        }

        // for (let y = 0; y < lines.length; y++) {
        //     // console.log(lines[y].join(""));
        //     for (let x = 0; x < lines[y].length; x++) {
        //
        //     }
        // }

        // console.log(freeRolls);
        freeRolls.forEach(pos => {
            let [x, y] = pos;
            // console.log(`  ${x}/${y}`)
            lines[y] = lines[y].substring(0, x) + '.' + lines[y].substring(x + 1);
        });
        // lines.forEach(l => console.log(l));
        // console.log(freeRolls.length);
        sum += freeRolls.length;
    }

    return sum;
}

const lines = load(4);
// console.log(part1(lines));
console.log(part2(lines));