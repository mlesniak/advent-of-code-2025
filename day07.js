import {load} from './util.js';

function part1(lines) {
    let minStart = Array(lines[0].length)
    const maxValue = lines[0].length * 10;
    minStart.fill(maxValue);

    minStart[lines[0].indexOf('^')] = 0;

    // Wird nur gesplittet, wenn er nicht vorher gesplittet worden war.
    let splits = 0;
    for (let row = 1; row < lines.length; row++) {
        console.log(`\nProcessing row ${row + 1}`);
        console.log(`minStart=${minStart.map((i, v) => `${v}=${i}`).join(",")}`);
        let cur = lines[row];
        let idx = -1;

        console.log(cur);
        while (true) {
            idx = cur.indexOf('^', idx + 1);
            if (idx === -1) {
                break;
            }

            // Wenn ich einen Splitter habe, teilt er den Laser.
            // Aber nur, wenn ueber ihm ein Laster war.
            if (minStart[idx] != maxValue) {
                splits++;
            }

            minStart[idx] = maxValue;

            if (minStart[idx - 1] !== row) {
                minStart[idx - 1] = Math.min(row, minStart[idx - 1]);
                if (minStart[idx - 1] === row) {
                    console.log(`Splitting left at ${idx - 1}`)
                }
            }
            if (minStart[idx + 1] !== row) {
                minStart[idx + 1] = Math.min(row, minStart[idx + 1]);
                if (minStart[idx + 1] === row) {
                    console.log(`Splitting right at ${idx + 1}`);
                }
            }
            console.log(` => Splits right now=${splits}`);
        }
    }

    console.log(minStart);
    console.log(splits);
}

function part2(lines) {
}

let lines = load(7)
    .map((v, i) => {
        if (i > 0) {
            return v
        }

        return v.replace('S', '^')
    })
console.log(part1(lines));

// console.log(part2(parse2()));