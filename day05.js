import {load} from './util.js';

function convert(range) {
    const [low, high] = range
        .split("-")
        .map(BigInt);
    return {low, high};
}

function part1(sranges, ids) {
    let ranges = new Set(sranges.map(convert));

    let changed = false;
    repeat: do {
        changed = false;
        // console.log();
        // console.log(ranges);

        for (const r1 of ranges) {
            let {low: l1, high: h1} = r1;
            for (const r2 of ranges) {
                let {low: l2, high: h2} = r2;
                if (r1 === r2) {
                    continue;
                }
                // console.log(`${l1}-${h1} --> ${l2}-${h2}`);
                if (l2 >= l1 && l2 <= h1 && h1 <= h2) {
                    // console.log(1);
                    ranges.add({low: l1, high: h2})
                    ranges.delete(r2);
                    ranges.delete(r1);
                    changed = true;
                    continue repeat;
                }
                if (h2 >= l1 && h2 <= h1 && l2 < l1) {
                    // console.log(2);
                    changed = true;
                    ranges.add({low: l2, high: h1})
                    ranges.delete(r2);
                    ranges.delete(r1);
                    changed = true;
                    continue repeat;
                }
                if (l2 > l1 && h2 < h1) {
                    // console.log(3);
                    ranges.delete(r2);
                    changed = true;
                    continue repeat;
                }
            }
        }
    } while (changed);

    let numFresh = 0;
    for (const id of ids) {
        let fresh = false;
        for (const {low, high} of ranges) {
            if (id >= low && id <= high) {
                fresh = true;
                break;
            }
        }
        if (fresh) {
            numFresh++;
        }
    }

    return numFresh;
}

function part2(sranges) {
    let ranges = new Set(sranges.map(convert));

    let changed = false;
    repeat: do {
        changed = false;

        for (const r1 of ranges) {
            let {low: l1, high: h1} = r1;
            for (const r2 of ranges) {
                let {low: l2, high: h2} = r2;
                if (r1 === r2) {
                    continue;
                }
                // console.log(`${l1}-${h1} --> ${l2}-${h2}`);
                if (l2 >= l1 && l2 <= h1 && h1 <= h2) {
                    // console.log(1);
                    ranges.add({low: l1, high: h2})
                    ranges.delete(r2);
                    ranges.delete(r1);
                    changed = true;
                    continue repeat;
                }
                if (h2 >= l1 && h2 <= h1 && l2 < l1) {
                    // console.log(2);
                    changed = true;
                    ranges.add({low: l2, high: h1})
                    ranges.delete(r2);
                    ranges.delete(r1);
                    changed = true;
                    continue repeat;
                }
                if (l2 > l1 && h2 < h1) {
                    // console.log(3);
                    ranges.delete(r2);
                    changed = true;
                    continue repeat;
                }
            }
        }
    } while (changed);

    let sum  = 0n;
    ranges.forEach(({low, high}) => {
        sum += high-low+1n;
    })

    return sum;
}

const lines = load(5);
const ranges = [];
const ids = [];
for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '') {
        for (let j = i + 1; j < lines.length; j++) {
            ids.push(BigInt(lines[j]));
        }
        break;
    }
    ranges.push(lines[i]);
}

// console.log(part1(ranges, ids));
console.log(part2(ranges));